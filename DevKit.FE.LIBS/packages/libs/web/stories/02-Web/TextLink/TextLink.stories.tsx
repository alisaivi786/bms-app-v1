import React from 'react';
import { ArrowLongRightIcon, EditPencilIcon, RightArrowIconIcon } from '@devkit/icons/web';
import { Meta, StoryFn, StoryObj } from '@storybook/react-vite';
import { ITextLink, TextLink as TextLinkComponent } from '../../../src/components/TextLink/TextLink';

type ComponentType = (args: ITextLink) => JSX.Element;

const Template: StoryFn<ComponentType> = (args) => {
	return (
		<div className="text-display1">
			Lorem Ipsum is simply <TextLinkComponent {...args} /> standard dummy text ever since the 1500s
		</div>
	);
};

const Template2: StoryFn<ComponentType> = (args) => {
	return (
		<div className="text-paragraph bg-black text-white">
			Lorem Ipsum is simply <TextLinkComponent {...args} /> standard dummy text ever since the 1500s
		</div>
	);
};
const StoryMeta: Meta<typeof TextLinkComponent> = {
	title: 'Web/Forms/Button/Text Link',
	component: TextLinkComponent,
};

export default StoryMeta;

export const TextLinkWithoutIcon: StoryObj<typeof TextLinkComponent> = {
	args: {
		text: 'View More',
	},
	render: Template,
};

export const TextLinkWithInverseVariant: StoryObj<typeof TextLinkComponent> = {
	args: {
		text: 'Link standalone',
		variant: 'inverse',
		icon: RightArrowIconIcon,
		iconPosition: 'end',
	},
	render: Template2,
};

export const TextLinkWithEndIconPosition: StoryObj<typeof TextLinkComponent> = {
	args: {
		text: 'Link standalone',
		icon: ArrowLongRightIcon,
	},
	render: Template,
};

export const TextLinkWithStartIconPosition: StoryObj<typeof TextLinkComponent> = {
	args: {
		text: 'Edit',
		icon: EditPencilIcon,
		iconPosition: 'start',
	},
	render: Template,
};

export const TextLinkWithStartIconPositionWithArabic: StoryObj<typeof TextLinkComponent> = {
	args: {
		text: 'تعديل و حفظ',
		icon: EditPencilIcon,
		iconPosition: 'start',
	},
	render: Template,
};

export const TextLinkWithEndIconPositionWithArabic: StoryObj<typeof TextLinkComponent> = {
	args: {
		text: 'إنشاء حساب',
		icon: ArrowLongRightIcon,
		iconRotateRTL: true,
	},
	render: Template,
};

export const TextLinkWithClassName: StoryObj<typeof TextLinkComponent> = {
	args: {
		text: 'test',
		className: ['text-paragraph', 'font-medium', 'underline'],
	},
	render: Template,
};
