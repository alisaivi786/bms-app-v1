import { cloneDeep, isArray } from 'lodash';
import React from 'react';
import * as Yup from 'yup';
import { FieldValues, FormFieldsSchema, ICommonFieldProps } from '@devkit/utilities';
import { IColumn } from '../../../src/components/DataGrid';
import {
	DynamicReportApiPayload,
	DynamicReportDataApiResponse,
	DynamicReportFiltersApiResponse,
} from '../../../src/components/DynamicReport';
import { TextField } from '../../../src/components/TextField';

export const fetchDataApiSample = async (payload: DynamicReportApiPayload) => {
	let result = {
		data: [...apiSampleDataResponse.data],
		totalItemsCount: apiSampleDataResponse.data.length,
		columns: apiSampleDataResponse.columns,
	};

	if (payload?.searchData?.userName) {
		result.data = result.data.filter((item) => item?.name.includes(payload?.searchData?.userName));
		result.totalItemsCount = result.data.filter((item) => item?.name.includes(payload?.searchData?.userName))?.length;
	}
	const itemsPerPage = payload?.pagingAndSorting?.paging.pageSize;

	const pageNumber = payload?.pagingAndSorting?.paging.pageNumber;

	result = {
		...result,
		data: result?.data?.slice(pageNumber > 1 ? (pageNumber - 1) * itemsPerPage : 0, pageNumber * itemsPerPage),
	};

	//simulate api call
	const awaitedResult = await new Promise<DynamicReportDataApiResponse>((resolve) =>
		setTimeout(() => resolve(result), 2000)
	);

	return awaitedResult;
};

export const fetchFiltersApiSample = async (tab?: number | string) => {
	let fields: FormFieldsSchema<FieldValues> = [];

	fields = cloneDeep(apiSampleFiltersResponse?.fields);

	fields = fields?.map((field) => {
		if (field?.field === 'visitedCountries') {
			field.parentField = 'userGender';
			field.onParentChange = (val, newSchema, form) => {
				const { type } = newSchema;

				if (type === 'drop-down' || type === 'multi-drop-down') {
					newSchema.options = newSchema.options?.filter((option) =>
						isArray(val) ? val?.includes(option['groupId']) : option['groupId'] == val
					);
				}

				if (!val || (isArray(val) && !val?.length)) {
					form?.setFieldValue(newSchema.field, undefined);
				}

				return newSchema;
			};
		}

		return field;
	});

	if (tab !== 1) {
		fields = fields.slice(0, 3);
	}

	//simulate api call
	const awaitedFields = await new Promise<FormFieldsSchema<FieldValues>>((resolve) =>
		setTimeout(() => resolve(fields), 2000)
	);

	return { fields: awaitedFields };
};

export const apiSampleDataResponse = {
	data: [
		{ id: 0, name: 'Jone Doe Jone Doe Jone Doe Jone Doe', weight: 0 },
		{
			id: 1,
			name: 'nvdbsjkbcjnknfdvnklnlknlkdndvlkndlkdsnkldvndlkndlkdvnlkndvslkndclkcdsnlknlknlknklnklnlknklnlknlknlkk bvdksbkjajdskbjkbjvkbdkjbvfjbvdlkdsvbdjklsbvkjbvdkvjsbkjbjkvdsbkjvdsbvdkbdklnlkkkkkkkkkkkkkkkkkkkkkk',
			weight: 64,
			price: 10,
		},
		{
			id: 2,
			name: 'Jane Doe Jone Doe Jone Doe Jone Doe Jone Doe Jone Doe Jone Doe Jone Doe Jone Doe Jone Doe Jone Doe Jone Doe Jone Doe Jone Doe Jone Doe',
			weight: 44,
			price: 10,
		},
		{
			id: 3,
			name: 'Aaa Doe Jone Doe Jone Doe Jone Doe Jone Doe Jone Doe Jone Doe Jone Doe Jone Doe Jone Doe Jone Doe Jone Doe Jone Doe Jone Doe Jone Doe',
			weight: 66,
			price: 10,
		},
		{
			id: 4,
			name: 'Bbb Doe Jone Doe Jone Doe Jone Doe Jone Doe Jone Doe Jone Doe Jone Doe',
			weight: 44,
			price: 30,
		},
		{ id: 5, name: '', weight: 66 },
		{ id: 6, name: 'Ddd Doe', weight: 44 },
		{ id: 7, name: 'Eee Doe', weight: 64 },
		{ id: 8, name: 'Fff Doe', weight: 44 },
		{ id: 9, name: 'Jjj Doe', weight: 66 },
		{ id: 10, name: 'Lll Doe', weight: 44 },
		{ id: 11, name: 'Mmmm Doe', weight: 64 },
		{ id: 12, name: 'Nnn Doe', weight: 44 },
		{ id: 13, name: '', weight: 66 },
		{ id: 14, name: 'Ddd Doe', weight: 44 },
		{ id: 15, name: 'Eee Doe', weight: 64 },
		{ id: 16, name: 'Fff Doe', weight: 44 },
		{ id: 17, name: 'Jjj Doe', weight: 66 },
		{ id: 18, name: 'Lll Doe', weight: 44 },
		{ id: 19, name: 'Mmmm Doe', weight: 64 },
		{ id: 20, name: 'Nnn Doe', weight: 44 },
		{ id: 21, name: '', weight: 66 },
		{ id: 22, name: 'Ddd Doe', weight: 44 },
		{ id: 23, name: 'Eee Doe', weight: 64 },
		{ id: 24, name: 'Fff Doe', weight: 44 },
		{ id: 25, name: 'Jjj Doe', weight: 66 },
		{ id: 26, name: 'Lll Doe', weight: 44 },
		{ id: 27, name: 'Mmmm Doe', weight: 64 },
		{ id: 28, name: 'Nnn Doe', weight: 44 },
		{ id: 29, name: '', weight: 66 },
		{ id: 30, name: 'ZZ Doe', weight: 44 },
		{ id: 31, name: 'zz Doe', weight: 64 },
		{ id: 32, name: 'Fff Doe', weight: 44 },
		{ id: 33, name: 'Jjj Doe', weight: 66 },
		{ id: 34, name: 'Lll Doe', weight: 44 },
		{ id: 35, name: 'Mmmm Doe', weight: 64 },
		{ id: 36, name: 'Nnn Doe', weight: 44 },
		{ id: 37, name: '', weight: 66 },
		{ id: 38, name: 'Ddd Doe', weight: 44 },
		{ id: 39, name: 'Eee Doe', weight: 64 },
		{ id: 40, name: 'Fff Doe', weight: 44 },
		{ id: 41, name: 'Jjj Doe', weight: 66 },
		{ id: 42, name: 'Lll Doe', weight: 44 },
		{ id: 43, name: 'Mmmm Doe', weight: 64 },
		{ id: 44, name: 'Nnn Doe', weight: 44 },
		{ id: 45, name: '', weight: 66 },
		{ id: 46, name: 'Ddd Doe', weight: 44 },
		{ id: 47, name: 'Eee Doe', weight: 64 },
		{ id: 48, name: 'Fff Doe', weight: 44 },
		{ id: 49, name: 'Jjj Doe', weight: 66 },
		{ id: 50, name: 'Lll Doe', weight: 44 },
		{ id: 51, name: 'Mmmm Doe', weight: 64 },
		{ id: 52, name: 'Nnn Doe', weight: 44 },
		{ id: 53, name: '', weight: 66 },
		{ id: 54, name: 'Ddd Doe', weight: 44 },
		{ id: 55, name: 'Eee Doe', weight: 64 },
		{ id: 56, name: 'Fff Doe', weight: 44 },
		{ id: 57, name: 'Jjj Doe', weight: 66 },
		{ id: 58, name: 'Lll Doe', weight: 44 },
		{ id: 59, name: 'Mmmm Doe', weight: 64 },
		{ id: 60, name: 'Nnn Doe', weight: 44 },
		{ id: 61, name: '', weight: 66 },
		{ id: 62, name: 'Ddd Doe', weight: 44 },
		{ id: 63, name: 'Eee Doe', weight: 64 },
		{ id: 64, name: 'Fff Doe', weight: 44 },
		{ id: 65, name: 'Jjj Doe', weight: 66 },
		{ id: 69, name: 'Lll Doe', weight: 44 },
		{ id: 70, name: 'Mmmm Doe', weight: 64 },
		{ id: 71, name: 'Nnn Doe', weight: 44 },
		{ id: 70, name: 'aa Doe', weight: 64 },
		{ id: 71, name: 'bb Doe', weight: 44 },
	],
	totalItemsCount: 0,
	columns: [
		{
			name: 'ID',
			field: 'id',
			sortable: true,
			frozen: 'left',
		},
		{ field: 'name', name: 'Name', sortable: true, width: '250px' },
		{
			field: 'weight',
			name: 'Person Weight',
			sortable: true,
		},
	] as IColumn<Record<string, unknown>, string>[],
};

const customComponent: React.FC<ICommonFieldProps<unknown, FieldValues>> = (props) => (
	<TextField label="Mobile Number" suffix="+971" mask="99 999 9999" form={props.form} field="phone" />
);

export const apiSampleFiltersResponse: DynamicReportFiltersApiResponse = {
	fields: [
		{
			field: 'userName',
			label: 'User Name',
			placeholder: 'User Name',
			isEditable: true,
			isClearable: true,
			type: 'text',
			description: 'Minimum 10 characters',
		},
		{
			field: 'phone',
			type: 'custom',
			component: customComponent,
		},
		{
			field: 'password',
			label: 'Password',
			placeholder: 'Password',
			isClearable: true,
			isEditable: true,
			type: 'password',
		},
		{
			field: 'userAge',
			label: 'User Age',
			placeholder: 'User Age',
			isClearable: true,
			isEditable: true,
			type: 'number',
		},
		{
			field: 'userGender',
			label: 'Gender',
			placeholder: 'Select Gender',
			options: [
				{ id: 1, name: 'Male' },
				{ id: 2, name: 'Female' },
			],
			valueKey: 'id',
			labelKey: 'name',
			isEditable: true,
			type: 'multi-drop-down',
			isClearable: true,
		},
		{
			field: 'visitedCountries',
			label: 'Visited Countries',
			placeholder: 'Select Countries',
			options: [
				{ id: 1, name: 'Egypt', groupId: 1 },
				{ id: 2, name: 'India', groupId: 1 },
				{ id: 3, name: 'Jordan', groupId: 2 },
				{ id: 4, name: 'UAE', groupId: 2 },
			],
			valueKey: 'id',
			labelKey: 'name',
			isEditable: true,
			isClearable: true,
			type: 'drop-down',
		},
	],
};

export const validationYup = Yup.object().shape({
	userName: Yup.string().required('User Name is required'),
});
