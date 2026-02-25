import { Meta, StoryFn } from '@storybook/react-vite';
import { IBaseActionMenuProps, ISimpleActionMenuItem, SimpleActionsMenu } from '../../../src/components/ActionMenu';

type ComponentType = (args: IBaseActionMenuProps) => JSX.Element;

const Template: StoryFn<ComponentType> = (args) => {
	const items: ISimpleActionMenuItem[] = [
		// eslint-disable-next-line no-console
		{ label: 'Category A', onClick: () => console.log('') },
		// eslint-disable-next-line no-console
		{ label: 'Category B', onClick: () => console.log('') },
		// eslint-disable-next-line no-console
		{ label: 'Category C', onClick: () => console.log('') },
	];

	return (
		<>
			<div className="mx-24 flex flex-wrap gap-6 lg:gap-16">
				<div className="flex flex-1">
					<SimpleActionsMenu {...args} items={items}>
						Assign Category
					</SimpleActionsMenu>
				</div>
			</div>
		</>
	);
};

const StoryMeta: Meta<ComponentType> = {
	title: 'Web/Components/ActionMenu',
	component: SimpleActionsMenu,
	render: Template,
	argTypes: {
		textSize: {
			control: 'select',
			options: ['small', 'medium', 'large'],
			defaultValue: 'small',
		},
		variant: {
			control: 'select',
			options: ['primary', 'secondary', 'text'],
			defaultValue: 'primary',
		},
	},
};

export default StoryMeta;

export const ActionMenu = {
	args: {
		disabled: false,
		textSize: 'medium',
		variant: 'text',
	},
};
