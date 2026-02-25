import { View } from 'react-native';
import { useMobileUIConfigOptions } from '../../layouts/ThemeProvider/theme-context';

export const Divider = () => {
	const { tw } = useMobileUIConfigOptions();

	return <View style={tw`h-[1px] w-full bg-gray-200 my-1`} />;
};
