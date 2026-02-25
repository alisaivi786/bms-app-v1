import { PropsWithChildren } from 'react';
import { FloatingOverlay, FloatingPortal } from '@floating-ui/react';
import { FieldValues, PrimitiveKeys, StringAndNumberKeys } from '@devkit/utilities';
import styles from '../Dropdown.styles';
import { useCommonDropdownContextOptions } from './DropdownContext';

export const DropdownMenuPortal = <
	TValue,
	TKey extends PrimitiveKeys<TValue>,
	TForm extends FieldValues,
	TGroupKey extends StringAndNumberKeys<TValue> | undefined
>({
	children,
}: PropsWithChildren) => {
	const {
		refs,
		isElementOutOfScope,
		strategy,
		styles: floatingStyles,
		x,
		y,
		getFloatingProps,
		isMounted,
		size,
	} = useCommonDropdownContextOptions<TValue, TKey, TForm, TGroupKey>();

	return (
		<>
			{isMounted && (
				<FloatingPortal>
					<FloatingOverlay lockScroll />
					<div
						onMouseDown={(e) => e.preventDefault()}
						ref={refs.setFloating}
						className={`${isElementOutOfScope ? 'invisible' : ''} ${styles.menuContainerStyle(size)} `}
						style={{
							zIndex: 10000,
							position: strategy,
							top: y ?? 0,
							left: x ?? 0,
							width: 'max-content',
							...floatingStyles,
						}}
						{...getFloatingProps}
					>
						{children}
					</div>
				</FloatingPortal>
			)}
		</>
	);
};
