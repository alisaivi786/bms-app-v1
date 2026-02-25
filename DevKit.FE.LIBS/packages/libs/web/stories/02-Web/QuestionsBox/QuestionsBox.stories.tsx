import { useState } from 'react';
import { Meta, StoryFn } from '@storybook/react-vite';
import { IQuestion, IQuestionsBoxProps, QuestionsBox } from '../../../src/components/QuestionsBox';

const defaultValues = {
	1: false,
	2: undefined,
	3: true,
	4: undefined,
	5: undefined,
	6: undefined,
	7: undefined,
	8: new Date(),
};

type T = typeof defaultValues;

type ComponentType = (args: IQuestionsBoxProps<T>) => JSX.Element;

const BEQuestion: IQuestion<T>[] = [
	{
		id: 1,
		question:
			'Are you under any medical observation / undergoing any medical / surgical / treatment or have been advised for the same in near future?',
		isRequired: true,
		type: 'boolean',
	},
	{
		id: 2,
		question:
			'Do you have physical problem or any chronic disease It needs ongoing or long-term monitoring through consultations, examinations, check-ups, medications, and/or tests? continues indefinitely. Symptoms / Medical Condition may recur or likely to recur?',
		isRequired: true,
		type: 'boolean',
	},
	{
		id: 3,
		question: 'Have you ever been diagnosed / treated and cured or undergoing treatments for cancer?',
		type: 'boolean',
	},
	{
		id: 4,
		question: 'Are you currently pregnant?',
		type: 'boolean',
	},
	{
		id: 5,
		question: 'a. Are you currently single pregnancy?',
		type: 'boolean',
		parent: 4,
	},
	{
		id: 6,
		question: 'b. Are you currently single pregnancy with previous Caesarean Section delivery',
		isRequired: true,
		type: 'boolean',
		parent: 4,
	},
	{
		id: 7,
		question: 'c. Are you currently multiple pregnancy?',
		type: 'boolean',
		parent: 4,
	},
	{
		id: 8,
		question: 'd. What is your last menstrual period date?',
		type: 'date',
		label: 'Date of Latest Menstrual',
		parent: 4,
	},
	{
		id: 3,
		question: 'Have you ever been diagnosed / treated and cured or undergoing treatments for cancer?',
		type: 'boolean',
	},
];

const Template: StoryFn<ComponentType> = (args) => {
	const [answers, setAnswers] = useState(defaultValues);

	const handleChange = (val: T[keyof T], id: keyof T) => {
		setAnswers((p) => ({ ...p, [id]: val }));
	};

	return (
		<QuestionsBox
			{...args}
			questions={BEQuestion.map((v) => ({
				...v,
				hidden: v.parent ? answers[v.parent] !== true : false,
			}))}
			containerScrollY={true}
			onChange={handleChange}
			values={answers}
		/>
	);
};

const StoryMeta: Meta<ComponentType> = {
	title: 'Web/Components/QuestionsBox',
	component: QuestionsBox,
	render: Template,
};

export default StoryMeta;

export const QuestionsWithChildren = {
	args: {
		questionsBoxTitle: 'General Questions',
		yesLabel: 'yes',
		noLabel: 'no',
	},
};
