import { Pressable, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { TwLayoutClassName } from '@devkit/utilities';
import { useMobileUIConfigOptions } from '../../layouts/ThemeProvider/theme-context';
import styles from './OverlayButton.styles';

type OverlayButtonItem = {
	/** Text to display on the button */
	text: string;
	/** Icon component to display at the start of the button (optional) */
	iconStart?: React.FC<React.SVGProps<SVGSVGElement>>;
	/** Icon component to display at the end of the button (optional) */
	iconEnd?: React.FC<React.SVGProps<SVGSVGElement>>;
	/** Press handler for this button */
	onPress: () => void | Promise<void>;
	/** If true, a loading spinner will appear and button will be disabled */
	isLoading?: boolean;
	/** If true, the button will be disabled */
	disabled?: boolean;
};

type OverlayButtonProps = {
	/** Array of buttons to display */
	buttons: OverlayButtonItem[];
	/** Override or extend the styles applied to the component */
	layoutClassName?: TwLayoutClassName;
};

const OverlayButton = ({ buttons, layoutClassName }: OverlayButtonProps) => {
	const { tw } = useMobileUIConfigOptions();
	const { bottom: bottomInset } = useSafeAreaInsets();

	return (
		<View style={[tw`${styles.overlayWrapper}`, { bottom: bottomInset }]} pointerEvents="box-none">
			<View style={tw`${styles.overlayButton(layoutClassName)}`}>
				{buttons.map((button, index) => {
					const isDisabled = button.disabled || button.isLoading;

					return (
						<View key={index} style={tw`flex flex-row items-center gap-1`}>
							{index > 0 && <View style={tw`${styles.separator}`} />}
							<Pressable
								style={({ pressed }) => tw`${styles.button} ${pressed ? 'opacity-75' : isDisabled ? 'opacity-50' : ''}`}
								onPress={button.onPress}
								disabled={isDisabled}
							>
								{button.iconStart && <button.iconStart style={tw`${styles.iconStyle}`} height={16} width={16} />}
								<Text style={tw`${styles.text}`}>{button.text}</Text>
								{button.iconEnd && <button.iconEnd style={tw`${styles.iconStyle}`} height={16} width={16} />}
							</Pressable>
						</View>
					);
				})}
			</View>
		</View>
	);
};

export default OverlayButton;
