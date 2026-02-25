import { useState } from 'react';
import { Meta, StoryFn, StoryObj } from '@storybook/react-vite';
import Button from '../../../src/components/Buttons/Button';
import {
	Collapsible,
	CollapsiblePanel,
	ICollapsibleProps,
	useCollapsible,
} from '../../../src/components/Collapsible/Collapsible';

type ComponentType = (args: ICollapsibleProps) => JSX.Element;

const CustomButton = () => {
	const { toggle, open } = useCollapsible();

	return (
		<Button variant="secondary" onClick={() => toggle()}>
			{open ? '-' : '+'}
		</Button>
	);
};

const Template: StoryFn<ComponentType> = () => {
	const [open, setIsOpen] = useState(false);

	return (
		<Collapsible open={open} onToggle={setIsOpen}>
			<div className="flex w-full justify-between bg-brand-50 p-5">
				<div className="flex-1">This is header</div>
				<CustomButton />
			</div>
			<CollapsiblePanel>
				<div className="flex bg-brand-200 p-5">
					<div className="relative w-full justify-center">
						<div>Hi there, I am expanded component.</div>
					</div>
				</div>
			</CollapsiblePanel>
		</Collapsible>
	);
};

const StoryMeta: Meta<ICollapsibleProps> = {
	title: 'Web/Components/Collapsible',
	component: Collapsible,
	render: Template,
};

export default StoryMeta;

export const CustomButtonComponent: StoryObj<ComponentType> = {};
