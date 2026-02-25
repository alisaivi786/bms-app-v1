import {useRef, useState} from 'react';
import {BottomSheetModal} from '@gorhom/bottom-sheet';
import { DatePickerMode, FieldValues } from '@devkit/utilities';
import { Meta, StoryFn, StoryObj } from '@storybook/react-webpack5';
import { DatePicker, IDatePickerFieldProps } from '../../src/components/DatePicker';

type ComponentType = (args: IDatePickerFieldProps<FieldValues, DatePickerMode>) => JSX.Element;

const getEighteenYearsAgo = () => {
    const now = new Date;
    const eighteenYearsAgo = new Date(now);

    eighteenYearsAgo.setFullYear(now.getFullYear() - 18);

    return eighteenYearsAgo;
};

const Template: StoryFn<ComponentType> = (args) => {
    const [value, setValue] = useState<string | undefined>('1998-06-22T00:00:00.000Z');
    const bottomSheetModalRef = useRef<BottomSheetModal>(null);
    
    const onChange = (date: string | undefined) => {
        setValue(date);
    };
    
    const handleHideModal = () => {
        bottomSheetModalRef.current?.dismiss();
    };

    return (
        <DatePicker
            field="dateOfBirth"
            format="date-only"
            fromDate={new Date(Date.UTC(1925, 0, 2))}
            toDate={getEighteenYearsAgo()}
            isDateOfBirth={true}
            size="large"
            isClearable={false}
            onChange={onChange}
            onCalendarChange={handleHideModal}
            value={value}
            variant={args.variant}
        />
    );
};

const DatePickerMeta: Meta<typeof DatePicker> = {
    title: 'Mobile/Forms/Inputs/DatePicker',
    component: DatePicker,
    render: Template,
    args: {
        variant: 'default',
        mode: 'single',
    },
    argTypes: {
        variant: {
            name: 'Variant',
            control: 'select',
            options: ['default', 'iconOnly', 'staticCalendar'],
        },
        mode: {
            name: 'Mode',
            control: 'select',
            options: ['single', 'interval'],
        },
    },
};

export default DatePickerMeta;

export const DateOfBirth: StoryObj<typeof DatePicker> = {
    args: {},
};
