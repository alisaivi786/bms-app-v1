import { useId } from 'react';
import { ComponentSize, RadioCardOption, RadioCardVariant } from '@devkit/utilities';
import classNames from './RadioCard.styles';

type RadioCardItemProps = {
	option: RadioCardOption<number | string>;
	groupName: string;
	value: number | string | undefined;
	hasErrors: boolean;
	size?: ComponentSize;
	variant?: RadioCardVariant;
	onClick: (option: RadioCardOption<number | string>) => void;
};

export const RadioCardItem = ({ option, groupName, value, hasErrors, onClick, size, variant = 'primary' }: RadioCardItemProps) => {
	const inputId = useId();

	return (
		<label
			key={option.id}
			htmlFor={inputId}
			className={classNames.cardContainer(value === option.id, option.className, hasErrors, size, option?.disabled, variant)}
		>
			<input
				id={inputId}
				type="radio"
				className="w-0 h-0 overflow-hidden opacity-0 absolute"
				checked={option.id === value}
				onChange={(e) => {
					!option?.disabled && onClick(option);
					e.stopPropagation();
					e.preventDefault();
				}}
				onFocus={() => {
					if (!option?.disabled && option.id !== value) onClick(option);
				}}
				name={groupName}
			/>
			<div className={classNames.cardBox}>
				<div className={classNames.wrapper(option?.center)}>
					{option.iconStart && <option.iconStart className={classNames.icon(size, variant, value === option.id)} />}
					<div className={classNames.body}>
						<p className={classNames.label(size, variant, value === option.id)}>{option.label}</p>
						{option.placeholder && <p className={classNames.placeholder(variant, value === option.id, size)}>{option.placeholder}</p>}
					</div>
				</div>
				{option.iconEnd && <option.iconEnd className={classNames.icon(size, variant, value === option.id)} />}
			</div>
		</label>
	);
};
