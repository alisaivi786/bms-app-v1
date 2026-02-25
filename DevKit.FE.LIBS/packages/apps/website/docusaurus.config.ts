import * as process from 'node:process';
import { themes as prismThemes } from 'prism-react-renderer';
import rehypeKatex from 'rehype-katex';
import remarkMath from 'remark-math';
import type { Config } from '@docusaurus/types';
import localSearch from '@easyops-cn/docusaurus-search-local';

const websiteBaseUrl = 'https://devkit.shory.com';

const azureSvg =
	'<svg fill="currentColor" height="1em" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg"><path d="M0 11.865l2.995-3.953 11.208-4.557v-3.292l9.828 7.188-20.078 3.896v10.969l-3.953-1.141zM32 5.932v19.536l-7.672 6.531-12.401-4.073v4.073l-7.974-9.885 20.078 2.396v-17.26z"/></svg>';

const npmSvg =
	'<svg stroke="currentColor" fill="currentColor" stroke-width="0" version="1.1" viewBox="0 0 16 16"  height="1em"  xmlns="http://www.w3.org/2000/svg"><path d="M0 0v16h16v-16h-16zM13 13h-2v-8h-3v8h-5v-10h10v10z"></path></svg>';

type StoryBooks = 'Web' | 'Mobile' | 'Nextjs' | 'Utilities' | 'API Client';
type Links = {
	[K in StoryBooks]: `https://devkit.shory.com/${string}` | `http://localhost:${string|number}`;
};
const productionLinks: Links = {
	Web: 'https://devkit.shory.com/web',
	Mobile: 'https://devkit.shory.com/mobile',
	Nextjs: 'https://devkit.shory.com/nextjs',
	Utilities: 'https://devkit.shory.com/utilities',
	'API Client': 'https://devkit.shory.com/api-client',
} as const;

const localLinks: Links = {
	Web: 'http://localhost:6006',
	Mobile: 'http://localhost:6007',
	Nextjs: 'http://localhost:6008',
	Utilities: 'http://localhost:6009',
	'API Client': 'http://localhost:6009',
} as const;

const isDev = process.env.NODE_ENV === 'development';
const StorybookLinks = isDev ? localLinks : productionLinks;
const StorybookItems = Object.entries(StorybookLinks).map(([key, value]) => ({
	label: key,
	to: value,
	target: '_self',
}));

const config: Config = {
	title: 'Shory devkit Team',
	favicon: 'img/favicon.ico',
	url: websiteBaseUrl,
	baseUrl: '/',
	onBrokenLinks: 'warn',
	onBrokenMarkdownLinks: 'warn',
	i18n: {
		defaultLocale: 'en',
		locales: ['en'],
	},
	presets: [
		[
			'classic',
			{
				docs: {
					sidebarPath: './sidebars.ts',
					remarkPlugins: [remarkMath],
					rehypePlugins: [rehypeKatex],
					// Please change this to your repo.
					// Remove this to remove the "edit this page" links.
					// 	editUrl: 'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
				},
				blog: {
					showReadingTime: true,
					remarkPlugins: [remarkMath],
					rehypePlugins: [rehypeKatex],
					// Please change this to your repo.
					// Remove this to remove the "edit this page" links.
					// editUrl: 'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
				},
				theme: {
					customCss: './src/css/custom.css',
				},
			},
		],
	],

	themeConfig: {
		// Replace with your project's social card
		image: 'img/docusaurus-social-card.jpg',
		navbar: {
			title: 'devkit Team',
			logo: {
				alt: 'devkit Team',
				src: 'img/logo-icon.png',
			},
			items: [
				{
					type: 'docSidebar',
					sidebarId: 'codingStandardsSidebar',
					position: 'left',
					label: 'Coding Standards',
				},
				{ to: '/blog/tags', label: 'Knowledge Base', position: 'left' },
				{
					type: 'docSidebar',
					sidebarId: 'devkitPackagesSidebar',
					position: 'left',
					label: 'devkit Docs',
				},
				{
					type: 'search',
					position: 'right',
				},
				{
					type: 'dropdown',
					label: 'Storybook',
					position: 'right',
					to: StorybookLinks['Web'],
					items: StorybookItems,
					target: '_self',
				},
				{
					href: 'https://dev.azure.com/shory-com/',
					position: 'right',
					html: `<div class="link-logo">${azureSvg}Azure DevOps</div>`,
				},
				{
					href: 'https://dev.azure.com/shory-com/devkit/_artifacts/feed/devkit-frontend',
					html: `<div class="link-logo">${npmSvg}NPM</div>`,
					position: 'right',
				},
				{
					to: `${websiteBaseUrl}/internal-apps-auth/logout`,
					label: 'Logout',
					position: 'right',
					target: '_self',
				},
			],
		},
		footer: {
			style: 'dark',
			copyright: 'Built with ❤️ by Shory Development Team',
		},
		prism: {
			theme: prismThemes.github,
			darkTheme: prismThemes.dracula,
		},
	},
	markdown: {
		mermaid: true,
	},
	themes: [
		'@docusaurus/theme-mermaid',
		[
			localSearch,
			/** @type {import('@easyops-cn/docusaurus-search-local').PluginOptions} */
			{
				hashed: true,
			},
		],
	],
	stylesheets: [
		{
			href: 'https://cdn.jsdelivr.net/npm/katex@0.13.24/dist/katex.min.css',
			type: 'text/css',
			integrity: 'sha384-odtC+0UGzzFL/6PNoE8rX/SPcQDXBJ+uRepguP4QkPCm2LBxH3FA3y+fKSiJ+AmM',
			crossorigin: 'anonymous',
		},
	],
};

export default config;
