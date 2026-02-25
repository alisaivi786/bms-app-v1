import {
	GroupButtonDirection,
	GroupButtonSize,
	GroupButtonVariants,
	GroupSelectedButtonVariants,
} from './GroupButtons';

const getButtonStyles = (
	isSelected: boolean,
	btnSize: GroupButtonSize,
	variant: GroupButtonVariants,
	direction: GroupButtonDirection,
	selectedVariant: GroupSelectedButtonVariants
) => {
	const baseStyles = `flex justify-center items-center rounded-md flex-shrink-0 min-w-0 whitespace-nowrap ${
		direction === 'horizontal' ? 'flex-row' : 'flex-col h-full w-auto'
	}`;

	const sizeStyles =
		{
			xSmall: 'px-2 py-1.5 h-6',
			small: 'px-3 py-1.5 h-8',
			medium: 'px-4 py-2.5 h-10',
			large: 'px-4 py-3 h-12',
		}[btnSize] || 'px-3 py-1.5 h-8';

	const variantStyles = isSelected
		? selectedVariant === 'brand'
			? 'bg-brand-600 text-white'
			: 'bg-gray-600 text-white'
		: {
				light: 'bg-gray-100 text-gray-600',
				dark: 'bg-gray-200 text-gray-600',
				black: 'bg-gray-200 text-black',
		  }[variant] || 'bg-white text-black border border-gray-200';

	return `${baseStyles} ${sizeStyles} ${variantStyles}`;
};

const getContainerStyles = (direction: GroupButtonDirection) => {
	const directionStyles = direction === 'horizontal' ? 'flex-row gap-2' : 'flex-col gap-4 h-full w-auto';

	return `flex ${directionStyles} flex-shrink-0 overflow-hidden`;
};

const getTextStyles = (
	btnSize: GroupButtonSize,
	isSelected: boolean,
	variant: GroupButtonVariants,
	selectedVariant: GroupSelectedButtonVariants
) => {
	const sizeStyles =
		{
			xSmall: 'text-xs',
			small: 'text-sm',
			medium: 'text-base',
			large: 'text-base',
		}[btnSize] || 'text-sm';

	const brandColorStyles = isSelected && selectedVariant === 'brand' ? 'text-white' : '';

	const grayColorStyles = isSelected ? 'text-white' : variant === 'black' ? 'text-black' : 'text-gray-600';

	return `text-center font-main-medium ${sizeStyles} ${brandColorStyles} ${grayColorStyles}`;
};

const getFlatListStyles = (direction: GroupButtonDirection) =>
	`${direction === 'horizontal' ? 'gap-2' : 'gap-4'} flex-shrink-0`;

export default { getButtonStyles, getContainerStyles, getTextStyles, getFlatListStyles };
