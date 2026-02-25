import { FC, PropsWithChildren } from 'react';
import { IdevkitThemeProvider } from '@devkit/shared-types';
import { Meta } from '@storybook/react-vite';
import { AdminPageLayout } from '../../../../src/layouts/AdminPageLayout';
import { DevkitThemeProvider } from '../../../../src/layouts/ThemeProvider/devkitThemeProvider';
import { useMockLayoutSettings } from '../../../../src/test-utils/useMockLayoutSettings';

type ComponentType = FC<PropsWithChildren<IdevkitThemeProvider>>;

const AdminPageLayoutComponent = () => {
	return (
		<AdminPageLayout>
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
		</AdminPageLayout>
	);
};
const StoryMeta: Meta<ComponentType> = {
	title: 'Web/Layouts/DefaultLayouts/ThemeProvider',
	component: DevkitThemeProvider,
	parameters: {
		layout: 'fullscreen',
	},
	render: AdminPageLayoutComponent,
	decorators: [
		(Story) => {
			const layoutSettings = useMockLayoutSettings({
				withMenu: true,
				isExpanded: true,
				onExpandedStateChange() {
					alert('Expanded State Change');
				},
			});

			return (
				<DevkitThemeProvider {...layoutSettings}>
					<Story />
				</DevkitThemeProvider>
			);
		},
	],
};

export default StoryMeta;

export const ThemeProvider = {};
