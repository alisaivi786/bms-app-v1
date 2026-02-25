import { ArrowDownIcon } from '@devkit/icons/web';
import { ComponentSize, TwLayoutClassName } from '@devkit/utilities';
import { TextVariantProps } from '../../components/Buttons';
import Button from '../../components/Buttons/Button';
import { LayoutHeaderMenu } from '../../components/LayoutHeaderMenu';
import { useResponsiveView } from '../../hooks/useResponsiveView';
import { ActionMenuBottomSheet } from './ActionMenuBottomSheet';
import { IGroupActionMenuItem, MenuItems } from './MenuItems';

export interface IActionMenuProps {
	/** The action menu variant */
	variant?: 'primary' | 'secondary' | 'text';
	/** The text size variant */
	textSize?: ComponentSize;
	/** If true, the component is disabled */
	disabled?: boolean;
	/** GroupsMenu contents, a list of objects containing the `renderItem` used to add a custom menu item,
	 *  and `onClick` a callback function to handle item selection, and `disable` which will disable the list item */
	groups: IGroupActionMenuItem[][];
	/** Used to pass title at the menu button */
	children: string;
	layoutClassName?: TwLayoutClassName;

	/** The icon to be displayed at the start of the button */
	iconStart?: TextVariantProps['iconStart'];
	/** The icon to be displayed at the end of the button */
	iconEnd?: TextVariantProps['iconEnd'];
	/** If true, the iconEnd will not be displayed */
	hideIconEnd?: boolean;
}

export const ActionMenu = (props: IActionMenuProps) => {
	const { sm: isMobile } = useResponsiveView();

	const iconEnd = props.hideIconEnd && !props.iconEnd ? undefined : props.iconEnd || ArrowDownIcon;

	if (isMobile) {
		return <ActionMenuBottomSheet {...props} iconEnd={iconEnd} />;
	}

	const { disabled = false, variant = 'secondary', groups, textSize = 'medium', children, layoutClassName } = props;

	return (
		<LayoutHeaderMenu
			variant="no-container-padding"
			placement="bottom-start"
			layoutClassName={layoutClassName}
			menuItems={<MenuItems groups={groups} />}
			triggerComponent={() => (
				<Button
					disabled={disabled}
					variant={variant}
					size={textSize}
					iconEnd={iconEnd}
					iconStart={props.iconStart}
					layoutClassName="w-full"
				>
					{children}
				</Button>
			)}
		></LayoutHeaderMenu>
	);
};
