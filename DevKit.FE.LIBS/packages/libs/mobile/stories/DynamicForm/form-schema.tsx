import { isNil } from 'lodash';
import * as Yup from 'yup';
import Zod from 'zod';
import { EyeIcon } from '@devkit/icons/native';
import {
	CommonRegex,
	FormFieldsSchema,
	IFormSchema,
	getTzEndOfDay,
	getTzTodayDate,
	logger,
	mapCapsuleButtonsField,
	mapCheckBoxField,
	mapCustomField,
	mapDatePicker,
	mapDatePickerRange,
	mapDropDown,
	mapMultiSelectDropDownField,
	mapNumberField,
	mapNumberRangeField,
	mapPasswordField,
	mapRadioButtonField,
	mapRadioCardsField,
	mapSeparatorField,
	mapTextAreaField,
	mapTextField,
} from '@devkit/utilities';
import { FormInputGroup } from '../../src/components/FormInputGroup';

export interface IUserData {
	userName?: string;
	emiratesId?: string;
	password?: string;
	userAge?: number;
	mobileNumber?: number;
	email?: string;
	description?: string;
	userGender?: number;
	visitedCountries?: number[];
	dateOfBirth?: string;
	licenseDateRange?: {
		startDate?: string;
		endDate?: string;
	};
	policyIssueDate?: {
		startDate?: string;
		endDate?: string;
	};
	multiRange?: {
		startNumber: string;
		endNumber: string;
	};
	radioCard?: boolean;
	radioButton?: string;
	capsuleButtons?: number;
	capsuleButtonMultiSelect?: number[];
	checkBox?: boolean;
}

const getFields = (args: { columnsCount: number; isEditable: boolean }): FormFieldsSchema<IUserData> => [
	mapTextField({
		field: 'userName',
		label: 'User Name',
		placeholder: 'User Name',
		popover: { header: 'devkit Tooltip', description: '' },
		isEditable: args.isEditable,
		isClearable: true,
		highlighted: true,
	}),
	mapTextField({
		field: 'emiratesId',
		label: 'Emirates Id',
		suffix: '784 -',
		placeholder: '1990 - 1234567 - 8',
		mask: '9999 - 9999999 - 9',
		onPaste: (value) => {
			const pastedValue = value.replace(/-|\s/g, '');

			return pastedValue.startsWith('784') ? pastedValue.substring(3) : pastedValue;
		},
		onBlur: () => {
			logger.log('[onBlurEvent]');
		},
	}),
	mapPasswordField({
		field: 'password',
		label: 'Password',
		placeholder: 'Password',
		popover: { header: 'devkit Tooltip', description: '' },
		isEditable: args.isEditable,
	}),
	mapNumberField({
		field: 'userAge',
		label: 'User Age',
		placeholder: 'User Age',
		isRequired: true,
		popover: { header: 'devkit Tooltip', description: '' },
		isEditable: args.isEditable,
		description: 'Age Must be 18 at least',
	}),
	mapTextField({
		field: 'email',
		label: 'Email',
		autoFill: 'email',
		placeholder: 'Email',
		popover: { header: 'devkit Tooltip', description: '' },
		isEditable: args.isEditable,
		directionForInput: 'ltr',
	}),
	mapTextAreaField({
		field: 'description',
		label: 'Description',
		placeholder: 'Any description...',
		popover: { header: 'devkit Tooltip', description: '' },
		isEditable: args.isEditable,
	}),
	mapDropDown({
		field: 'userGender',
		label: 'Gender',
		placeholder: 'Select Gender',
		options: [
			{ id: '1', label: 'Inpatient' },
			{ id: '2', label: 'Dental' },
			{ id: '3', label: 'Outpatient' },
			{ id: '4', label: 'Inpatient2' },
			{ id: '5', label: 'Dental2' },
			{ id: '6', label: 'Outpatient2' },
		],
		valueKey: 'id',
		labelKey: 'label',
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
		popover: { header: 'devkit Tooltip', description: '' },
		isEditable: args.isEditable,
	}),
	mapDatePicker({
		field: 'dateOfBirth',
		label: 'Date Of Birth',
		placeholder: 'Date Of Birth',
		popover: { header: 'devkit Tooltip', description: '' },
		format: 'date-only',
		isEditable: args.isEditable,
	}),
	mapDatePickerRange({
		field: 'licenseDateRange',
		label: 'license date range',
		placeholder: 'Select Date',
		popover: { header: 'devkit Tooltip', description: '' },
		isEditable: args.isEditable,
	}),
	mapDatePickerRange({
		field: 'policyIssueDate',
		label: 'Policy Issue Date',
		placeholder: 'Select Date',
		popover: { header: 'devkit Tooltip', description: '' },
		isEditable: args.isEditable,
		enableTimeSelection: true,
		maxStartDate: getTzEndOfDay(getTzTodayDate()),
		maxEndDate: getTzTodayDate(),
	}),
	mapSeparatorField(),
	mapNumberRangeField({
		field: 'multiRange',
		label: 'Number Range',
		popover: { header: 'devkit Tooltip', description: '' },
	}),
	mapCustomField({
		component: () => (
			<FormInputGroup label="Custom Field">
				<></>
			</FormInputGroup>
		),
	}),
	mapRadioCardsField({
		field: 'radioCard',
		label: 'Radio Cards',
		cards: [
			{ id: 1, label: 'label1', iconStart: EyeIcon },
			{ id: 2, label: 'label2' },
			{ id: 3, label: 'label3', iconEnd: EyeIcon },
		],
		description: 'radio cards',
		variant: 'checkmarks',
		direction: 'col',
	}),
	mapSeparatorField(),
	mapCheckBoxField({
		field: 'checkBox',
		label: 'Check Box',
		description: 'Check Box',
	}),

	mapRadioButtonField({
		columnsCount: 3,
		field: 'radioButton',
		options: [
			{ id: '1', label: 'label1' },
			{ id: '2', label: 'label2' },
			{ id: '3', label: 'label3' },
		],
	}),
	mapCapsuleButtonsField({
		field: 'capsuleButtons',
		label: 'Capsule Buttons',
		description: 'Capsule buttons - single select',
		options: [
			{ id: 1, name: 'Yes' },
			{ id: 2, name: 'No' },
		],
		valueKey: 'id',
		labelKey: 'name',
		variant: 'dark',
		size: 'small',
		isEditable: args.isEditable,
		minWidth: 50,
	}),
	mapCapsuleButtonsField({
		field: 'capsuleButtonMultiSelect',
		label: 'Capsule Button Multi-Select',
		description: 'Capsule buttons - multi select',
		options: [
			{ id: 1, name: 'Option 1' },
			{ id: 2, name: 'Option 2' },
			{ id: 3, name: 'Option 3' },
		],
		valueKey: 'id',
		labelKey: 'name',
		multiSelect: true,
		variant: 'gray',
		size: 'medium',
		isEditable: args.isEditable,
		minWidth: 50,
	}),
];

export const validationYup = Yup.object().shape({
	userName: Yup.string().min(10, 'Minimum length is 10').required('userName is required from yup'),
	password: Yup.string().min(8, 'Minimum length is 8').required('Required'),
	userAge: Yup.number().min(18, 'Minimum Age is 18').required(),
	mobileNumber: Yup.number().required(),
	email: Yup.string().matches(CommonRegex.email, 'Invalid Email'),
	userGender: Yup.number()
		.required()
		.test((val) => val !== 1),
	visitedCountries: Yup.array().of(Yup.number().required()).min(1),
	dateOfBirth: Yup.date().required(),
	licenseDateRange: Yup.object().shape({
		startDate: Yup.date().required('License Start Date Required'),
		endDate: Yup.date()
			.required('License End Date Require')
			.min(Yup.ref('startDate'), 'End date can not be before Start date'),
	}),
	multiRange: Yup.object().shape({
		startNumber: Yup.number()
			.required()
			.when('endNumber', ([endNumber], schema) => (isNil(endNumber) ? schema.max(Yup.ref('endNumber')) : schema)),
		endNumber: Yup.number().required(),
	}),
	radioCard: Yup.number().required(),
	checkBox: Yup.boolean().required(),
	radioButton: Yup.string().required(),
	capsuleButtons: Yup.number().required(),
	capsuleButtonMultiSelect: Yup.array().of(Yup.number().required()).min(1),
});

export const validationZod = () =>
	Zod.object({
		userName: Zod.string({
			required_error: 'userName is required from zod',
		}).min(10, 'Minimum length is 10'),
		password: Zod.string().min(8, 'Minimum length is 8'),
		userAge: Zod.number().min(18, 'Minimum Age is 18'),
		mobileNumber: Zod.number(),
		email: Zod.string().regex(CommonRegex.email, 'Invalid Email'),
		userGender: Zod.number().refine((val) => val !== 1),
		visitedCountries: Zod.array(Zod.number()).min(1),
		dateOfBirth: Zod.string().datetime(),
		licenseDateRange: Zod.object({
			startDate: Zod.string({
				required_error: 'License Start Date Required',
			}).datetime(),
			endDate: Zod.string({
				required_error: 'License End Date Require',
			}).datetime(),
		}),
		checkBox: Zod.boolean(),
		capsuleButtons: Zod.number(),
		capsuleButtonMultiSelect: Zod.array(Zod.number()).min(1),
		multiRange: Zod.object({
			startNumber: Zod.number(),
			endNumber: Zod.number(),
		}).refine((data) => data.startNumber <= data.endNumber, {
			message: 'endNumber must be greater or equal to startNumber.',
			path: ['endNumber'],
		}),
	});

export function getFormSchema(args: {
	columnsCount: number;
	isEditable: boolean;
	validationMode?: 'zod' | 'yup';
}): IFormSchema<IUserData> {
	return args.validationMode === 'zod'
		? {
				fields: getFields(args),
				initialValues: { userGender: 1 },
				validationMode: 'zod',
				validation: validationZod,
		  }
		: {
				fields: getFields(args),
				initialValues: { userGender: 1 },
				validationMode: 'yup',
				validation: validationYup,
		  };
}
