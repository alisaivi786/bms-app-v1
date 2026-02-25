import { Meta } from '@storybook/react-vite';
import { StoryBookThemeProvider } from '../../../../.storybook/decorator/sbThemeProvider';
import { FullPageLayout, IFullPageLayoutProps } from '../../../../src/layouts/FullPageLayout/FullPageLayout';
import { useFullHeaderLayoutSettings } from './full-header-layout-settings';

type ComponentType = (args: IFullPageLayoutProps & { content: string }) => JSX.Element;

const FullPageFulledWidthLayout = () => {
	return (
		<FullPageLayout
			stickyHeader
			isFooterSticky={false}
			isSubHeaderSticky={false}
			backToTop=""
			variant="full-width"
			contentContainerWidth="full-width"
		>
			<p className="p-4 md:p-6 lg:px-8">
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
		</FullPageLayout>
	);
};

const StoryMeta: Meta<ComponentType> = {
	title: 'Web/Layouts/FullHeaderLayouts/FullPageFulledWidthLayout',
	component: FullPageLayout,
	render: FullPageFulledWidthLayout,
	parameters: {
		layout: 'fullscreen',
	},
	decorators: [
		(Story, Context) => {
			const layoutSettings = useFullHeaderLayoutSettings({ withMenu: true, hamburgerPosition: 'right' });

			return (
				<StoryBookThemeProvider sbContext={Context} settings={layoutSettings}>
					<Story />
				</StoryBookThemeProvider>
			);
		},
	],
};

export default StoryMeta;

export const FullPage = {};
