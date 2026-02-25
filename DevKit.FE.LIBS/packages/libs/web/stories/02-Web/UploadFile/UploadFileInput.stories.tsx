import { Fragment, useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { IUploadFileInput, UploadFileInput } from '../../../src/components/UploadFile';
import { UploadFileVariant } from '../../../src/components/UploadFile/upload-input/UploadFileInput';

type TUploadFileInputStory = StoryObj<typeof UploadFileInput>;

// Base messages configuration used across stories
const baseMessages = {
	buttonText: 'Upload File',
	dragAreaText: 'Drag and Drop here',
	uploadProgressTitle: 'Uploading',
	uploadProgressLabel: 'It may take few minutes to complete this process.',
	maxFileSize: 'Max file size 8 Mb.',
	supportedFileTypes: 'Supported file types are .jpg, .jpeg, .png and .pdf.',
	takePictureButtonText: 'Take Picture',
	editModalTitle: 'Document preview',
	editModalDescription: 'Please reupload your document if it`s not looking good',
	editModalButtonText: 'Reupload file',
	editModalTakePictureButtonText: 'Retake picture',
	editModalConfirm: 'Continue',
	useCamera: '"Shory" Would Like to Access the Camera',
	cameraPermissions: 'Take photos right within the app. You can change this option anytime in Settings.',
	permissionDenied: 'permission-denied',
	allowAccess: 'OK',
} as const;

// Enhanced messages for ImageCard variant
const imageCardMessages = {
	...baseMessages,
	browse: 'Browse',
	browsePrefixText: 'Take a photo or',
	editModalBrowse: 'reselect a file',
	editModalBrowsePrefixText: 'Retake a photo or',
} as const;

// Common file accept configurations
const acceptConfigurations = {
	images: {
		'image/png': ['.png'],
		'image/jpg': ['.jpg'],
		'image/jpeg': ['.jpeg'],
	},
	documents: {
		'application/pdf': ['.pdf'],
		'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': ['.xlsx', '.xls'],
		'application/msword': ['.doc'],
		'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
	},
	mixed: {
		'image/png': ['.png'],
		'image/jpg': ['.jpg'],
		'image/jpeg': ['.jpeg'],
		'application/pdf': ['.pdf'],
		'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': ['.xlsx', '.xls'],
	},
};

// Template component with state management
const Template = (args: IUploadFileInput) => {
	const [error, setError] = useState<string | undefined>();
	const [editingError, setEditingError] = useState<string | undefined>();
	const [existFile, setExistFile] = useState<string | undefined>(args.existFile);

	return (
		<Fragment>
			<UploadFileInput
				{...args}
				existFile={existFile}
				onSaveFile={(file, progressCallback) => {
					setExistFile(file.name);

					return new Promise((resolve) => {
						const func = (loaded: number) => {
							progressCallback(loaded, 100);

							if (loaded >= 100) {
								resolve();
							}
						};

						// Simulate upload progress
						for (let i = 0; i <= 100; i = i + 5) {
							setTimeout(func, 20 * (i + 1), i);
						}
					});
				}}
				getValidateError={(acceptedFile, rejectedFile, isEdit) => {
					if (isEdit) setEditingError(undefined);
					else setError(undefined);

					if (rejectedFile?.errors) {
						const errorMessage = `Validation failed: ${rejectedFile.errors[0]?.message}`;

						if (isEdit) setEditingError(errorMessage);
						else setError(errorMessage);

						return rejectedFile.errors[0]?.message;
					}
				}}
				errorMessage={error || args.errorMessage}
				editingErrorMessage={editingError}
				onClose={() => {
					setExistFile(undefined);
				}}
			/>
		</Fragment>
	);
};

// Meta configuration
const meta: Meta<typeof UploadFileInput> = {
	title: 'Web/Components/UploadFileInput',
	component: UploadFileInput,
	render: Template,
	parameters: {
		docs: {
			description: {
				component: `
The UploadFileInput component provides a comprehensive file upload solution with multiple variants and configurations.

## Features
- Multiple display variants (FormInput, Section, Thumbnail, ImageCard)
- File upload and camera capture options
- Drag and drop functionality
- File preview and editing capabilities
- Extensive customization options
- Error handling and validation
- Progress tracking during upload

## Variants
- **FormInput**: Standard form input with upload area
- **Section**: Compact horizontal layout
- **Thumbnail**: Minimal thumbnail display
- **ImageCard**: Card layout with thumbnail and actions
				`,
			},
		},
	},
	argTypes: {
		variant: {
			control: { type: 'select' },
			options: Object.values(UploadFileVariant),
			description: 'Visual variant of the upload component',
			table: {
				type: { summary: 'TUploadFileVariant' },
				defaultValue: { summary: 'form-input' },
			},
		},
		showFileUpload: {
			control: 'boolean',
			description: 'Show/hide the file upload functionality',
			table: {
				type: { summary: 'boolean' },
				defaultValue: { summary: 'true' },
			},
		},
		showTakePicture: {
			control: 'boolean',
			description: 'Show/hide the camera capture functionality',
			table: {
				type: { summary: 'boolean' },
				defaultValue: { summary: 'true' },
			},
		},
		disabled: {
			control: 'boolean',
			description: 'Disable the upload functionality',
			table: {
				type: { summary: 'boolean' },
				defaultValue: { summary: 'false' },
			},
		},
		isRequired: {
			control: 'boolean',
			description: 'Mark the field as required',
			table: {
				type: { summary: 'boolean' },
				defaultValue: { summary: 'false' },
			},
		},
		isClearable: {
			control: 'boolean',
			description: 'Show clear button for uploaded files',
			table: {
				type: { summary: 'boolean' },
				defaultValue: { summary: 'true' },
			},
		},
		isEditable: {
			control: 'boolean',
			description: 'Allow editing of uploaded files',
			table: {
				type: { summary: 'boolean' },
				defaultValue: { summary: 'false' },
			},
		},
		showThumbnail: {
			control: 'boolean',
			description: 'Display thumbnail preview of uploaded files',
			table: {
				type: { summary: 'boolean' },
				defaultValue: { summary: 'false' },
			},
		},
		centerItems: {
			control: 'boolean',
			description: 'Center align items in success state',
			table: {
				type: { summary: 'boolean' },
				defaultValue: { summary: 'true' },
			},
		},
		hasError: {
			control: 'boolean',
			description: 'Apply error styling',
			table: {
				type: { summary: 'boolean' },
				defaultValue: { summary: 'false' },
			},
		},
		highlighted: {
			control: 'boolean',
			description: 'Highlight the component background',
			table: {
				type: { summary: 'boolean' },
				defaultValue: { summary: 'false' },
			},
		},
		maxSize: {
			control: { type: 'number', min: 1, max: 100 },
			description: 'Maximum file size in MB',
			table: {
				type: { summary: 'number' },
				defaultValue: { summary: '10' },
			},
		},
		label: {
			control: 'text',
			description: 'Label text for the upload field',
			table: {
				type: { summary: 'string' },
				defaultValue: { summary: '""' },
			},
		},
		existFile: {
			control: 'text',
			description: 'Name of existing file to display',
			table: {
				type: { summary: 'string' },
			},
		},
		errorMessage: {
			control: 'text',
			description: 'Error message to display',
			table: {
				type: { summary: 'string | string[] | IErrorMessage | IErrorMessage[]' },
			},
		},
		buttonVariant: {
			control: { type: 'select' },
			options: ['primary', 'secondary', 'text'],
			description: 'Button styling variant',
			table: {
				type: { summary: 'primary | secondary | text' },
			},
		},
		popoverVariant: {
			control: { type: 'select' },
			options: ['default', 'info', 'warning'],
			description: 'Popover styling variant',
			table: {
				type: { summary: 'ComponentPopoverVariantType' },
			},
		},
		accept: {
			control: 'object',
			description: 'Accepted file types configuration',
			table: {
				type: { summary: 'Record<string, string[]>' },
			},
		},
		messages: {
			control: 'object',
			description: 'Text messages configuration',
			table: {
				type: { summary: 'TMessages' },
			},
		},
		previewFile: {
			control: 'object',
			description: 'Preview file configuration',
			table: {
				type: { summary: 'TFilePreview' },
			},
		},
		popover: {
			control: 'object',
			description: 'Popover configuration',
			table: {
				type: { summary: 'React.ReactNode | { header: string; description: string }' },
			},
		},
	},
};

export default meta;

// Base arguments shared across stories
const baseArgs = {
	label: 'Upload your document',
	maxSize: 10,
	accept: acceptConfigurations.mixed,
	messages: baseMessages,
	isRequired: true,
	isClearable: true,
	popover: { header: 'Upload Help', description: 'Select a file or take a photo to upload' },
	onSaveFile: () => Promise.resolve(),
} as const;

// 1. DEFAULT - Standard usage with both upload and camera
export const Default: TUploadFileInputStory = {
	args: {
		...baseArgs,
		variant: UploadFileVariant.FormInput,
		showFileUpload: true,
		showTakePicture: true,
		isEditable: true,
	},
};

// 2. VARIANTS - All visual variants
export const AllVariants: TUploadFileInputStory = {
	render: () => (
		<div className="space-y-8">
			<div>
				<h3 className="text-lg font-semibold mb-4">FormInput</h3>
				<Template {...{ ...baseArgs, variant: UploadFileVariant.FormInput }} />
			</div>
			<div>
				<h3 className="text-lg font-semibold mb-4">Section</h3>
				<Template {...{ ...baseArgs, variant: UploadFileVariant.Section }} />
			</div>
			<div>
				<h3 className="text-lg font-semibold mb-4">Thumbnail</h3>
				<Template
					{...{
						...baseArgs,
						variant: UploadFileVariant.Thumbnail,
						showThumbnail: true,
						previewFile: {
							thumbnailPath: 'https://www.shory.com/media/0sdfaqof/thirdparty.webp',
						},
					}}
				/>
			</div>
			<div>
				<h3 className="text-lg font-semibold mb-4">ImageCard</h3>
				<Template
					{...{
						...baseArgs,
						variant: UploadFileVariant.ImageCard,
						showThumbnail: true,
						messages: imageCardMessages,
						previewFile: {
							thumbnailPath: 'https://www.shory.com/media/0sdfaqof/thirdparty.webp',
						},
						existFile: '',
					}}
				/>
			</div>
		</div>
	),
};

// 3. INTERACTION STATES - Core functionality combinations
export const InteractionStates: TUploadFileInputStory = {
	render: () => (
		<div className="grid grid-cols-2 gap-6">
			<div>
				<h4 className="font-medium mb-2">Both Enabled</h4>
				<Template {...{ ...baseArgs, showFileUpload: true, showTakePicture: true }} />
			</div>
			<div>
				<h4 className="font-medium mb-2">Upload Only</h4>
				<Template {...{ ...baseArgs, showFileUpload: true, showTakePicture: false }} />
			</div>
			<div>
				<h4 className="font-medium mb-2">Camera Only</h4>
				<Template {...{ ...baseArgs, showFileUpload: false, showTakePicture: true }} />
			</div>
			<div>
				<h4 className="font-medium mb-2">Both Disabled</h4>
				<Template {...{ ...baseArgs, showFileUpload: false, showTakePicture: false }} />
			</div>
		</div>
	),
};

// 4. DISABLED STATE - When component is disabled
export const Disabled: TUploadFileInputStory = {
	args: {
		...baseArgs,
		disabled: true,
		showFileUpload: true,
		showTakePicture: true,
		messages: {
			...baseMessages,
			supportedFileTypes: 'This field is currently disabled',
		},
	},
};

// 5. ERROR STATE - When validation fails
export const WithError: TUploadFileInputStory = {
	args: {
		...baseArgs,
		hasError: true,
		errorMessage: 'File size too large. Please select a smaller file.',
		showFileUpload: true,
		showTakePicture: true,
	},
};

// 6. INDIVIDUAL VARIANTS - For interactive testing
export const FormInput: TUploadFileInputStory = {
	args: {
		...baseArgs,
		variant: UploadFileVariant.FormInput,
		showFileUpload: true,
		showTakePicture: true,
		isEditable: true,
	},
};

export const Section: TUploadFileInputStory = {
	args: {
		...baseArgs,
		variant: UploadFileVariant.Section,
		label: 'Upload Policy Certificate',
		showFileUpload: true,
		showTakePicture: true,
		isEditable: true,
		accept: acceptConfigurations.documents,
		messages: {
			...baseMessages,
			supportedFileTypes: 'Supported file types are .pdf, .xlsx, .doc, .docx',
		},
	},
};

export const Thumbnail: TUploadFileInputStory = {
	args: {
		...baseArgs,
		variant: UploadFileVariant.Thumbnail,
		label: 'Profile Picture',
		showFileUpload: true,
		showTakePicture: true,
		isEditable: true,
		showThumbnail: true,
		accept: acceptConfigurations.images,
		previewFile: {
			thumbnailPath: 'https://www.shory.com/media/0sdfaqof/thirdparty.webp',
		},
		messages: {
			...baseMessages,
			supportedFileTypes: 'Supported file types are .jpg, .jpeg, .png',
			maxFileSize: 'Max file size 5 Mb.',
		},
		maxSize: 5,
	},
};

export const ImageCard: TUploadFileInputStory = {
	args: {
		...baseArgs,
		variant: UploadFileVariant.ImageCard,
		label: 'Document Photo',
		showFileUpload: true,
		showTakePicture: true,
		isEditable: true,
		showThumbnail: true,
		centerItems: false,
		messages: imageCardMessages,
		previewFile: {
			thumbnailPath: 'https://www.shory.com/media/0sdfaqof/thirdparty.webp',
		},
		existFile: '',
	},
};
