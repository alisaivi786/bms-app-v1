import { Fragment, useState } from 'react';
import { Meta, StoryFn } from '@storybook/react-vite';
import { IUploadFile, UploadFile } from '../../../src/components/UploadFile';

type ComponentType = (args: IUploadFile) => JSX.Element;

const Template: StoryFn<ComponentType> = (args) => {
	const [isOpen, setIsOpen] = useState(false);

	const modalBody = (
		<>
			<p className="text-black">Download the member data template, fill in the details and re-upload it.</p>
			<p>
				Please do not change the name and format of the downloaded file while uploading it.
				<button className="font-medium text-caption1 nj-text-brand" onClick={() => alert('download event')}>
					Download XLSX template
				</button>
			</p>
		</>
	);

	return (
		<Fragment>
			<UploadFile
				{...args}
				isSubmitLoading={false}
				onSaveFile={(file, progressCallback) => {
					return new Promise((resolve) => {
						const func = (loaded: number) => {
							progressCallback(loaded, 100);

							if (loaded >= 100) {
								// In case of success with or without errors
								resolve({
									variant: 'uploaded',
									title: 'File Uploaded With Errors',
									description: '526 records uploaded, 3 of them have wrong format',
								});

								// server side rejection
								// resolve({
								// 	variant: 'unsuccessful',
								// 	message: 'File mismatch',
								// });

								// reject(); // Back to select file stage without error (network issue)
							}
						};

						// Defining for loop
						for (let i = 0; i <= 100; i = i + 5) {
							setTimeout(func, 20 * (i + 1), i);
						}
					});
				}}
				modalBody={modalBody}
				isOpen={isOpen}
				onClose={() => setIsOpen(false)}
			/>
			<button className="font-medium text-paragraph nj-text-brand" onClick={() => setIsOpen(true)}>
				Upload Data
			</button>
		</Fragment>
	);
};

const StoryMeta: Meta<ComponentType> = {
	title: 'Web/Components/UploadFile',
	component: UploadFile,
	render: Template,
};

export default StoryMeta;

export const UploadFiles = {
	args: {
		warningMessage: 'Any Warning Message',
		maxSize: 1,
		messages: {
			selectFileDropArea: (
				<p>
					Max file size: 8Mb
					<br />
					Supported file types are .xlsx
				</p>
			),
			selectFileButton: 'Choose a XLSX files',
		},
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		getValidateError: (_acceptedFile: any, rejectedFile: any) => {
			if (rejectedFile?.errors) {
				return rejectedFile.errors[0]?.message;
			}
		},
		accept: {
			'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': ['.xlsx', '.xls'],
		},
		hasCloseICon: true,
	},
};
