import { useMemo } from 'react';
import Question from './Question';
import { IQuestion, TValue } from './types';

export interface IQuestionsBoxProps<T> {
	/**	Override or extend the styles applied to the component container */
	className?: string;
	/** Provide the questions for the container */
	questions: IQuestion<T>[];
	/** The QuestionBox container title */
	questionsBoxTitle?: string;
	/** The answers values for each question */
	values?: T;
	/** The text label used for the Yes button for the Yes/No questions type, if not provided it will be Yes by default */
	yesLabel?: string;
	/** The text label used for the No button for the Yes/No questions type, if not provided it will be No by default */
	noLabel?: string;
	/** The callback function to select the question answer */
	onChange: (val: TValue<T>, id: keyof T) => void;
	containerScrollY?: boolean;
}

const getQuestions = <T,>(questions: IQuestion<T>[], id?: keyof T) =>
	questions.filter((question) => question.parent === id);

/** The QuestionsBox component is helpful to make a questions section, you can pass the questions you have. It accept 2 types of questions; Yes/No question, and questions with datePicker components  */

function QuestionsBox<T>(props: IQuestionsBoxProps<T>) {
	const {
		questions,
		questionsBoxTitle,
		onChange,
		className,
		values,
		yesLabel,
		noLabel,
		containerScrollY = false,
	} = props;

	const parentQuestions = useMemo(() => getQuestions(questions), [questions]);

	return (
		<div
			className={`mt-5 ${className} ${
				containerScrollY ? 'grey-scrollbar flex flex-auto flex-col overflow-y-hidden ' : ''
			}`}
		>
			{questionsBoxTitle && <h6 className="text-caption1 text-gray-500">{questionsBoxTitle}</h6>}
			<div
				className={`mt-1 w-full rounded-md border border-gray-200 ${
					containerScrollY ? 'flex-auto overflow-y-scroll' : ''
				}`}
			>
				<ol className="flex h-full w-full flex-col border-r border-r-gray-200 px-4">
					{parentQuestions?.map((question) => (
						<>
							<Question
								question={question}
								value={values?.[question.id]}
								onChange={onChange}
								yesLabel={yesLabel}
								noLabel={noLabel}
							/>

							{getQuestions<T>(questions, question.id).map((question) => (
								<Question
									key={String(question.id)}
									question={question}
									value={values?.[question.id]}
									onChange={onChange}
									yesLabel={yesLabel}
									noLabel={noLabel}
								/>
							))}
						</>
					))}
				</ol>
			</div>
		</div>
	);
}

export default QuestionsBox;
