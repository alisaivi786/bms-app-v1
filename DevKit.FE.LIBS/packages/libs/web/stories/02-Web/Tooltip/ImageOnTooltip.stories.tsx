import { Meta, StoryFn } from '@storybook/react-vite';
import { ITooltip, Tooltip } from '../../../src/components/Tooltip';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import Establishment from './Establishment.png';

type ComponentType = (args: ITooltip) => JSX.Element;

const storyChildElement = (
	<div className="rounded-md p-[2px] bg-white">
		<img src={Establishment} />
	</div>
);

const Template: StoryFn<ComponentType> = (args) => {
	return <Tooltip {...args} variant="no-padding" />;
};

const StoryMeta: Meta<ITooltip> = {
	title: 'Web/Components/Tooltips',
	component: Tooltip,
	render: Template,
};

export default StoryMeta;

export const ImageOnTooltip = {
	args: {
		direction: 'top',
		childElement: storyChildElement,
	},
};
