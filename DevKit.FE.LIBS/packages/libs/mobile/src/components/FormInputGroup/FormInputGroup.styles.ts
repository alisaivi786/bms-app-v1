import clsx from 'clsx';
import { TwLayoutClassName } from '@devkit/utilities';

const formInputWrapper = (layoutClassName: TwLayoutClassName | undefined, highlighted?: boolean) =>
	clsx('w-full', layoutClassName, highlighted && 'p-2.5 w-full rounded-md bg-brand-200');

const labelWrapper = clsx('mb-2');

export default {
	formInputWrapper,
	labelWrapper,
};
