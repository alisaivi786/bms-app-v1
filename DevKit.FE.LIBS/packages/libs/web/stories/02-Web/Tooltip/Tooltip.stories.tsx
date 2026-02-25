import { Meta, StoryFn } from '@storybook/react-vite';
import { ITooltip, Tooltip } from '../../../src/components/Tooltip';

type ComponentType = (args: ITooltip) => JSX.Element;

const storyChildElement = (
	<div className="flex flex-col gap-2">
		<p className="text-paragraph font-bold">Number of lives for SME</p>
		<p className="text-caption1 font-normal">
			A minimum of 5 and a maximum of 150 counts are allowed to proceed with SME Health
		</p>
	</div>
);

const Template: StoryFn<ComponentType> = (args) => {
	return <Tooltip {...args} />;
};

const StoryMeta: Meta<ITooltip> = {
	title: 'Web/Components/Tooltips',
	component: Tooltip,
	render: Template,
};

export default StoryMeta;

export const Icon = {
	args: {
		direction: 'top',
		childElement: storyChildElement,
	},
};
