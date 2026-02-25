import clsx from 'clsx';
import { TwLayoutClassName } from '@devkit/utilities';

// Wrapper container for centering
const overlayWrapper = 'absolute left-0 right-0 flex justify-center items-center z-floating';

const overlayButton = (layoutClassName: TwLayoutClassName | undefined) => {
	return clsx('flex flex-row px-3 py-2 gap-1 rounded-2xl bg-black shadow-sm', layoutClassName);
};

const text = 'text-white font-medium text-caption1';

const iconStyle = 'text-white';

const separator = 'w-[0.5px] h-4 bg-white';
const button = 'flex flex-row items-center justify-center gap-2';

export default {
	overlayWrapper,
	overlayButton,
	text,
	iconStyle,
	separator,
	button,
};
