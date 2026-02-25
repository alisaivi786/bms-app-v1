import { useId, useRef, useState } from 'react';
import { CheckedIcon, MinusIcon } from '@devkit/icons/web';
import { CheckBoxFieldProps, FieldValues, useReactFormController } from '@devkit/utilities';
import classNames from './Checkbox.styles';

export type ICheckbox<TForm extends FieldValues> = CheckBoxFieldProps<TForm>;

export const Checkbox = <TForm extends FieldValues = FieldValues>(props: ICheckbox<TForm>) => {
	const uniqueID = useId();
	const [effect, setEffect] = useState(false);
	const containerRef = useRef<HTMLLabelElement>(null);
	const {
		disabled = false,
		label,
		disableVariant = 'all',
		isIndeterminate = false,
		hasError,
		size = 'x-small',
		highlighted,
		errorVariant,
		onChange,
		isChecked = false,
	} = props;
	const {
		value: isFormValueChecked = false,
		onChange: onFormChange,
		hasErrors,
	} = useReactFormController({
		...props,
		value: isChecked,
		onChange: (isChecked = false) => onChange?.(isChecked),
		hasErrors: hasError,
	});

	return (
		<div className={classNames.container(highlighted)}>
			<input
				id={`checkbox${uniqueID}`}
				type="checkbox"
				data-testid="checkbox"
				className="w-0 h-0 overflow-hidden opacity-0 absolute"
				onClick={() => {
					if (!disabled) {
						onFormChange?.(!isFormValueChecked);
						setEffect(true);
					}
				}}
				onFocus={() => {
					if (containerRef.current) {
						containerRef.current.className = classNames.checkbox(
							disabled,
							isFormValueChecked,
							isIndeterminate,
							hasErrors,
							size,
							true
						);
					}
				}}
				onBlur={() => {
					if (containerRef.current) {
						containerRef.current.className = classNames.checkbox(
							disabled,
							isFormValueChecked,
							isIndeterminate,
							hasErrors,
							size,
							false
						);
					}
				}}
			/>
			<div className={classNames.checkboxWrapper(hasErrors, size, effect)} onAnimationEnd={() => setEffect(false)}>
				<label
					data-testid="label-1"
					htmlFor={`checkbox${uniqueID}`}
					ref={containerRef}
					className={classNames.checkbox(disabled, isFormValueChecked, isIndeterminate, hasErrors, size, undefined)}
				>
					{isIndeterminate && <MinusIcon data-testid="checked-icon" className={classNames.icon} />}
					{!isIndeterminate && isFormValueChecked && (
						<CheckedIcon data-testid="checked-icon" className={classNames.icon} />
					)}
				</label>
			</div>
			{label && (
				<label
					data-testid="label-2"
					htmlFor={`checkbox${uniqueID}`}
					className={classNames.label(disableVariant, disabled, label, errorVariant === 'all' && hasErrors, size)}
				>
					{label}
				</label>
			)}
		</div>
	);
};
