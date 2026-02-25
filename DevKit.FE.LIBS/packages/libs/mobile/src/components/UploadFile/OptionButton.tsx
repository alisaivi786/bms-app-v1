import { Text, TouchableOpacity } from 'react-native';
import { useMobileUIConfigOptions } from '../../layouts/ThemeProvider/theme-context';

interface OptionButtonProps {
	text?: string;
	onPress: () => void;
}

export const OptionButton = ({ text, onPress }: OptionButtonProps) => {
	const { tw } = useMobileUIConfigOptions();

	return (
		<TouchableOpacity
			style={tw`bg-white border border-gray-600 rounded-3 p-4 flex-row items-center justify-between`}
			onPress={onPress}
		>
			<Text style={tw`text-paragraph font-main-medium text-black text-left`}>{text}</Text>
		</TouchableOpacity>
	);
};

