import { ArrowLongRightIcon, EditPencilIcon, RightArrowIconIcon } from '@devkit/icons/web';
import { Meta, StoryFn, StoryObj } from '@storybook/react-vite';
import { ILinkButton, LinkButton as LinkButtonComponent } from '../../../src/components/Buttons/LinkButton';

type ComponentType = (args: ILinkButton) => JSX.Element;

const Template: StoryFn<ComponentType> = (args) => {
	return (
		<div className="w-40 p-2 bg-black">
			<LinkButtonComponent {...args} />
		</div>
	);
};
const StoryMeta: Meta<typeof LinkButtonComponent> = {
	title: 'Web/Forms/Button/Link Button',
	component: LinkButtonComponent,
};

export default StoryMeta;

export const LinkButtonWithoutIcon: StoryObj<typeof LinkButtonComponent> = {
	args: {
		text: 'View More',
	},
};

export const LinkButtonWithInverseVariant: StoryObj<typeof LinkButtonComponent> = {
	args: {
		text: 'Link standalone',
		variant: 'inverse',
		icon: RightArrowIconIcon,
		iconPosition: 'end',
	},
	render: Template,
};

export const LinkButtonWithEndIconPosition: StoryObj<typeof LinkButtonComponent> = {
	args: {
		text: 'Link standalone',
		icon: ArrowLongRightIcon,
	},
};

export const LinkButtonWithStartIconPosition: StoryObj<typeof LinkButtonComponent> = {
	args: {
		text: 'Edit',
		icon: EditPencilIcon,
		iconPosition: 'start',
	},
};

export const LinkButtonWithStartIconPositionWithArabic: StoryObj<typeof LinkButtonComponent> = {
	args: {
		text: 'تعديل',
		icon: EditPencilIcon,
		iconPosition: 'start',
	},
};

export const LinkButtonWithEndIconPositionWithArabic: StoryObj<typeof LinkButtonComponent> = {
	args: {
		text: 'إنشاء حساب',
		icon: ArrowLongRightIcon,
		iconRotateRTL: true,
	},
};
