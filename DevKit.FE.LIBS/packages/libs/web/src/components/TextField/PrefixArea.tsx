'use client';

import { CloseIcon } from '@devkit/icons/web';
import { ComponentSize } from '@devkit/utilities';
import { useHTMLElementObserver } from '../../hooks/useHTMLElementObserver';
import PasswordIcon from './PasswordIcon';
import styles from './TextField.styles';
import { ReactNode } from 'react';

export const PrefixArea = ({
	isClearable,
	alwaysShowClearIcon,
	isPasswordField,
	disabled,
	inputRef,
	icon: Icon,
	onClear,
	onIconClick,
	size,
	rotateEndIconOnFocus,
	isFocused,
	inputInternalType,
	prefix,
}: {
	prefix: ReactNode | undefined;
	alwaysShowClearIcon: boolean;
	isClearable: boolean;
	size: ComponentSize;
	hasErrors: boolean;
	disabled: boolean;
	isPasswordField: boolean;
	inputRef: React.RefObject<HTMLInputElement | HTMLTextAreaElement>;
	icon: React.FC<React.SVGProps<SVGSVGElement>> | undefined;
	rotateEndIconOnFocus: boolean;
	isFocused: boolean;
	onClear: () => void;
	onIconClick: () => void;
	inputInternalType: React.MutableRefObject<string>;
}) => {
	const isClearableVisible = !disabled && isClearable && (inputRef.current?.value || alwaysShowClearIcon);
	const isVisible = isClearableVisible || isPasswordField || Icon || prefix;

	const { contentRef } = useHTMLElementObserver<HTMLDivElement>({
		onChange: (ele) => {
			if (inputRef.current && isVisible) inputRef.current.style.paddingInlineEnd = `${ele.clientWidth}px`;
		},
	});

	const endIconsStyles = styles.prefixArea(size, disabled);

	return (
		<>
			{isVisible && (
				<div ref={contentRef} className={endIconsStyles.container} onMouseDown={(e) => e.preventDefault()}>
					{isClearableVisible && (
						<span
							className={styles.prefixAreaButton(disabled)}
							onClick={(e) => {
								onClear();
								e.stopPropagation();
								e.preventDefault();
							}}
						>
							<CloseIcon className={endIconsStyles.clearIcon} />
						</span>
					)}
					{isPasswordField && (
						<span className={styles.prefixAreaButton(disabled)}>
							<PasswordIcon
								inputInternalType={inputInternalType}
								inputRef={inputRef as React.RefObject<HTMLInputElement>}
								disabled={disabled}
							/>
						</span>
					)}
					{Icon && (
						<span className={styles.prefixAreaButton(disabled)} onClick={disabled ? undefined : onIconClick}>
							<Icon className={styles.iconRotate(rotateEndIconOnFocus, isFocused)} />
						</span>
					)}
					{prefix && <span>{prefix}</span>}
				</div>
			)}
		</>
	);
};
