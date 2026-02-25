import { SfEnvelopeFillIcon } from '@devkit/icons/web';
import { Meta, StoryObj } from '@storybook/react-vite';
import { Badge, ITagProps } from '../../../src/components/Badge';

const StoryMeta: Meta<ITagProps> = {
	title: 'Web/Components/Badges',
	component: Badge,
};

export default StoryMeta;

export const Default: StoryObj<ITagProps> = {
	args: {
		variant: 'Default',
		title: 'Default Badge Flag',
		status: 'Neutral',
	},
};

export const Accent: StoryObj<ITagProps> = {
	args: {
		variant: 'Accent',
		title: 'Accent Badge Flag',
		status: 'Neutral',
	},
};

export const AccentRounded: StoryObj<ITagProps> = {
	args: {
		variant: 'AccentRounded',
		title: 'AccentRounded Badge Flag',
		status: 'Neutral',
	},
};

export const DefaultRounded: StoryObj<ITagProps> = {
	args: {
		variant: 'DefaultRounded',
		title: 'DefaultRounded Badge Flag',
		status: 'Neutral',
	},
};

export const DefaultRoundedSmall: StoryObj<ITagProps> = {
	args: {
		variant: 'DefaultRounded',
		title: 'DefaultRounded Badge Flag',
		status: 'Neutral',
		size: 'Small',
	},
};

export const NeutralLightGrayStatus: StoryObj<ITagProps> = {
	args: {
		variant: 'Default',
		title: 'Light Gray Status',
		status: 'NeutralLightGray',
	},
};

export const AccentRoundedWithCustomIcon: StoryObj<ITagProps> = {
	args: {
		variant: 'AccentRounded',
		title: 'AccentRounded Badge Flag',
		status: 'Neutral',
		icon: SfEnvelopeFillIcon,
	},
};
