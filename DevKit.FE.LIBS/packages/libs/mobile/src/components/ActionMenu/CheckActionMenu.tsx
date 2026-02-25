import { Text, View } from 'react-native';
import { CheckIcon } from '@devkit/icons/native';
import { useMobileUIConfigOptions } from '../../layouts';
import { ActionMenu, IActionMenuProps } from './ActionMenu';
import styles from './ActionMenu.styles';
import { IGroupActionMenuItem } from './MenuItems';

export interface ICheckActionMenuItem<TKey> extends Omit<IGroupActionMenuItem, 'renderItem' | 'onClick'> {
	/** The menu item id */
	id: TKey;
	/** The menu Item Text */
	label: string;
}

export interface ICheckActionMenuProps<TKey> extends Omit<IActionMenuProps, 'groups' | 'children' | 'type'> {
	/** Menu contents, a list of objects containing labels and ids */
	items: ICheckActionMenuItem<TKey>[];
	/** The menu button text */
	children: string;
	/** `Callback` function to handle menu item selection */
	onChange: (id: TKey) => void;
	/** The selected menu item id */
	value: TKey;
}

const RenderItem = ({ label, checked }: { label: string; checked: boolean }) => {
	const { tw } = useMobileUIConfigOptions();

	return (
		<View style={tw`${styles.renderItemContainer}`}>
			<CheckIcon width={12} height={12} color={checked ? tw.color('nj-text-brand') : 'transparent'} />

			<Text style={tw`${checked ? 'font-main-medium' : ''} text-paragraph`}>{label}</Text>
		</View>
	);
};

export const CheckActionMenu = <TKey,>(props: ICheckActionMenuProps<TKey>) => {
	const { children, items, onChange, value } = props;

	const groups: IGroupActionMenuItem[][] = [
		items.map((item) => ({
			...item,
			renderItem: <RenderItem key={`${item.id}`} label={item.label} checked={item.id === value} />,
			onClick: () => onChange(item.id),
		})),
	];

	return (
		<ActionMenu {...props} groups={groups}>
			{children}
		</ActionMenu>
	);
};
