import React, { useState } from 'react';
import { Alert, View, ScrollView } from 'react-native';
import { Meta, StoryObj } from '@storybook/react-webpack5';
import { z } from 'zod';
import { useMobileUIConfigOptions } from '../../src/layouts/ThemeProvider/theme-context';
import { Button } from '../../src/components/Buttons';
import Modal from '../../src/components/DialogModal/Modal';
import { DynamicForm } from '../../src/components/DynamicForm';
import {
  useReactForm,
  mapTextField,
  mapDropDown,
  mapDatePicker,
  mapNumberField,
} from '@devkit/utilities';

import type { IFormSchema, FormFieldsSchema } from '@devkit/utilities';
type BottomSheetFormData = {
  userName?: string;
  userGender?: number;
  dateOfBirth?: string;
  age?: number;
}
const getFormSchema = (): IFormSchema<BottomSheetFormData> => {
  const fields: FormFieldsSchema<BottomSheetFormData> = [
    mapTextField({
      field: 'userName',
      label: 'User Name',
      placeholder: 'Enter your name',
      isRequired: true,
    }),
    mapDropDown({
      field: 'userGender',
      label: 'Gender',
      placeholder: 'Select Gender',
      options: [
        { id: 1, label: 'Male' },
        { id: 2, label: 'Female' },
        { id: 3, label: 'Other' },
      ],
      valueKey: 'id',
      labelKey: 'label',
      isRequired: true,
    }),
    mapDatePicker({
      field: 'dateOfBirth',
      label: 'Date of Birth',
      placeholder: 'Select your birth date',
      format: 'date-only',
      isRequired: true,
    }),
    mapNumberField({
      field: 'age',
      label: 'Age',
      placeholder: 'Enter your age',
      description: 'Age must be a number less than 100',
      isRequired: true,
    }),
  ];

  const validation = z.object({
    userName: z.string().nonempty('Name is required'),
    userGender: z.number({ invalid_type_error: 'Gender is required' }),
    dateOfBirth: z.string().nonempty('Date of Birth is required'),
    age: z
      .number({ invalid_type_error: 'Age must be a number' })
      .max(120, 'Age must be less than or equal to 120'),
  });

  return {
    fields,
    initialValues: {
      userGender: 1,
    },
    validation,
    validationMode: 'zod',
  };
};

type BottomSheetDynamicFormProps = {
  isOpen?: boolean;
  title?: string;
  subTitle?: string;
}
const BottomSheetDynamicForm: React.FC<BottomSheetDynamicFormProps> = ({
  isOpen = true,
  title = 'Dynamic Bottom Form',
  subTitle = 'Enter The details',
}) => {
  const { tw } = useMobileUIConfigOptions();
  const [modalOpen, setModalOpen] = useState(isOpen);
  const schema = getFormSchema();

  const form = useReactForm<BottomSheetFormData>({
    ...schema,
    onFormSubmit: async (values) => {
      Alert.alert('Form Submitted', JSON.stringify(values, null, 2));
    },
    validateBehavior: 'on-submit',
  });

  return (
    <View style={tw`flex-1 justify-center items-center`}>
      <Button onPress={() => setModalOpen(true)}>Open BottomSheet Form</Button>
      <Modal
        isOpen={modalOpen}
        title={title}
        subTitle={subTitle}
        snapPoints={['90%']}
        onClose={() => setModalOpen(false)}
        content={
          <View style={tw`flex-1`}>
            <ScrollView style={tw`flex-grow`} contentContainerStyle={tw`pb-20`}>
              <DynamicForm
                form={form}
                fieldsStructure={schema.fields}
                columnsCount={1}
              />
            </ScrollView>
          </View>
        }
        footer={
          <View style={tw`flex-row justify-between gap-2 pb-10`}>
            <Button onPress={form.submitForm}>Submit</Button>
            <Button onPress={() => setModalOpen(false)}>Cancel</Button>
          </View>
        }
      />
    </View>
  );
};

const StoryMeta: Meta<typeof BottomSheetDynamicForm> = {
  	title: 'Mobile/Forms/DynamicBottomSheetForm',
  component: BottomSheetDynamicForm,
  argTypes: {
    isOpen: {
      control: 'boolean',
      description: 'Controls whether the BottomSheet modal is open initially',
    },
    title: {
      control: 'text',
      description: 'The title of the BottomSheet modal',
    },
    subTitle: {
      control: 'text',
      description: 'The subtitle of the BottomSheet modal',
    },
  },
};

export default StoryMeta;
export const BottomSheetForm: StoryObj<typeof BottomSheetDynamicForm> = {
  args: {
    isOpen: true,
    title: 'Dynamic BottomSheet Form',
    subTitle: 'Details of user',
  },
};


