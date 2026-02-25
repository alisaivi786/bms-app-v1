import { DatePicker } from '../../DatePicker';
import { IDateQuestion } from '../types';

export interface IDateQuestionProps<T> extends IDateQuestion<T> {
	onChange: (val: string) => void;
	value?: Date;
}

const DateQuestion = <T,>(props: IDateQuestionProps<T>) => {
	const { label, onChange } = props;

	return (
		<div className="flex flex-col gap-1.5">
			<DatePicker
				label={label}
				isRequired={false}
				placeholder="Select Date"
				onChange={(val) => {
					if (val) onChange(val);
				}}
			/>
		</div>
	);
};

export default DateQuestion;
