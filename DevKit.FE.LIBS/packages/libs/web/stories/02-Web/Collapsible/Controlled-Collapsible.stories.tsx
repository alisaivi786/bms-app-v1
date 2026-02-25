import { useState } from 'react';
import { Meta, StoryFn } from '@storybook/react-vite';
import Button from '../../../src/components/Buttons/Button';
import {
	Collapsible,
	CollapsibleButton,
	CollapsiblePanel,
	ICollapsibleProps,
} from '../../../src/components/Collapsible/Collapsible';

type ComponentType = (args: ICollapsibleProps) => JSX.Element;

const Template: StoryFn<ComponentType> = () => {
	const [open, setIsOpen] = useState(false);

	return (
		<Collapsible open={open} onToggle={setIsOpen}>
			<div className="flex w-full justify-between bg-brand-50 p-5">
				<div className="flex-1">This is header</div>
				<CollapsibleButton>
					<Button variant="secondary">{open ? '-' : '+'}</Button>
				</CollapsibleButton>
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

const StoryMeta: Meta<ComponentType> = {
	title: 'Web/Components/Collapsible',
	component: Collapsible,
	render: Template,
};

export default StoryMeta;

export const ControlledComponent = {};
