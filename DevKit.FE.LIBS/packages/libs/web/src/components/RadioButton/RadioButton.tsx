'use client';
import { useId, useRef, useState } from 'react';
import { RadioButtonOption } from '@devkit/utilities';
import { RadioBoxSize } from '@devkit/utilities/src/types';
import classNames from './RadioButton.styles';

export interface RadioButtonProps<TID extends string | number> extends RadioButtonOption<TID> {
	onChange: (value: TID | undefined) => void;
	hasErrors?: boolean;
	value?: TID;
	size?: RadioBoxSize;
	groupName?: string;
	/** A flag that changes the background to highlight a change in values. */
	highlighted?: boolean;
	widthFull?: boolean;
}

export function RadioButton<TID extends string | number>(props: RadioButtonProps<TID>) {
	const {
		id,
		label,
		disabled,
		onChange,
		hasErrors = false,
		value,
		size = 'x-small',
		groupName,
		highlighted,
		widthFull,
	} = props;
	const [effect, setEffect] = useState(false);
	const inputId = useId();
	const containerRef = useRef<HTMLLabelElement>(null);

	return (
		<label
			htmlFor={inputId}
			className={classNames.radioContainer(highlighted, widthFull)}
			onClick={() => {
				if (!disabled) {
					onChange(id);
					setEffect(true);
				}
			}}
		>
			<input
				id={inputId}
				type="radio"
				className={classNames.input}
				checked={id === value}
				onChange={() => {
					if (!disabled) {
						onChange(id);
						setEffect(true);
					}
				}}
				onFocus={() => {
					if (containerRef.current) {
						containerRef.current.className = classNames.RadioButton(size, id === value, hasErrors, disabled, true);
					}
				}}
				onBlur={() => {
					if (containerRef.current) {
						containerRef.current.className = containerRef.current.className = classNames.RadioButton(
							size,
							id === value,
							hasErrors,
							disabled,
							false
						);
					}
				}}
				name={groupName}
			/>
			<div className={classNames.labelContainer}>
				<div className={classNames.RadioButtonWrapper(size, effect, hasErrors)} onAnimationEnd={() => setEffect(false)}>
					<label
						ref={containerRef}
						className={classNames.RadioButton(size, id === value, hasErrors, disabled, undefined)}
					>
						{id === value && <div className={classNames.checkIcon(size, hasErrors)} />}
					</label>
				</div>
				<div className={classNames.label(size, disabled)}>{label}</div>
			</div>
		</label>
	);
}
