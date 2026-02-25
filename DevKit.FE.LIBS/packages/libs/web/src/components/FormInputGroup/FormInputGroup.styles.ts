import clsx from 'clsx';
import { TwLayoutClassName } from '@devkit/utilities/src/types/shared-types';

const formInputWrapper = (
	hasWidth: boolean,
	hasFlex: boolean,
	layoutClassName: TwLayoutClassName | undefined,
	highlighted?: boolean
) =>
	clsx(
		!hasFlex && 'flex-1',
		!hasWidth && 'w-full',
		layoutClassName,
		highlighted && '-m-2.5 p-2.5 rounded-md bg-brand-200'
	);

const labelWrapper = clsx('mb-1.5');

export default {
	formInputWrapper,
	labelWrapper,
};
