import { Meta, StoryFn, StoryObj } from '@storybook/react-vite';
import { Divider as DividerComponent } from '../../../src/components/Divider/Divider';

type ComponentType = (args: { className?: string }) => JSX.Element;

const Template: StoryFn<ComponentType> = (args) => {
	return (
		<div>
			<DividerComponent {...args} />
		</div>
	);
};

const StoryMeta: Meta<{ className?: string }> = {
	title: 'Web/Components/Divider',
	component: DividerComponent,
	render: Template,
};

export default StoryMeta;

export const Divider: StoryObj<ComponentType> = {};
