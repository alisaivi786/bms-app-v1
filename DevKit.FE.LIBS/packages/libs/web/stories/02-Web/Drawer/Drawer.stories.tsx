import { IDrawerProps } from '@devkit/shared-types';
import { Meta, StoryFn } from '@storybook/react-vite';
import { Button } from '../../../src/components/Buttons';
import { useDrawer } from '../../../src/components/Drawer/';
import { Drawer } from '../../../src/components/Drawer/Drawer';
import { IDrawerContextData } from '../../../src/components/Drawer/DrawerContext';
import { DevkitThemeProvider } from '../../../src/layouts/ThemeProvider';
import { useMockLayoutSettings } from '../../../src/test-utils/useMockLayoutSettings';

type ComponentType = (args: IDrawerProps & IDrawerContextData) => JSX.Element;

const Template: StoryFn<ComponentType> = (args) => {
	const { showDrawer } = useDrawer();

	return (
		<Button
			onClick={() => {
				showDrawer({ ...args });
			}}
		>
			Show Drawer
		</Button>
	);
};

const StoryMeta: Meta<ComponentType> = {
	title: 'Web/Components/Drawer',
	component: Drawer,
	render: Template,
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

/** This is the Left Drawer */
export const LeftDrawer = {
	args: {
		children: <div>Left Drawer</div>,
		position: 'left',
		title: <h2>Test Drawer</h2>,
		showCloseIcon: true,
		onClose: () => {
			alert('closed');
		},
		preventAutoClose: true,
	},
};

/** This is the Right Drawer */
export const RightDrawer = {
	args: {
		children: <div>Right Drawer</div>,
		position: 'right',
	},
};
