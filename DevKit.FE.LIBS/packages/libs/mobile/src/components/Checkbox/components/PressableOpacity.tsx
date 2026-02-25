import { Pressable } from 'react-native';

export type TPressableOpacityProps = {
	checked: boolean;
	onChange: (value: boolean) => void;
	disabled?: boolean;
	children: JSX.Element;
};

export const PressableOpacity = ({ checked, onChange, disabled, children }: TPressableOpacityProps) => {
	return (
		<Pressable
			style={({ pressed }) => ({ opacity: pressed ? 0.6 : 1 })}
			disabled={disabled}
			onPress={() => onChange(!checked)}
		>
			{children}
		</Pressable>
	);
};
