import { Pressable, Text, View } from 'react-native';
import { useMobileUIConfigOptions } from '../../../../layouts/ThemeProvider/theme-context';
import styles from '../../Dropdown.styles';

type SelectAllDropdownItemProps = {
	onSelectAll?: (isAllSelected: boolean) => void;
	selectAllText?: string;
	isAllSelected?: boolean;
	enableSelectAll?: boolean;
	searchText?: string;
	isLastItem?: boolean;
};

const SelectAllDropdownItem = ({
	onSelectAll,
	selectAllText,
	isAllSelected,
	enableSelectAll,
	searchText,
	isLastItem = false,
}: SelectAllDropdownItemProps) => {
	const { tw } = useMobileUIConfigOptions();
	const bottomSheetStyles = styles.bottomSheet();

	if (!enableSelectAll || searchText) return null;

	return (
		<Pressable
			style={tw`${bottomSheetStyles.dropdownItemContainer(isLastItem)}`}
			onPress={() => onSelectAll?.(!isAllSelected)}
		>
			<View style={tw`flex-row items-center justify-between`}>
				<Text style={tw`font-main-regular text-body text-gray-900`}>{selectAllText}</Text>
			</View>
		</Pressable>
	);
};

export default SelectAllDropdownItem;
