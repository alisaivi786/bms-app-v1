import { PropsWithChildren } from 'react';
import { Pressable, View } from 'react-native';
import { Portal } from '@gorhom/portal';
import { useMobileUIConfigOptions } from '../../layouts';
import { PrimitiveTypeKeys } from './AutoSuggestionsDropdown';
import styles from './AutoSuggestionsDropdown.styles';
import { AutoSuggestionsDropdownProvider, useAutoSuggestionsDropdownOptions } from './AutoSuggestionsDropdownContext';

export const DropdownMenuPortal = <TValue extends object, TKey extends PrimitiveTypeKeys<TValue>>({
	children,
	hide,
	onDismiss,
}: PropsWithChildren & { hide: boolean; onDismiss: () => void }) => {
	const { x, y, width, ...rest } = useAutoSuggestionsDropdownOptions<TValue>();
	const { tw } = useMobileUIConfigOptions();

	if (hide) return null;

	return (
		<Portal hostName="modalPortal">
			<AutoSuggestionsDropdownProvider<TValue, TKey> {...rest} x={x} y={y} width={width}>
				<>
					<Pressable style={tw`absolute top-0 left-0 w-full h-full`} onPress={onDismiss} />
					<View
						style={tw`${styles.menuContainerStyle('medium')} absolute top-[${y ?? 0}px] left-[${
							x ?? 0
						}px] w-[${width}px] overflow-hidden`}
					>
						{children}
					</View>
				</>
			</AutoSuggestionsDropdownProvider>
		</Portal>
	);
};
