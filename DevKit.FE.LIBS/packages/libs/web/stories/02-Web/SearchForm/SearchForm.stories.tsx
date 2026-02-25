import * as Yup from 'yup';
import {
	CommonRegex,
	FieldValues,
	IFormSchema,
	mapDatePicker,
	mapDatePickerRange,
	mapDropDown,
	mapMultiSelectDropDownField,
	mapNumberField,
	mapPasswordField,
	mapSeparatorField,
	mapTextField,
	useReactForm,
} from '@devkit/utilities';
import { Meta, StoryFn, StoryObj } from '@storybook/react-vite';
import { Button } from '../../../src/components/Buttons';
import { SearchForm } from '../../../src/components/SearchForm';
import { ISearchFormProps } from '../../../src/components/SearchForm/SearchForm';

interface IUserData {
	userName?: string;
	userAge?: number;
	dateOfBirth?: string;
	licenseDateRange?: {
		startDate?: string;
		endDate?: string;
	};
	visitedCountries?: number[];
	userGender?: number;
	userNumber?: number;
	password?: string;
	emirateId?: number[];
	email?: string;
	policyIssueDate?: {
		startDate?: string;
		endDate?: string;
	};
}

type ComponentType = (args: { columnsCount: number; isEditable: boolean }) => JSX.Element;

const Template: StoryFn<ComponentType> = (args) => {
	const schema: IFormSchema<IUserData> = {
		fields: [
			mapPasswordField({
				field: 'password',
				label: 'Password',
				placeholder: 'Password',
				popover: 'devkit Tooltip',
				isEditable: args.isEditable,
			}),
			mapSeparatorField(),
			mapTextField({
				field: 'userName',
				label: 'User Name',
				placeholder: 'User Name',
				popover: 'devkit Tooltip',
				isEditable: args.isEditable,
			}),
			mapNumberField({
				field: 'userAge',
				label: 'User Age',
				placeholder: 'User Age',
				isRequired: true,
				popover: 'devkit Tooltip',
				isEditable: args.isEditable,
			}),
			mapDropDown({
				field: 'userGender',
				label: 'Gender',
				placeholder: 'Select Gender',
				options: [
					{ id: 1, name: 'Male' },
					{ id: 2, name: 'Female' },
				],
				valueKey: 'id',
				labelKey: 'name',
				popover: 'devkit Tooltip',
				isEditable: args.isEditable,
			}),
			mapMultiSelectDropDownField({
				field: 'visitedCountries',
				label: 'Visited Countries',
				placeholder: 'Select Countries',
				options: [
					{ id: 1, name: 'Egypt' },
					{ id: 2, name: 'India' },
					{ id: 3, name: 'Jordan' },
					{ id: 4, name: 'UAE' },
				],
				valueKey: 'id',
				labelKey: 'name',
				popover: 'devkit Tooltip',
				isEditable: args.isEditable,
			}),
			mapMultiSelectDropDownField({
				field: 'emirateId',
				label: 'Emirates',
				placeholder: 'Select Emirates',
				options: [
					{ emirateId: 1, emirateName: 'Abu Dhabi' },
					{ emirateId: 2, emirateName: 'Sharjah' },
					{ emirateId: 3, emirateName: 'Dubai' },
				],
				valueKey: 'emirateId',
				labelKey: 'emirateName',
				popover: 'devkit Tooltip',
				isEditable: args.isEditable,
			}),
			mapDatePicker({
				field: 'dateOfBirth',
				label: 'Date Of Birth',
				placeholder: 'Date Of Birth',
				popover: 'devkit Tooltip',
				format: 'date-only',
				isEditable: args.isEditable,
			}),
			mapDatePickerRange({
				field: 'policyIssueDate',
				label: 'Policy Issue Date',
				placeholder: 'Select Date',
				popover: 'devkit Tooltip',
				isEditable: args.isEditable,
				enableTimeSelection: true,
				layoutClassName: 'col-span-2',
			}),
			mapDatePickerRange({
				field: 'licenseDateRange',
				label: 'license date range',
				placeholder: 'Select Date',
				popover: 'devkit Tooltip',
				isEditable: args.isEditable,
			}),
			mapNumberField({
				field: 'userNumber',
				label: 'User Number',
				placeholder: 'User Number',
				popover: 'devkit Tooltip',
				isEditable: args.isEditable,
			}),
			mapTextField({
				field: 'userNumber',
				label: 'mobileNumber',
				placeholder: '',
				mask: '99 999 9999',
				suffix: '+971',
				popover: 'devkit Tooltip',
				isEditable: args.isEditable,
			}),
			mapTextField({
				field: 'email',
				label: 'Email',
				placeholder: 'Email',
				popover: 'devkit Tooltip',
				isEditable: args.isEditable,
			}),
		],
		initialValues: {},
		validation: Yup.object().shape({
			userName: Yup.string().required(),
			userAge: Yup.number().required(),
			userGender: Yup.number().required(),
			visitedCountries: Yup.array().of(Yup.number().required()).min(1),
			userNumber: Yup.number().required(),
			dateOfBirth: Yup.date().required(),
			licenseDateRange: Yup.object().shape({
				startDate: Yup.date().required('License Start Date Required'),
				endDate: Yup.date()
					.required('License End Date Require')
					// eslint-disable-next-line quotes
					.min(Yup.ref('startDate'), "End date can't be before Start date"),
			}),
			email: Yup.string().matches(CommonRegex.email, 'Invalid Email'),
		}),
	};

	const form = useReactForm<IUserData>({
		initialValues: schema.initialValues,
		validation: schema.validation,
		onFormSubmit: async (values) => {
			alert(`The form has been submitted successfully. values: \n${JSON.stringify(values, null, 2)}`);
		},
	});

	const formValues = form.watchValues();

	return (
		<div className="bg-gray-50">
			<SearchForm form={form} fieldsStructure={schema.fields} />
			<br />
			<hr />
			Errors
			<div>{JSON.stringify(form.fieldsErrors)}</div>
			<hr />
			Values
			<div>{JSON.stringify(form.watchValues())}</div>
			<hr />
			<br />
			<Button layoutClassName="my-2" onClick={form.submitForm}>
				Submit without Disable
			</Button>
			<br />
			<br />
			<Button
				onClick={() => {
					form.setFieldValue('userName', 'values');
					const values = form.getValues();

					alert(JSON.stringify(values));
				}}
			>
				Test Set Then GetValues
			</Button>
			<br />
			<br />
			<Button
				onClick={() => {
					form.setFieldValue('userName', 'watch values');
					const values = form.watchValues();

					alert(JSON.stringify(values));
				}}
			>
				Test Set Then Watch Values
			</Button>
			<br />
			<br />
			<Button
				onClick={() => {
					form.setFieldValue('userName', 'outside');

					alert(JSON.stringify(formValues));
				}}
			>
				Test Set Then Watch Values
			</Button>
			<br />
			<br />
			<Button onClick={() => form.setFieldError('userName', 'Test Error')}>Set Error on User name</Button>
			<br />
			<br />
			<Button onClick={() => form.setFieldError('userName', undefined)}>Unset Error on User name</Button>
		</div>
	);
};

const StoryMeta: Meta<ISearchFormProps<FieldValues>> = {
	title: 'Web/Forms/SearchForm',
	component: SearchForm,
};

export default StoryMeta;

export const SearchForms: StoryObj<ComponentType> = {
	render: Template,
	args: {
		isEditable: true,
	},
};
