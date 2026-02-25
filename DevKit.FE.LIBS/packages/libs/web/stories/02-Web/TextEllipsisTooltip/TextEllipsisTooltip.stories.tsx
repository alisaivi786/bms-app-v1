import { Meta, StoryFn } from '@storybook/react-vite';
import { ITextEllipsisTooltipProps, TextEllipsisTooltip } from '../../../src/components/TextEllipsisTooltip';

type ComponentType = (args: ITextEllipsisTooltipProps) => JSX.Element;

const Template: StoryFn<ComponentType> = (args) => {
	return <TextEllipsisTooltip {...args} />;
};

const StoryMeta: Meta<ComponentType> = {
	title: 'Web/Components/TextEllipsisTooltip',
	component: TextEllipsisTooltip,
	render: Template,
};

export default StoryMeta;

export const TextEllipsisTooltipDefault = {
	args: {
		content: 'Test Agency Shory Test Agency Shory Test Agency Shory',
		maxWidth: '300px',
	},
};
