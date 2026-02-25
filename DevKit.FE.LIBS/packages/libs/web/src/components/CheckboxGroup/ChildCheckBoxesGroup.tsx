import { StringAndNumberKeys } from '@devkit/utilities';
import { Checkbox } from '../Checkbox/Checkbox';
import { IChildGroupProps, Primitives } from './types';

const ChildCheckBoxesGroup = <
	TValue extends object,
	TValueKey extends StringAndNumberKeys<TValue>,
	TValueKeyType extends TValue[TValueKey]
>({
	checkboxOptions,
	labelKey,
	valueKey,
	checkboxDirection = 'column',
	onChange,
	gridCols,
	highlightedOptions,
}: IChildGroupProps<TValue, TValueKey, TValueKeyType>) => {
	return (
		<div
			className={`grid ${checkboxDirection === 'column' ? 'grid-cols-1' : 'grid-cols-4'} gap-3 pt-3`}
			style={gridCols ? { gridTemplateColumns: `repeat(${gridCols}, minmax(0, 1fr)` } : {}}
		>
			{checkboxOptions.map((option) => {
				return (
					<div className="flex min-w-350" key={((option[valueKey] as unknown as Primitives) || '').toString()}>
						<Checkbox
							disabled={option.disabled}
							isChecked={option.checked}
							onChange={(isChecked) => onChange(option[valueKey] as TValueKeyType, isChecked)}
							label={option[labelKey ?? valueKey] as unknown as Primitives}
							highlighted={highlightedOptions?.includes(option[valueKey] as unknown as TValueKeyType)}
						/>
					</div>
				);
			})}
		</div>
	);
};

export default ChildCheckBoxesGroup;
