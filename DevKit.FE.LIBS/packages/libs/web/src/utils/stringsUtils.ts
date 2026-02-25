export const getResponsiveText = (text?: string | { base?: string; md?: string; lg?: string }) => {
	if (typeof undefined === typeof text || typeof text === 'string') {
		return {
			mobile: text as string | undefined,
			ipad: text as string | undefined,
			desktop: text as string | undefined,
		};
	}

	const mobileText = text?.base;
	const ipadText = text?.md === undefined ? mobileText : text.md;
	const desktopText = text?.lg === undefined ? ipadText : text.lg;

	return {
		mobile: mobileText,
		ipad: ipadText,
		desktop: desktopText,
	};
};
