import { create } from '@storybook/theming';

const sbTheme = create({
	base: 'light',
	brandTitle: 'devkit DLS',
	brandUrl: '/',
	brandImage: '/devkit-logo2.png',
	brandTarget: '_self',
	fontBase: '',
});

export { sbTheme };
