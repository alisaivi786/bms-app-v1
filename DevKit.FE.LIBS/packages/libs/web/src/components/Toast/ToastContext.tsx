import { ReactNode, createContext, useContext, useState } from 'react';
import { SuccessIcon } from '@devkit/icons/web';
import { IToastProps } from '@devkit/shared-types';
import { useWebUIConfigOptions } from '../../layouts/ThemeProvider/theme-context';
import { Toast } from './Toast';

export type ToastSeverity = 'warning' | 'error' | 'success' | 'info';

export interface IToastContextData extends IToastProps {
	/**the severity of the alert. This defines the color and icon used. */
	severity: ToastSeverity;
	isShown: boolean;
}

interface IToastContextActions {
	showToast: (newValues: Partial<Omit<IToastContextData, 'isShown'>>) => void;
}

const toastContext = createContext<IToastContextData & IToastContextActions>({
	description: '',
	duration: 0,
	icon: SuccessIcon,
	isClosable: false,
	isShown: false,
	position: 'top-center',
	severity: 'success',
	showToast: () => undefined,
	title: '',
	width: 0,
});

export const ToastProvider = ({ children }: { children: ReactNode }) => {
	const [contextValues, setContextValues] = useState<IToastContextData>({
		duration: 4000,
		isClosable: false,
		isShown: false,
		position: 'top-center',
		severity: 'success',
		title: '',
	});

	return (
		<toastContext.Provider
			value={{
				...contextValues,
				showToast: (newValues) => {
					setContextValues({ ...contextValues, ...newValues, isShown: true });
				},
			}}
		>
			<Toast closeToast={() => setContextValues({ ...contextValues, isShown: false })} {...contextValues} />
			{children}
		</toastContext.Provider>
	);
};

export const useToast = () => {
	const { showToast } = useContext(toastContext);
	const { toastDefaults } = useWebUIConfigOptions();

	const { defaultsIcons = {}, ...defaultProps } = toastDefaults ?? {};
	const { error, info, success, warning } = defaultsIcons;

	const onShowToast = (
		props: IToastProps | string | undefined | null,
		severity: IToastContextData['severity'],
		defaultIcon: React.FC<React.SVGProps<SVGSVGElement>> | undefined
	) => {
		if (props) {
			if (typeof props === 'string') {
				showToast({ ...defaultProps, icon: defaultIcon, title: props, severity });
			} else {
				showToast({ ...defaultProps, icon: defaultIcon, ...props, severity });
			}
		}
	};

	return {
		showError: (props: IToastProps | string | undefined | null) => {
			onShowToast(props, 'error', error);
		},
		showSuccess: (props: IToastProps | string | undefined | null) => {
			onShowToast(props, 'success', success);
		},
		showWarning: (props: IToastProps | string | undefined | null) => {
			onShowToast(props, 'warning', warning);
		},
		showInfo: (props: IToastProps | string | undefined | null) => {
			onShowToast(props, 'info', info);
		},
	};
};
