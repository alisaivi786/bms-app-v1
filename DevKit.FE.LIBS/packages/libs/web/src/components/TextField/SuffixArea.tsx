'use client';
import { ComponentSize } from '@devkit/utilities';
import { useHTMLElementObserver } from '../../hooks/useHTMLElementObserver';
import styles from './TextField.styles';
import { ReactNode } from 'react';

export const SuffixArea = ({
	suffix,
	disabled,
	inputRef,
	icon: Icon,
	onIconClick,
	size,
}: {
	disabled: boolean;
	suffix: ReactNode | undefined;
	inputRef: React.RefObject<HTMLInputElement | HTMLTextAreaElement>;
	icon: React.FC<React.SVGProps<SVGSVGElement>> | undefined;
	onIconClick: () => void;
	size: ComponentSize;
}) => {
	const isVisible = Icon || suffix;

	const { contentRef } = useHTMLElementObserver<HTMLDivElement>({
		onChange: (ele) => {
			if (inputRef.current && isVisible) inputRef.current.style.paddingInlineStart = `${ele.clientWidth}px`;
		},
	});

	const suffixAreaStyles = styles.suffixArea(size, disabled, !suffix);

	return (
		<>
			{isVisible && (
				<div ref={contentRef} className={suffixAreaStyles.container} onMouseDown={(e) => e.preventDefault()}>
					{Icon && (
						<button type="button" onClick={onIconClick}>
							<Icon />
						</button>
					)}
					{suffix && <span>{suffix}</span>}
				</div>
			)}
		</>
	);
};
