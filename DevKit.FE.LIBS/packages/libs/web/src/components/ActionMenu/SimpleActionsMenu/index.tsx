import { ActionMenu, IActionMenuProps } from '../../../molecules/ActionMenu';
import { IGroupActionMenuItem } from '../../../molecules/ActionMenu/MenuItems';
import RenderItem from './RenderItem';

export interface ISimpleActionMenuItem extends Omit<IGroupActionMenuItem, 'renderItem'> {
	label: string;
}

export interface IBaseActionMenuProps extends Omit<IActionMenuProps, 'groups' | 'children' | 'type'> {
	/** Menu contents, a list of objects containing labels */
	items: ISimpleActionMenuItem[];
	/** The action menu label */
	children: string;
}

export const SimpleActionsMenu = (props: IBaseActionMenuProps) => {
	const { children, items } = props;

	const groups: IGroupActionMenuItem[][] = [
		items.map((item, i) => ({
			...item,
			renderItem: <RenderItem key={`simple-action-${i}`} label={item.label} />,
		})),
	];

	return (
		<ActionMenu {...props} groups={groups}>
			{children}
		</ActionMenu>
	);
};
