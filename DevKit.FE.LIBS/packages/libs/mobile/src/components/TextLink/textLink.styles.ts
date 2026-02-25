import { Platform } from 'react-native';

const textLinkContainer = (pressed: boolean) => `flex-row gap-1 items-center ${pressed ? 'opacity-50' : 'opacity-100'}`;

const iconContainer = (iconSize: number) => `w-[${iconSize}px]  h-[${iconSize}px]`;

const textStyle = (textColor: string, fontSize: number, isBolded: boolean) =>
	`${textColor} text-[${fontSize}px] font-main-regular ${isBolded && Platform.OS === 'ios' && 'font-semibold'}`;

export default { textLinkContainer, iconContainer, textStyle };
