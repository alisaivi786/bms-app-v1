import { ReactNode } from 'react';

export interface AppHeaderRightComponent {
	icon: ReactNode;
	onPress?: () => void;
}

export interface AppHeaderProps {
	leftIcon?: ReactNode;
	onLeftPress?: () => void;

	primaryText?: ReactNode;
	/** Optional center component; when provided, it replaces the title in the center area */
	centerComponent?: ReactNode;

	/** text before display name. for example: welcome back */
	secondaryText?: string;
	title?: string;

	rightComponents?: AppHeaderRightComponent[];
}
