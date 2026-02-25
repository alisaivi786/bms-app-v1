import { Fragment, useState } from 'react';
import { Meta, StoryFn } from '@storybook/react-vite';
import QuestionBlock, { IQuestionBlockProps } from '../../../src/components/QuestionBlock/QuestionBlock';
import { UploadFileInput } from '../../../src/components/UploadFile';

type ComponentType = (args: IQuestionBlockProps) => JSX.Element;

const Template: StoryFn<ComponentType> = (args) => {
	const [isRegulated, setIsRegulated] = useState(false);
	const [error, setError] = useState<string | undefined>();
	const [existFile, setExistFile] = useState<string | undefined>('test.xlsx');

	return (
		<QuestionBlock {...args} question="Is your firm a regulated entity?" onChange={(value) => setIsRegulated(value)}>
			<Fragment>
				<UploadFileInput
					{...args}
					maxSize={1}
					accept={{
						'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': ['.xlsx', '.xls'],
						'image/png': ['.png'],
						'image/jpg': ['.jpg'],
						'image/jpeg': ['.jpeg'],
						'text/pdf': ['.pdf'],
					}}
					messages={{
						buttonText: 'Upload File',
						dragAreaText: 'Drag and Drop here',
						uploadProgressLabel: 'It may take few minutes to complete this process.',
						uploadProgressTitle: 'Uploading',
						maxFileSize: 'Max file size 8 Mb.',
						supportedFileTypes: 'Supported file types are .jpg, .jpeg, .png and .pdf.',
					}}
					existFile={existFile}
					label="Trade License"
					onSaveFile={(file, progressCallback) => {
						// eslint-disable-next-line @typescript-eslint/no-unused-vars
						return new Promise((resolve, reject) => {
							const func = (loaded: number) => {
								progressCallback(loaded, 100);

								if (loaded >= 100) {
									// In case of success with or without errors
									resolve();
								}
							};

							// Defining for loop
							for (let i = 0; i <= 100; i = i + 5) {
								setTimeout(func, 20 * (i + 1), i);
							}
						});
					}}
					getValidateError={(acceptedFile, rejectedFile) => {
						setError(undefined);

						if (rejectedFile?.errors) {
							setError('Something went wrong');

							return rejectedFile.errors[0]?.message;
						}
					}}
					errorMessage={error}
					onClose={() => setExistFile(undefined)}
				/>
				{isRegulated}
			</Fragment>
		</QuestionBlock>
	);
};

const StoryMeta: Meta<ComponentType> = {
	title: 'Web/Components/QuestionsBlock',
	component: QuestionBlock,
	render: Template,
};

export default StoryMeta;

export const QuestionBlocks = {
	args: {
		yesLabel: 'Yes',
		noLabel: 'No',
	},
};
