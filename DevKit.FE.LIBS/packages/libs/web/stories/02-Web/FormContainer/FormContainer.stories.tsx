import { Meta, StoryFn, StoryObj } from '@storybook/react-vite';
import { FormContainer, IFormContainerProps } from '../../../src/components/FormContainer';

type ComponentType = (args: IFormContainerProps) => JSX.Element;

const Template: StoryFn<ComponentType> = (args) => {
	return (
		<FormContainer {...args}>
			<div className="bg-red-500">01</div>
			<div className="bg-red-500">01</div>
			<div className="bg-red-500">01</div>
			<div className="bg-red-500">01</div>
			<div className="bg-red-500">01</div>
			<div className="bg-red-500">01</div>
			<div className="bg-red-500">01</div>
			<div className="bg-red-500">01</div>
		</FormContainer>
	);
};

const StoryMeta: Meta<IFormContainerProps> = {
	title: 'Web/Components/FormContainer',
	component: FormContainer,
};

export default StoryMeta;

export const FormContainerStory: StoryObj<ComponentType> = {
	render: Template,
	args: {
		columnsCount: 5,
	},
};
