import React, { useState } from 'react';
import { Text, View } from 'react-native';
import { Meta, StoryFn, StoryObj } from '@storybook/react-webpack5';
import OTPField from '../../src/components/OTPField/OTPField';

const Template: StoryFn = (args) => {
    const [otp, setOtp] = useState<string>('');

    const handleOtpChange = (newOtp: string | undefined) => {
        setOtp(newOtp ?? '');
    };

    const handleCompleteOTP = (enteredOTP: string) => {
        setOtp(enteredOTP);
    };


    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 16 }}>
            <OTPField {...args} value={otp} onChange={handleOtpChange} onCompleteOTP={handleCompleteOTP} />
            <Text style={{ marginTop: 16 }}>OTP Entered: {otp}</Text>
        </View>
    );
};

const StoryMeta: Meta = {
    title: 'Mobile/Forms/OTPField',
    component: OTPField,
    args: {
        length: 4,
        disabled: false,
        hasErrors: true,
        showSuccess: false,
    },
    argTypes: {
        hasErrors: {
            control: 'boolean'
        },
        showSuccess: {
            control: 'boolean'
        }
    }
};

export default StoryMeta;

export const HasErrorOTP: StoryObj = {
    render: Template,
};
