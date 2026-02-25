import { Meta } from '@storybook/react-vite';
import { BreadCrumb } from '../../../src/components/BreadCrumb';
import { IBreadCrumb } from '../../../src/components/BreadCrumb/BreadCrumb';

const StoryMeta: Meta<IBreadCrumb> = {
	title: 'Web/Components/BreadCrumbs',
	component: BreadCrumb,
	args: {
		links: [
			{ title: 'devkit web', href: '', className: '', children: '', isDisabled: true },
			{ title: 'devkit portal', href: '', className: '', children: '' },
			{ title: 'create SME health coverage', href: '' },
		],
	},
};

export default StoryMeta;

export const BreadCrumbs = {};
