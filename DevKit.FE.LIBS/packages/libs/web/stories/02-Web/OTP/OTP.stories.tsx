import { useState } from 'react';
import { CheckIcon } from '@devkit/icons/web';
import { logger } from '@devkit/utilities';
import { Meta, StoryFn, StoryObj } from '@storybook/react-vite';
import { IOtpFieldProps, OTPField } from '../../../src/components/OTPField';

type ComponentType = (args: IOtpFieldProps) => JSX.Element;

const Template: StoryFn<ComponentType> = (args) => {
	const [otpValue, setOtpValue] = useState<string | undefined>('');

	return (
		<div className="flex flex-row items-center justify-center gap-6">
			<OTPField
				{...args}
				value={otpValue as string}
				onChange={(val) => {
					setOtpValue(val);

					if (val?.length === 4) logger.log('auto verify');
				}}
			/>
			<div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-500">
				<CheckIcon className="h-3 w-3 text-white" />
			</div>
		</div>
	);
};

const StoryMeta: Meta<ComponentType> = {
	title: 'WEB/Forms/OTP',
	component: OTPField,
};

export default StoryMeta;

export const OTP: StoryObj<ComponentType> = {
	render: Template,
};

export const OTPWithError: StoryObj<ComponentType> = {
	render: Template,
	args: {
		hasErrors: true,
		errors: 'Sorry, the code does not match',
	},
};
