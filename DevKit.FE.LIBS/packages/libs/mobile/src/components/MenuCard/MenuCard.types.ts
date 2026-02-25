import { ReactElement } from 'react';

export type MenuButtonProps = {
	title: string;
	icon: ReactElement;
	onPress: () => void;
	inGroup?: boolean;
	startComponents?: { component: ReactElement; key?: string }[];
	endComponents?: { component: ReactElement; key?: string }[];
};

export type MenuCardProps = {
	title?: string;
	items: MenuButtonProps[];
};
