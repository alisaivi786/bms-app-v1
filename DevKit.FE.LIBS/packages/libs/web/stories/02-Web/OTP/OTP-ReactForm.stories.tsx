import { useEffect } from 'react';
import { useReactForm } from '@devkit/utilities';
import { Meta, StoryFn, StoryObj } from '@storybook/react-vite';
import { IOtpFieldProps, OTPField } from '../../../src/components/OTPField';

type ComponentType = (args: IOtpFieldProps) => JSX.Element;

const Template: StoryFn<ComponentType> = (args) => {
	const form = useReactForm({
		initialValues: { otpValue: '' },
	});
	const otpValue = form.getValues('otpValue');

	useEffect(() => {
		if (otpValue.length >= 4) {
			setTimeout(() => alert('verified'), 100);
		}
	}, [otpValue]);

	return (
		<>
			<OTPField {...args} form={form} field="otpValue" />
		</>
	);
};

const StoryMeta: Meta<ComponentType> = {
	title: 'WEB/Forms/OTP',
	component: OTPField,
};

export default StoryMeta;

export const OTPReactForm: StoryObj<ComponentType> = {
	render: Template,
};
