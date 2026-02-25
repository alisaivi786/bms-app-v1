import { FC } from 'react';
import { Pressable, Text, View } from 'react-native';
import RNToast from 'react-native-toast-message';
import { ErrorIcon, SfXmarkIcon } from '@devkit/icons/native';
import { useMobileUIConfigOptions } from '../../../../layouts';
import { MessageProps } from './Message.types';

const DefaultToast = 'default' in RNToast ? (RNToast.default as typeof RNToast) : RNToast;

export const Message: FC<MessageProps> = ({ text = '', variant, isClosable = false }) => {
	const { tw, reverseLayout } = useMobileUIConfigOptions();

	const bgColor = `nj-toast-${variant}-bg-color`;
	const textColor = `nj-toast-${variant}-text-color`;

	return (
		<View style={tw`px-4 w-full`}>
			<View style={tw`flex-1 p-4 rounded-2 gap-2 ${bgColor} ${reverseLayout ? 'flex-row-reverse' : 'flex-row'}`}>
				<ErrorIcon style={tw`w-4 h-4 ${textColor}`} />
				<Text style={tw`flex-1 font-main-bold text-body ${textColor} ${reverseLayout ? 'text-right' : 'text-left'}`}>
					{text}
				</Text>
				{isClosable && (
					<Pressable onPress={() => DefaultToast.hide()}>
						<SfXmarkIcon style={tw`${textColor}`} height={20} width={20} />
					</Pressable>
				)}
			</View>
		</View>
	);
};
