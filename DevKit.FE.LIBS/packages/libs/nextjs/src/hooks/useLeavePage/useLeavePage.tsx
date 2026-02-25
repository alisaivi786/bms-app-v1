import SingletonRouter from 'next/router';
import React, { ReactNode, useCallback, useEffect, useRef, useState } from 'react';
import { logger } from '@devkit/utilities';
import { ConfirmDialog } from '@devkit/web';

type ISingletonRouter = {
	router?: {
		asPath: string;
		change: (...params: Array<unknown>) => void;
	};
};

interface ILeavePageProps {
	shouldPreventLeaving: boolean;
	whiteListedRoutes?: Array<string>;
	dialogProps: {
		title?: string;
		description?: ReactNode;
		onClose?: () => void;
		onConfirm?: () => void;
		onCancel?: () => void;
		variant?: 'warning' | 'success' | 'none' | 'mobileError' | 'error';
		cancelLabel?: string;
		confirmLabel?: string;
	};
}

const useLeavePage = (props: ILeavePageProps) => {
	const { whiteListedRoutes, dialogProps, shouldPreventLeaving } = props;
	const temporaryAllowLeave = useRef(false);

	const {
		onClose,
		description,
		title,
		onConfirm,
		onCancel,
		variant = 'none',
		cancelLabel = 'Cancel',
		confirmLabel = 'Confirm',
	} = dialogProps;

	const [isOpen, setIsOpen] = useState(false);
	const [messages, setMessages] = useState<{
		title?: string;
		description?: ReactNode;
	}>({
		title,
		description,
	});

	const handleResolve = useRef<(value: boolean | PromiseLike<boolean>) => void>(() => undefined);
	const stateRef = useRef(typeof window !== 'undefined' ? window.history.state : undefined);
	const isPopStateRef = useRef(false);

	const triggerLeaveMessage = useCallback(
		async (props: { title?: string; description?: ReactNode }) => {
			return await new Promise<boolean>((resolve) => {
				setIsOpen(true);
				setMessages(props);

				handleResolve.current = resolve;
			});
		},
		[setIsOpen]
	);

	useEffect(() => {
		const singletonRouter = SingletonRouter as unknown as ISingletonRouter;

		if (typeof window == 'undefined') return;

		if (!singletonRouter?.router?.change) {
			return;
		}
		const originalChangeFunction = singletonRouter.router.change;
		const originalOnBeforeUnloadFunction = window.onbeforeunload;

		if (shouldPreventLeaving) {
			window.onbeforeunload = () => {
				if (temporaryAllowLeave.current) return;
				else return '';
			};
		} else {
			window.onbeforeunload = originalOnBeforeUnloadFunction;
		}

		if (shouldPreventLeaving) {
			singletonRouter.router.change = async (...args) => {
				const newRoute = args ? (args[1] as string) : '';

				if (whiteListedRoutes?.includes(newRoute ?? '')) {
					originalChangeFunction.apply(singletonRouter.router, args);

					return;
				}

				const confirmed = temporaryAllowLeave.current || (await triggerLeaveMessage({ title, description }));

				if (confirmed) {
					try {
						originalChangeFunction.apply(singletonRouter.router, args);
					} catch (error) {
						logger.error(error);

						return;
					}
				} else if (isPopStateRef.current) {
					const currentPath = singletonRouter.router?.asPath;
					const documentTitle = document.title;

					window.history.pushState(stateRef.current, '', currentPath);

					document.title = '';
					setTimeout(() => {
						document.title = documentTitle;
					});

					isPopStateRef.current = false;
				}
			};
		} else {
			if (singletonRouter?.router) {
				singletonRouter.router.change = originalChangeFunction;
			}
		}

		return () => {
			if (singletonRouter?.router) {
				singletonRouter.router.change = originalChangeFunction;
			}

			window.onbeforeunload = originalOnBeforeUnloadFunction;
		};
	}, [shouldPreventLeaving, triggerLeaveMessage, title, description, whiteListedRoutes]);

	useEffect(() => {
		if (SingletonRouter?.router) {
			SingletonRouter?.router.beforePopState(() => {
				isPopStateRef.current = true;

				return true;
			});
		}

		return () => {
			if (SingletonRouter?.router) {
				SingletonRouter?.router.beforePopState(() => true);
			}
		};
	}, []);

	const Component = (
		<ConfirmDialog
			isOpen={isOpen}
			variant={variant}
			title={messages.title}
			description={messages.description}
			onClose={() => {
				setIsOpen(false);
				onClose?.();
			}}
			buttonGroup={[
				{
					variant: 'secondary',
					label: confirmLabel,
					onClick: () => {
						onConfirm?.();
						setIsOpen(false);
						handleResolve.current(true);
					},
				},
				{
					variant: 'primary',
					label: cancelLabel,
					onClick: () => {
						onCancel?.();
						setIsOpen(false);
						handleResolve.current(false);
					},
				},
			]}
		/>
	);
	const onAllowLeave = (callback?: (() => Promise<void> | void) | undefined) => {
		temporaryAllowLeave.current = true;

		return new Promise<void>((resolve: () => void, reject: (err: unknown) => void) => {
			try {
				const callBackReturn = callback?.();

				if (callBackReturn?.then) {
					callBackReturn
						.then(() => {
							temporaryAllowLeave.current = false;
							resolve();
						})
						.catch((error) => {
							temporaryAllowLeave.current = false;
							reject(error);
						});
				} else {
					temporaryAllowLeave.current = false;
					resolve();
				}
			} catch (error) {
				temporaryAllowLeave.current = false;
				reject(error);
			}
		});
	};

	return { Component, triggerLeaveMessage, setIsOpen, isOpen, onAllowLeave };
};

export default useLeavePage;
