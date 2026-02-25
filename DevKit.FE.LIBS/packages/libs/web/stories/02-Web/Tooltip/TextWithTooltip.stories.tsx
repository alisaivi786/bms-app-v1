import { Meta, StoryFn } from '@storybook/react-vite';
import { Tooltip } from '../../../src/components/Tooltip';
import { ITooltip } from '../../../src/components/Tooltip/Tooltip';

type ComponentType = (args: ITooltip) => JSX.Element;

const storyParentElement = <div className="text-black">National Properties LLC</div>;

const StoryArray = [
	{
		header: 'Number of lives for SME',
		description: 'A minimum of 5 and a maximum of 150 counts are allowed to proceed with SME Health',
	},
	{
		header: 'Number of lives for SME',
		description: 'A minimum of 5 and a maximum of 150 counts are allowed to proceed with SME Health',
	},
];

const storyChildElement = (
	<div className="flex flex-col gap-4">
		{StoryArray.map((item) => {
			return (
				<div key={item.header} className="flex flex-col gap-2">
					<p className="text-caption1 font-normal">{item.header}</p>
					<p className="text-paragraph font-bold">{item.description}</p>
				</div>
			);
		})}
	</div>
);

const Template: StoryFn<ComponentType> = (args) => {
	return <Tooltip {...args} />;
};

const StoryMeta: Meta<ComponentType> = {
	title: 'Web/Components/Tooltips',
	component: Tooltip,
	render: Template,
};

export default StoryMeta;

export const TextWithTooltip = {
	args: {
		direction: 'top',
		childElement: storyChildElement,
		parentElement: storyParentElement,
	},
};
