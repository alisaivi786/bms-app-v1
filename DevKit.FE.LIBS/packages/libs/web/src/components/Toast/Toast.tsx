import { useEffect } from 'react';
import { Transition } from '@headlessui/react';
import {
	SfCheckmarkCircleFillIcon,
	SfCloseCrossLargeIcon,
	SfExclamationmarkTriangleFillIcon,
	SfMinusCircleFillIcon,
	SfQuestionmarkCircleFillIcon,
} from '@devkit/icons/web';
import { IToastProps } from '@devkit/shared-types';
import styles from './Toast.styles';
import { IToastContextData, ToastSeverity } from './ToastContext';

const icons: Partial<Record<ToastSeverity, React.FC<React.SVGProps<SVGSVGElement>>>> = {
	success: SfCheckmarkCircleFillIcon,
	warning: SfExclamationmarkTriangleFillIcon,
	error: SfMinusCircleFillIcon,
	info: SfQuestionmarkCircleFillIcon,
};

/** A simple toast component with an message,
 *  and dismissible close button to show alert messages to your website visitors. */
export const Toast = ({
	title = '',
	severity,
	description,
	duration = 3000,
	position = 'top-center',
	closeToast,
	isShown,
	icon,
	isClosable = false,
	className = '',
}: IToastProps & IToastContextData & { closeToast: () => void }) => {
	useEffect(() => {
		const time = setTimeout(() => {
			if (isShown) closeToast();
		}, duration);

		return () => {
			clearTimeout(time);
		};
	}, [isShown]);

	if (!isShown) return <></>;
	const ToastIcon = icon ?? icons[severity];

	return (
		<Transition
			appear
			show={isShown}
			enter="transition-all duration-150"
			enterFrom="opacity-0 scale-50"
			enterTo="opacity-100 scale-100 z-50"
			leave="transition-all duration-150"
			leaveFrom="opacity-100 scale-100"
			leaveTo="opacity-0 scale-50"
		>
			<div className={styles.toastTransitionContainer(position, className)}>
				<div className={styles.toastContainer(severity)}>
					<div className={styles.toastInnerContainer}>
						{!!ToastIcon && <ToastIcon className={styles.toastIcon} />}
						<div className={styles.toastTextContainer}>
							<h4 className={styles.toastTitle}>{title}</h4>

							{description && <p className={styles.toastDescription}>{description}</p>}
						</div>
					</div>
					{isClosable && <SfCloseCrossLargeIcon className={styles.toastCloseIcon} onClick={() => closeToast()} />}
				</div>
			</div>
		</Transition>
	);
};
