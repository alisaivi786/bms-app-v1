import React, {useCallback, useState} from 'react';
import {Text, View} from 'react-native';
import * as Yup from 'yup';
import { ITextFieldProps, logger, useReactForm } from '@devkit/utilities';
import { Meta, StoryFn } from '@storybook/react-webpack5';
import { TextField } from '../../src/components/TextField';
import { useMobileUIConfigOptions } from '../../src';
import Dropdown from '../../src/components/Dropdown/Dropdown';
import {NjMapPinIcon, SearchIcon} from '@devkit/icons/native';

type ComponentType = (args: ITextFieldProps) => JSX.Element;

type ItemType = { code: string; label: string };

const options: ItemType[] = [
    { code: '1', label: 'Paris' },
    { code: '2', label: 'London' },
    { code: '3', label: 'Dubai' },
    { code: '4', label: 'Warsaw' },
    { code: '5', label: 'Tokyo' },
    { code: '6', label: 'New-York' },
    { code: '7', label: 'Tashkent' },
    { code: '8', label: 'Some city with very long name' },
];

const Template: StoryFn<ComponentType> = (args) => {
    const [dropDownState, setDropdownState] = useState('1');

    const validationScheme = Yup.object({
        mobile: Yup.string().required(),
        countryCode: Yup.number(),
    });

    const reactForm = useReactForm<{search: string}>({
        initialValues: {
            search: '',
        },
        validation: validationScheme,
        onFormSubmit: (values) => {
            logger.log(values.search);
        },
        validateBehavior: 'on-submit',
    });

    const search = reactForm.getValues('search');
    const { tw } = useMobileUIConfigOptions();
    
    const onChangeDropdown = useCallback((selectedItem?: string) => {
        setDropdownState(selectedItem || '');
    }, []);

    return (
        <>
            <View>
                <TextField
                    {...args}
                    form={reactForm}
                    field="search"
                    variant='search'
                    startIcon={SearchIcon}
                    debounceTimeInMilliseconds={500}
                    onChange={(v) => {
                        logger.log(v);
                    }}
                    postfixNode={(
                        <View style={{ paddingLeft: 4, flexDirection: 'row', gap: 4, alignItems: 'center' }}>
                            <NjMapPinIcon height={24} width={24} color={tw.color('text-gray-400')} />
                            <Dropdown
                                options={options}
                                value={dropDownState}
                                valueKey="code"
                                labelKey="label"
                                placeholder="Select an option"
                                onChange={onChangeDropdown}
                                renderItem={(item) => (
                                    <Text>
                                        {item?.label}
                                    </Text>
                                )}
                                variant="menu"
                            />
                        </View>
                    )}
                />
            </View>
            <Text style={tw`p-5`}>Value is : {search}</Text>
        </>
    );
};

const StoryMeta: Meta<ComponentType> = {
    title: 'Mobile/Forms/Inputs/Text Field',
    component: Template,
    args: {
        label: 'Search Form',
        type: 'text',
        isRequired: false,
        inputMode: 'search',
    },
};

export default StoryMeta;

export const SearchForm = {
    argTypes: {
        directionForInput: { control: 'radio', options: ['ltr', 'rtl', undefined] },
        placeholderDir: { control: 'radio', options: ['ltr', 'rtl', undefined] },
        errors: {
            control: 'text',
            description: 'Enter anything to see an error message'
        }
    },
    args: {
        label: 'Search Form',
        type: 'text',
        errors: '',
        isRequired: true,
        inputMode: 'search',
        disabled: false,
        placeholder: 'Search',
        directionForInput: 'rtl',
        placeholderDir: 'rtl',
    },
};
