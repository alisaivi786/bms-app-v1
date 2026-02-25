import clsx from 'clsx';

const OTPInputsContainer = 'flex flex-row items-start gap-2';
const OTPContainer = 'flex flex-col gap-1 items-center lg:items-start';
const OTPInput = (hasErrors: boolean, disabled: boolean, isSelected: boolean) =>
	clsx(
		'flex h-12 w-12 appearance-none flex-row items-center  justify-center  rounded-md border border-gray-500 py-3 px-4 text-center text-body font-medium transition',
		hasErrors && '!border-red-500 !bg-red-50',
		disabled && 'bg-gray-50 pointer-events-none',
		!hasErrors && isSelected && '!nj-border-brand !outline !outline-3 !nj-outline-brand'
	);

export default {
	OTPInput,
	OTPInputsContainer,
	OTPContainer,
};
