import React, { useState } from 'react';
import {Text, View} from 'react-native';
import { DropdownProps } from '@devkit/utilities';
import { Meta, StoryFn, StoryObj } from '@storybook/react-webpack5';
import Dropdown from '../../src/components/Dropdown/Dropdown';

type ItemType = { code: string; label: string };

type ComponentType = (args: DropdownProps<ItemType, 'label', never, undefined>) => JSX.Element;

const Template: StoryFn<ComponentType> = (props) => {
  const [dropDownState, setDropdownState] = useState('1');
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

  return (
    <View style={{ padding: 20, flex: 1 }}>
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
            {item?.label}
          </Text>
        )}
        variant={props.variant}
        snapPoints={['70%']}
      />
    </View>
  );
};

const StoryMeta: Meta<ComponentType> = {
  title: 'Mobile/Forms/Inputs/Dropdown',
  render: Template,
  args: {
    variant: 'menu',
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['menu', 'default'],
    },
  }
};

export default StoryMeta;

export const VariantDropdown: StoryObj<DropdownProps<ItemType, 'label', never, undefined>> = {
  args: { label: 'Dropdown', placeholder: 'Please select', onSearch: undefined },
};
