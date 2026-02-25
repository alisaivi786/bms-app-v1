import YesNoToggle from '../../ToggleSwitch/YesNoToggle';
import { IQuestion, TValue } from '../types';
import DateQuestion from './DateQuestion';

interface IQuestionProps<T> {
	question: IQuestion<T>;
	value?: TValue<T>;
	yesLabel?: string;
	noLabel?: string;
	onChange: (val: TValue<T>, id: keyof T) => void;
	variant?: 'black' | 'primary';
}

function Question<T>(props: IQuestionProps<T>) {
	const { question, value, yesLabel, noLabel, onChange, variant } = props;

	if (question.hidden === true) {
		return <></>;
	}

	return (
		<li
			className={`flex flex-wrap items-center justify-between gap-4 border-b border-gray-200 py-4 last:border-none 
			${question.parent !== undefined ? 'ml-8' : ''}`}
		>
			<p className="flex-1 text-paragraph font-medium">
				{question.question}
				{question.isRequired && <span className="m-0.5 text-red-500">*</span>}
			</p>

			{question.type === 'date' && (
				<DateQuestion onChange={(val) => onChange(val as TValue<T>, question.id)} value={value as Date} {...question} />
			)}

			{question.type === 'boolean' && (
				<YesNoToggle
					onChange={(val) => onChange(val as TValue<T>, question.id)}
					value={value as boolean}
					yesLabel={yesLabel}
					noLabel={noLabel}
					variant={variant}
				/>
			)}
		</li>
	);
}

export default Question;
