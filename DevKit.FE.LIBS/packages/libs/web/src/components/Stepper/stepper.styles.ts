import clsx from 'clsx';

type StepperVariant = 'brand' | 'black';

const getVariantTokens = (variant: StepperVariant) => {
	if (variant === 'black') {
		return {
			activeBg: 'bg-black',
			inactiveBg: 'bg-gray-400',
			activeBorder: 'border-black',
			inactiveBorder: 'border-gray-400',
			activeProgress: 'bg-black',
			inactiveProgress: 'bg-gray-400',
			activeText: 'text-gray-600',
			inactiveText: 'text-gray-600',
		};
	}

	return {
		activeBg: 'nj-bg-brand',
		inactiveBg: 'bg-gray-200',
		activeBorder: 'nj-border-brand',
		inactiveBorder: 'border-gray-200',
		activeProgress: 'nj-bg-brand',
		inactiveProgress: 'bg-gray-200',
		activeText: 'nj-text-brand',
		inactiveText: 'text-gray-600',
	};
};

const stepperList = 'flex justify-between w-full';
const stepperListItem = 'relative flex flex-col items-center justify-center gap-2';
const simpleStepperVerticalList = 'flex flex-col';
const simpleStepperVerticalListItem = 'flex items-stretch gap-2';
const simpleStepperVerticalContent = 'flex flex-1 flex-col justify-center';
const simpleStepperVerticalLabel = (elementIndex: number, current: number, variant: StepperVariant = 'brand') => {
	if (variant === 'black') {
		const tokens = getVariantTokens(variant);

		return clsx(
			'leading-tight text-paragraph font-medium',
			elementIndex + 1 <= current ? 'text-black' : tokens.inactiveText
		);
	}

	return clsx(
		'leading-tight text-paragraph font-medium ',
		elementIndex + 1 > current && 'text-gray-600',
		elementIndex + 1 <= current && 'nj-text-brand'
	);
};

const simpleStepperVerticalSeparator = (elementIndex: number, current: number, variant: StepperVariant = 'brand') => {
	const tokens = getVariantTokens(variant);

	return clsx(
		'ms-[0.625rem] h-5 w-0.5 rounded-full',
		elementIndex + 1 < current ? tokens.activeProgress : tokens.inactiveProgress
	);
};

const separator = (index: number, current: number, variant: StepperVariant = 'brand') => {
	const tokens = getVariantTokens(variant);

	return clsx(
		'mb-[0.562rem] h-0.5 flex-1 self-end',
		index / 2 + 1 < current ? tokens.activeProgress : tokens.inactiveProgress
	);
};

const lineClass = (elementIndex: number, current: number, variant: StepperVariant = 'brand') => {
	if (variant === 'black') {
		const tokens = getVariantTokens(variant);

		return clsx(
			'nj-stepper-inactive md:nj-stepper-font-size-md',
			elementIndex + 1 <= current ? tokens.activeText : tokens.inactiveText
		);
	}

	return clsx(
		elementIndex + 1 > current && 'nj-stepper-inactive md:nj-stepper-font-size-md',
		elementIndex + 1 <= current && 'nj-stepper-active md:nj-stepper-font-size-md'
	);
};

const stepCircleContainer = 'flex w-full items-center';

const stepCircleCheckedBefore = (elementIndex: number, variant: StepperVariant = 'brand') => {
	const tokens = getVariantTokens(variant);

	return clsx('h-0.5 flex-1', elementIndex > 0 ? tokens.activeProgress : '');
};

const stepCircleCheckedCircle = (variant: StepperVariant = 'brand') => {
	const tokens = getVariantTokens(variant);

	return clsx('relative flex h-5 w-5 items-center justify-center rounded-full', tokens.activeBg);
};

const stepCircleCheckedIcon = 'text-caption1 text-white';

const stepCircleCheckedAfter = (elementIndex: number, stepsLength: number, variant: StepperVariant = 'brand') => {
	const tokens = getVariantTokens(variant);

	return clsx('h-0.5 flex-1', elementIndex + 1 === stepsLength ? 'bg-white' : tokens.activeProgress);
};

const stepCircleBefore = (elementIndex: number, beforeCurrentStep: boolean, variant: StepperVariant = 'brand') => {
	const tokens = getVariantTokens(variant);

	return clsx(
		'h-0.5 flex-1',
		elementIndex === 0 && '',
		beforeCurrentStep && elementIndex !== 0 && tokens.activeProgress,
		!beforeCurrentStep && elementIndex !== 0 && tokens.inactiveProgress
	);
};

const stepCircleCircle = (
	state: boolean | 'current' | 'upcoming',
	style: 'border' | 'filled' = 'border',
	variant: StepperVariant = 'brand'
) => {
	const isCurrent = typeof state === 'boolean' ? state : state === 'current';
	const tokens = getVariantTokens(variant);

	if (style === 'filled') {
		return clsx(
			'relative flex h-5 w-5 items-center justify-center rounded-full',
			isCurrent ? tokens.activeBg : tokens.inactiveBg
		);
	}

	return clsx(
		'relative flex h-5 w-5 items-center justify-center rounded-full border-4 bg-white',
		isCurrent ? tokens.activeBorder : tokens.inactiveBorder
	);
};

const stepCircleAfter = (
	elementIndex: number,
	stepsLength: number,
	beforeCurrentStep: boolean,
	currentStep: boolean,
	variant: StepperVariant = 'brand'
) => {
	const tokens = getVariantTokens(variant);

	return clsx(
		'h-0.5 flex-1',
		elementIndex + 1 === stepsLength && '',
		beforeCurrentStep && !currentStep
			? tokens.activeProgress
			: elementIndex + 1 === stepsLength
				? ''
				: tokens.inactiveProgress
	);
};

const stepCircleContainerVertical = 'flex h-full flex-col items-center';

const stepCircleCheckedBeforeVertical = (elementIndex: number, variant: StepperVariant = 'brand') => {
	const tokens = getVariantTokens(variant);

	return clsx('w-0.5 flex-1', elementIndex > 0 ? tokens.activeProgress : 'bg-transparent');
};

const stepCircleCheckedAfterVertical = (
	elementIndex: number,
	stepsLength: number,
	variant: StepperVariant = 'brand'
) => {
	const tokens = getVariantTokens(variant);

	return clsx('w-0.5 flex-1', elementIndex + 1 === stepsLength ? 'bg-transparent' : tokens.activeProgress);
};
const stepCircleBeforeVertical = (
	elementIndex: number,
	beforeCurrentStep: boolean,
	variant: StepperVariant = 'brand'
) => {
	const tokens = getVariantTokens(variant);

	return clsx(
		'w-0.5 flex-1',
		elementIndex === 0 ? 'bg-transparent' : beforeCurrentStep ? tokens.activeProgress : tokens.inactiveProgress
	);
};

const stepCircleAfterVertical = (
	elementIndex: number,
	stepsLength: number,
	beforeCurrentStep: boolean,
	currentStep: boolean,
	variant: StepperVariant = 'brand'
) => {
	const tokens = getVariantTokens(variant);

	return clsx(
		'w-0.5 flex-1',
		elementIndex + 1 === stepsLength
			? 'bg-transparent'
			: beforeCurrentStep && !currentStep
				? tokens.activeProgress
				: tokens.inactiveProgress
	);
};

const stepCircleNumber = (
	state: 'current' | 'upcoming',
	style: 'border' | 'filled',
	variant: StepperVariant = 'brand'
) => {
	if (variant === 'black') {
		return clsx(
			'text-caption1 font-bold leading-none',
			style === 'filled' && state === 'current' ? 'text-white' : 'text-gray-600'
		);
	}

	if (style === 'filled') {
		return clsx('text-caption1 font-bold leading-none', state === 'current' ? 'text-white' : 'text-gray-600');
	}

	const tokens = getVariantTokens(variant);

	return clsx('text-caption1 font-bold leading-none', state === 'current' ? tokens.activeText : tokens.inactiveText);
};

const verticalStepperList = 'm-2 flex flex-col';
const verticalStepperListItem = 'mb-2 flex flex-row content-center';
const verticalStepperCircleContainer = 'flex flex-col items-center';
const verticalStepperCircleChecked = 'flex h-7 w-7 items-center justify-center rounded-full bg-green-500';
const verticalStepperCircleCheckIcon = 'text-white';
const verticalStepperCircle = (index: number, current: number) =>
	clsx(
		'h-6 w-6 rounded-full flex items-center justify-center ring-2',
		index + 1 !== current ? 'bg-white text-gray-500  ring-gray-500' : 'nj-bg-brand text-white nj-ring-brand'
	);
const verticalStepperCircleNumber = 'text-title font-medium leading-none';
const verticalStepperLine = 'mt-2 w-0.5 flex-1 bg-gray-200';
const verticalStepperContent = 'relative mx-3 flex flex-auto flex-col pb-11';
const verticalStepperTitle = (index: number, current: number) =>
	clsx('text-title', index + 1 == current ? 'font-bold' : 'font-medium', index + 1 > current ? ' text-gray-500' : '');
const verticalStepperChild = 'mt-4 w-full';
const verticalStepperDesc = 'my-4 h-full text-body font-normal';

export default {
	stepperList,
	stepperListItem,
	simpleStepperVerticalList,
	simpleStepperVerticalListItem,
	simpleStepperVerticalContent,
	simpleStepperVerticalLabel,
	simpleStepperVerticalSeparator,
	lineClass,
	separator,
	stepCircleContainer,
	stepCircleCheckedBefore,
	stepCircleCheckedCircle,
	stepCircleCheckedIcon,
	stepCircleCheckedAfter,
	stepCircleBefore,
	stepCircleCircle,
	stepCircleAfter,
	stepCircleContainerVertical,
	stepCircleCheckedBeforeVertical,
	stepCircleCheckedAfterVertical,
	stepCircleBeforeVertical,
	stepCircleAfterVertical,
	stepCircleNumber,
	verticalStepperList,
	verticalStepperListItem,
	verticalStepperCircleContainer,
	verticalStepperCircleChecked,
	verticalStepperCircleCheckIcon,
	verticalStepperCircle,
	verticalStepperCircleNumber,
	verticalStepperLine,
	verticalStepperContent,
	verticalStepperTitle,
	verticalStepperChild,
	verticalStepperDesc
};
