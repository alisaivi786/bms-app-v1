import { Meta } from '@storybook/react-vite';
import { Card, ICardProps } from '../../../src/components/Card';

const StoryMeta: Meta<ICardProps> = {
	title: 'Web/Components/Card',
	component: Card,
	argTypes: {}, // To manually add the props
};

export default StoryMeta;

/** This is the White Card */
export const DefaultCard = {
	args: {
		variant: 'default',
		children: <div>Welcome to devkit</div>,
		className: 'text-center',
	},
};

/** This is the Gray Card */
export const ResponsiveCard = {
	args: {
		variant: 'responsive',
		children: <div>Welcome to devkit</div>,
		className: 'text-center',
	},
};
