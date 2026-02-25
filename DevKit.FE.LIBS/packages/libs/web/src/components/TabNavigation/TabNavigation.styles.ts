// import clsx from 'clsx';
import clsx from 'clsx';

const stylesByVariant = {
	filled: {
		selected: 'nj-tab-nav-filled-active font-bold',
		notSelected: 'nj-tab-nav-filled-inactive font-medium ',
		tabStyle: 'shadow rounded min-h-0 w-full py-2 text-caption1 whitespace-nowrap px-2.5',
		listStyle:
			'flex flex-row rounded-md nj-tab-nav-filled-inactive p-0.5 min-w-fit',
	},
	'filled-dark': {
		selected: 'bg-black text-white font-bold',
		notSelected: 'font-medium',
		tabStyle: 'shadow rounded-full min-h-0 w-full py-2 text-caption1 whitespace-nowrap px-2.5',
		listStyle: 'flex flex-row rounded-full nj-tab-nav-filled-inactive p-0.5 border border-gray-200 min-w-fit',
	},
	'gradient': {
		selected: 'bg-gradient-to-r from-[var(--nj-tab-nav-gradient-selected-from)] to-[var(--nj-tab-nav-gradient-selected-to)] text-white shadow-lg hover:shadow-xl',
		notSelected: 'text-[var(--nj-tab-nav-gradient-not-selected-text)] hover:[--nj-tab-nav-gradient-not-selected-text-hover] hover:[var(--nj-tab-nav-gradient-not-selected-bg-hover)]',
		tabStyle: 'px-3 py-1.5 text-caption1 font-bold transition-all duration-300 whitespace-nowrap rounded-lg',
		listStyle: 'flex flex-wrap md:flex-nowrap md:items-center space-x-1 bg-white/80 backdrop-blur-[12px] p-1 border border-[var(--nj-tab-nav-gradient-border-color)] rounded-xl',
	}
};
const tabContainer = (noContainerBorder: boolean) =>
	clsx('flex h-full max-h-full flex-1 flex-col gap-4', !noContainerBorder ? 'overflow-hidden' : '');

const tabPanels = (noContainerBorder: boolean) =>
	clsx('max-h-full w-full flex-1 rounded-md', noContainerBorder ? '' : 'overflow-y-auto border border-gray-300 p-5');

export default {
	stylesByVariant,
	tabContainer,
	tabPanels,
};
