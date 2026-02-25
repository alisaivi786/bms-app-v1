import React, {useState} from 'react';
import {Text, View} from 'react-native';
import * as Yup from 'yup';
import { ITextFieldProps, logger, useReactForm } from '@devkit/utilities';
import { Meta, StoryFn } from '@storybook/react-webpack5';
import { TextField } from '../../src/components/TextField';
import { useMobileUIConfigOptions } from '../../src';
import Dropdown from '../../src/components/Dropdown/Dropdown';

type ComponentType = (args: ITextFieldProps) => JSX.Element;

type ItemType = { code: string; label: string };

const Template: StoryFn<ComponentType> = (args) => {
  const [dropDownState, setDropdownState] = useState('+971');
  const options: ItemType[] = [
    { code: '+971', label: '🇦🇪' },
    { code: '+33', label: '🇫🇷' },
    { code: '+49', label: '🇩🇪' },
    { code: '+39', label: '🇮🇹' },
  ];

  const validationScheme = Yup.object({
    mobile: Yup.string().required(),
    countryCode: Yup.number(),
  });

  const reactForm = useReactForm<{mobile: string, countryCode: number}>({
    initialValues: {
      mobile: '',
      countryCode: 971,
    },
    validation: validationScheme,
    onFormSubmit: (values) => {
      logger.log(values.mobile);
    },
    validateBehavior: 'on-submit',
  });

  const mobile = reactForm.getValues('mobile');
  const { tw } = useMobileUIConfigOptions();

  return (
    <>
      <View>
        <TextField
          {...args}
          form={reactForm}
          field="mobile"
          debounceTimeInMilliseconds={300}
          onChange={(v) => {
            logger.log(v);
          }}
          suffix={dropDownState}
          suffixNode={(
              <Dropdown
                  options={options}
                  value={dropDownState}
                  valueKey="code"
                  labelKey="label"
                  placeholder="Select an option"
                  onChange={(selectedItem) => {
                    setDropdownState(selectedItem || '');
                  }}
                  renderItem={(item) => (
                      <Text>
                        {item?.code} - {item?.label}
                      </Text>
                  )}
                  variant="menu"
              />
          )}
        />
      </View>
      <Text style={tw`p-5`}>Value is : {mobile}</Text>
    </>
  );
};

const StoryMeta: Meta<ComponentType> = {
  title: 'Mobile/Forms/Inputs/Text Field',
  component: Template,
  args: {
    label: 'Login Form',
    type: 'text',
    suffix: '+971',
    isRequired: true,
    inputMode: 'numeric',
  },
};

export default StoryMeta;

export const LoginForm = {
  argTypes: {
    directionForInput: { control: 'radio', options: ['ltr', 'rtl', undefined] },
    placeholderDir: { control: 'radio', options: ['ltr', 'rtl', undefined] },
    size: { control: 'radio', options: ['large', 'medium', 'small'] },
    errors: {
      control: 'text',
      description: 'Enter anything to see an error message'
    }
  },
  args: {
    label: 'Login Form',
    type: 'text',
    suffix: '+971',
    errors: '',
    isRequired: true,
    inputMode: 'numeric',
    disabled: false,
    placeholder: '000 000 000',
    directionForInput: 'rtl',
    placeholderDir: 'rtl',
		size: 'medium',
    mask: '999 999 999'
  },
};
