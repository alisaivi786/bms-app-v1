'use client';

import React, { MouseEventHandler, useRef } from 'react';
import { EyeIcon, EyeSlashIcon } from '@devkit/icons/web';
import styles from './TextField.styles';

const PasswordIconFC = ({
	inputRef,
	disabled,
	inputInternalType,
}: {
	inputRef: React.MutableRefObject<HTMLInputElement | null>;
	disabled?: boolean;
	inputInternalType: React.MutableRefObject<string>;
}) => {
	const eyeSlashRef = useRef<HTMLDivElement>(null);
	const eyeRef = useRef<HTMLDivElement>(null);

	const showOrHidePassword: MouseEventHandler<HTMLDivElement> = (e) => {
		e.preventDefault();
		e.stopPropagation();

		if (!disabled && inputRef.current) {
			const currentPosition = inputRef.current?.selectionStart;

			if (inputRef.current.type === 'password') {
				inputRef.current.type = 'text';
				inputInternalType.current = 'text';

				if (eyeSlashRef.current && eyeRef.current) {
					eyeSlashRef.current.className = 'hidden';
					eyeRef.current.className = '';
				}
			} else if (inputRef.current.type === 'text') {
				inputRef.current.type = 'password';
				inputInternalType.current = 'password';

				if (eyeSlashRef.current && eyeRef.current) {
					eyeSlashRef.current.className = '';
					eyeRef.current.className = 'hidden';
				}
			}

			setTimeout(() => {
				if (inputRef.current) inputRef.current.setSelectionRange(currentPosition, currentPosition);
			});
		}
	};

	return (
		<>
			<div
				className={inputRef?.current && inputRef.current.type === 'password' ? 'hidden' : ''}
				ref={eyeSlashRef}
				onClick={showOrHidePassword}
				onMouseDown={(e) => {
					e.preventDefault();
					e.stopPropagation();
				}}
			>
				<EyeSlashIcon className={styles.eyeIconStyle(disabled)} />
			</div>
			<div
				className={inputRef?.current && inputRef.current.type === 'password' ? '' : 'hidden'}
				ref={eyeRef}
				onClick={showOrHidePassword}
				onMouseDown={(e) => e.preventDefault()}
			>
				<EyeIcon className={styles.eyeIconStyle(disabled)} />
			</div>
		</>
	);
};

export default React.memo(PasswordIconFC);
