import { Meta } from '@storybook/react-vite';
import { StoryBookThemeProvider } from '../../../../.storybook/decorator/sbThemeProvider';
import { DashboardLayout, IDashboardLayoutProps } from '../../../../src/layouts/DashboardLayout/DashboardLayout';
import { useFullHeaderLayoutSettings } from './full-header-layout-settings';

type ComponentType = (args: { locale: 'ar' | 'en' } & IDashboardLayoutProps) => JSX.Element;

const FullHeaderDashboardLayoutComponent = (args: IDashboardLayoutProps) => {
	return (
		<DashboardLayout contentContainerWidth="stretched" {...args}>
			<p>
				Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent fringilla, mauris eget cursus rhoncus, enim
				urna aliquam felis, in lobortis massa ligula at eros. Vestibulum et finibus mauris, et malesuada massa. Mauris
				efficitur porta mauris, eu tristique nisi efficitur id. Vivamus fringilla nunc et nunc consectetur, sed pharetra
				sapien cursus. Phasellus a tincidunt neque. Vestibulum posuere turpis ultrices arcu tincidunt, a auctor leo
				molestie. Vivamus pretium volutpat turpis a tempus. Vivamus facilisis diam elementum elit aliquet maximus. Proin
				ac sapien sed nisl consectetur venenatis molestie at nulla. Quisque bibendum, eros quis efficitur scelerisque,
				dui eros ornare dui, in luctus neque ipsum at arcu. Sed id consectetur arcu, non fringilla eros. Ut dignissim
				scelerisque sapien quis condimentum. Mauris ultrices arcu ac congue rhoncus. Fusce sodales, eros id finibus
				feugiat, sem augue viverra orci, sit amet eleifend lacus nunc eget tortor.
			</p>
		</DashboardLayout>
	);
};

const StoryMeta: Meta<ComponentType> = {
	title: 'Web/Layouts/FullHeaderLayouts/FullHeaderDashboardLayout',
	component: DashboardLayout,
	render: FullHeaderDashboardLayoutComponent,
	parameters: {
		layout: 'fullscreen',
	},
	decorators: [
		(Story, Context) => {
			const layoutSettings = useFullHeaderLayoutSettings({ withMenu: true });

			return (
				<StoryBookThemeProvider sbContext={Context} settings={layoutSettings}>
					<Story />
				</StoryBookThemeProvider>
			);
		},
	],
};

export default StoryMeta;

export const FullHeaderDashboardLayout = {
	args: { variant: 'full-width' },
};
