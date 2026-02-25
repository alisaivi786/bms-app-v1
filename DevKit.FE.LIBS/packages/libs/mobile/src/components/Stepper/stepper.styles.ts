import clsx from 'clsx';

const stepperList = 'flex flex-row justify-between w-full';
const stepperListItem = 'relative flex flex-col items-center justify-center gap-2';
const separator = (index: number, current: number) =>
	clsx('mb-[0.562rem] h-0.5 flex-1 self-end', index / 2 + 1 < current ? 'nj-bg-brand' : 'bg-gray-200');

const lineClass = (elementIndex: number, current: number) =>
	clsx(
		'text-caption2 md:text-paragraph font-main-medium ',
		elementIndex + 1 > current ? ' text-gray-600' : '',
		elementIndex + 1 === current ? ' nj-text-brand' : ''
	);

const stepCircleContainer = 'flex w-full items-center flex-row';
const stepCircleCheckedBefore = (elementIndex: number) => clsx('h-0.5 flex-1', elementIndex > 0 ? 'nj-bg-brand' : '');
const stepCircleCheckedCircle = 'relative flex h-5 w-5 items-center justify-center rounded-full nj-bg-brand';
const stepCircleCheckedIcon = 'text-caption1 text-white';
const stepCircleCheckedAfter = (elementIndex: number, stepsLength: number) =>
	clsx('h-0.5 flex-1', elementIndex + 1 === stepsLength ? 'bg-white' : 'nj-bg-brand');

const stepCircleBefore = (elementIndex: number, beforeCurrentStep: boolean) =>
	clsx(
		'h-0.5 flex-1',
		elementIndex === 0 && '',
		beforeCurrentStep && elementIndex !== 0 && 'nj-bg-brand',
		!beforeCurrentStep && elementIndex !== 0 && 'bg-gray-200'
	);
const stepCircleCircle = (currentStep: boolean) =>
	clsx(
		'relative flex h-5 w-5 items-center justify-center rounded-full border-4 bg-white',
		currentStep ? 'nj-border-brand' : 'border-gray-200'
	);
const stepCircleAfter = (elementIndex: number, stepsLength: number, beforeCurrentStep: boolean, currentStep: boolean) =>
	clsx(
		'h-0.5 flex-1',
		elementIndex + 1 === stepsLength && '',
		beforeCurrentStep && !currentStep ? 'nj-bg-brand' : elementIndex + 1 === stepsLength ? '' : 'bg-gray-200'
	);
const verticalStepperList = 'm-2 flex flex-col';
const verticalStepperListItem = 'mb-2 flex flex-row content-center';
const verticalStepperCircleContainer = 'flex flex-col items-center';
const verticalStepperCircleChecked = 'flex h-7 w-7 items-center justify-center rounded-full bg-green-500';
const verticalStepperCircleCheckIcon = 'text-white';
const verticalStepperCircle = (index: number, current: number) =>
	clsx(
		'h-6 w-6 rounded-full flex items-center justify-center border-2',
		index + 1 !== current ? 'bg-white border-gray-500' : 'nj-bg-brand nj-border-brand'
	);
const verticalStepperCircleNumber = (index: number, current: number) =>
	clsx('text-title font-main-medium', index + 1 !== current ? 'text-gray-500' : 'text-white');
const verticalStepperLine = 'mt-2 w-0.5 flex-1 bg-gray-200';
const verticalStepperContent = 'relative mx-3 flex flex-auto flex-col pb-11';
const verticalStepperTitle = (index: number, current: number) =>
	clsx(
		'text-title',
		index + 1 === current ? 'font-main-bold' : 'font-main-medium',
		index + 1 > current ? ' text-gray-500' : ''
	);
const verticalStepperChild = 'mt-4 w-full';
const verticalStepperDesc = 'my-4 text-body font-main-regular';

export default {
	stepperList,
	stepperListItem,
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
	verticalStepperDesc,
};
