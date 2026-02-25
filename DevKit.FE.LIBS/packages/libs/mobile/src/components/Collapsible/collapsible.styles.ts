import clsx from 'clsx';
import { Platform } from 'react-native';

const collapsiblePressable = (reverseLayout: boolean) =>
	clsx(reverseLayout ? 'flex-row-reverse' : 'flex-row', 'w-full justify-between items-center');
const itemsContainer = 'my-1.5';

const childrenAnimatedContainer = 'overflow-hidden';

const childrenWrapper = (isRendered: boolean) =>
	clsx('absolute left-0 right-0', isRendered ? 'opacity-100' : 'opacity-0');

const collapsibleTitle = (reverseLayout: boolean) =>
	`text-title font-main-bold ${Platform.OS === 'ios' ? 'font-bold' : ''} ${reverseLayout ? '' : 'text-left'}`;

const contentContainer = 'my-1';

const expandIcon = 'nj-disclosure-expand-icon-color';

const dropDownIcon = 'nj-disclosure-dropdown-icon-color';

export default {
	collapsiblePressable,
	itemsContainer,
	collapsibleTitle,
	expandIcon,
	contentContainer,
	childrenWrapper,
	childrenAnimatedContainer,
	dropDownIcon,
};
