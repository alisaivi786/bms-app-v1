import { WifiSlashIcon } from '@devkit/icons/web';
import { IToastProps } from '@devkit/shared-types';
import { Meta, StoryFn } from '@storybook/react-vite';
import { Button } from '../../../src/components/Buttons';
import { useToast } from '../../../src/components/Toast/ToastContext';

type ComponentType = (args: IToastProps & { severity: 'Error' | 'Warning' | 'Info' | 'Success' }) => JSX.Element;

const Template: StoryFn<ComponentType> = ({ severity, ...args }) => {
	const { showError, showInfo, showSuccess, showWarning } = useToast();

	let showToast: (_args: IToastProps) => void = () => undefined;

	switch (severity) {
		case 'Error':
			showToast = showError;
			break;
		case 'Info':
			showToast = showInfo;
			break;
		case 'Success':
			showToast = showSuccess;
			break;
		case 'Warning':
			showToast = showWarning;
			break;
	}

	return (
		<Button
			onClick={() => {
				showToast({ ...args });
			}}
		>
			Show Error with custom icon
		</Button>
	);
};

const StoryMeta: Meta<ComponentType> = {
	title: 'Web/Components/Toast',
	component: Template,
	render: Template,
	argTypes: {
		position: {
			control: 'select',
			options: ['top-center', 'top-left', 'top-right', 'bottom-center', 'bottom-left', 'bottom-right'],
			defaultValue: 'top-center',
		},
		severity: {
			control: 'select',
			options: ['Error', 'Warning', 'Info', 'Success'],
			defaultValue: 'Error',
		},
	},
};

export default StoryMeta;

export const ToastDefault = {
	args: {
		title: (
			<p className="font-medium text-white capitalize text-paragraph">
				Quote list
				<span className="font-bold"> ID CQL2300001 </span>
				is not found!
			</p>
		),
		position: 'top-right',
		duration: 3000,
		isClosable: true,
		icon: WifiSlashIcon,
		severity: 'Error',
	},
};

export const ToastWithTitle = {
	args: {
		title: 'Placeholder text: Please check your internet connection.',
		position: 'top-right',
		duration: 3000,
		isClosable: true,
		icon: WifiSlashIcon,
		severity: 'Warning',
	},
};
