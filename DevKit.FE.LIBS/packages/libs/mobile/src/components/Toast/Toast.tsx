import { useMemo } from 'react';
import type { ToastConfig, ToastProps } from 'react-native-toast-message';
import RNToast from 'react-native-toast-message';
import { ToastOptions } from './Toast.types';
import { Message } from './components/Message';

const DefaultToast = 'default' in RNToast ? (RNToast.default as typeof RNToast) : RNToast;

export function Toast(props: ToastProps) {
	const toastConfig = useMemo(
		(): ToastConfig => ({
			success: ({ text1, props }) => <Message text={text1} variant="success" isClosable={props.isClosable} />,
			error: ({ text1, props }) => <Message text={text1} variant="error" isClosable={props.isClosable} />,
			warning: ({ text1, props }) => <Message text={text1} variant="warning" isClosable={props.isClosable} />,
			info: ({ text1, props }) => <Message text={text1} variant="info" isClosable={props.isClosable} />,
		}),
		[]
	);

	return <DefaultToast config={toastConfig} topOffset={10} {...props} />;
}

export const ToastManager = {
	showSuccess: (text: string, options?: ToastOptions) =>
		DefaultToast.show({
			text1: text,
			type: 'success',
			...options,
		}),
	showError: (text: string, options?: ToastOptions) => DefaultToast.show({ text1: text, type: 'error', ...options }),
	showWarning: (text: string, options?: ToastOptions) =>
		DefaultToast.show({
			text1: text,
			type: 'warning',
			...options,
		}),
	showInfo: (text: string, options?: ToastOptions) => DefaultToast.show({ text1: text, type: 'info', ...options }),
};
