import { PropsWithChildren } from 'react';
import { FloatingOverlay, FloatingPortal } from '@floating-ui/react';
import styles from './AutoSuggestionsDropdown.styles';
import { useAutoSuggestionsDropdownOptions } from './AutoSuggestionsDropdownContext';

export const DropdownMenuPortal = <TValue extends object>({
	children,
	hide,
}: PropsWithChildren & { hide: boolean }) => {
	const {
		refs,
		isElementOutOfScope,
		strategy,
		styles: floatingStyles,
		x,
		y,
		getFloatingProps,
		isMounted,
	} = useAutoSuggestionsDropdownOptions<TValue>();

	return (
		<>
			{isMounted && (
				<FloatingPortal>
					<FloatingOverlay lockScroll />
					<div
						onMouseDown={(e) => e.preventDefault()}
						ref={refs.setFloating}
						className={`${isElementOutOfScope || hide ? 'invisible' : ''} ${styles.menuContainerStyle('medium')} `}
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
