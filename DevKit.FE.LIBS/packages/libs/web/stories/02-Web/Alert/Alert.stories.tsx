import { useState } from 'react';
import { Meta, StoryFn, StoryObj } from '@storybook/react-vite';
import { Alert as AlertComponent, IAlertProps } from '../../../src/components/Alert/Alert';
import { Button } from '../../../src/components/Buttons';
import { TextLink } from '../../../src/components/TextLink/TextLink';

type ComponentType = (args: IAlertProps) => JSX.Element;

const Template: StoryFn<ComponentType> = (args) => {
	const [isShown, setIsShown] = useState<boolean>(true);

	return (
		<>
			<AlertComponent {...args} isShown={isShown} onClose={() => setIsShown(false)} />
			<p className="pt-5">
				<Button onClick={() => setIsShown(true)}>Show Alert</Button>
			</p>
		</>
	);
};

const StoryMeta: Meta<IAlertProps> = {
	title: 'Web/Components/Alert',
	component: AlertComponent,
};

export default StoryMeta;

export const Alert: StoryObj<ComponentType> = {
	render: Template,
	args: {
		severity: 'warning',
		children: (
			<div className="flex w-full text-paragraph font-normal justify-between">
				You are currently not authorized. To save your progress, please login. You are currently not authorized. To save
				your progress, please login.
				<div className="ms-5">
					<TextLink text="Login" className={['text-paragraph', 'font-medium']}></TextLink>
				</div>
			</div>
		),
		isClosable: true,
	},
};

export const Alert2: StoryObj<ComponentType> = {
	render: Template,
	args: {
		severity: 'warning',
		children: (
			<div className="flex w-full text-paragraph font-normal justify-between flex-col">
				You are currently not authorized. To save your progress, please login. You are currently not authorized. To save
				your progress, please login.
				<div className="text-center mt-3">
					<TextLink text="Link standalone" className={['text-paragraph', 'font-medium']}></TextLink>
				</div>
			</div>
		),
		isClosable: true,
	},
};
