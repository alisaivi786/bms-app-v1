import { render } from '@testing-library/react';
import { useMockLayoutSettings } from '../../test-utils/useMockLayoutSettings';
import { DevkitThemeProvider } from '../ThemeProvider';
import { AdminPageLayout, IAdminPageLayoutProps } from './AdminPageLayout';

jest.mock('../ThemeProvider/tailwind.scss', () => jest.fn());
jest.mock('./AdminHeader', () => ({ AdminHeader: () => <div /> }));
jest.mock('../../common/SideBar', () => () => 'Sidebar');

beforeAll(() => {
	window.ResizeObserver = jest.fn(() => ({
		observe: jest.fn(),
		unobserve: jest.fn(),
		disconnect: jest.fn(),
	}));
});

const Component = (props: IAdminPageLayoutProps) => {
	const onExpandedStateChange = () => jest.fn();
	const layoutSettings = useMockLayoutSettings({
		withMenu: true,
		isExpanded: true,
		onExpandedStateChange,
	});

	return (
		<DevkitThemeProvider {...layoutSettings}>
			<AdminPageLayout {...props}></AdminPageLayout>
		</DevkitThemeProvider>
	);
};

describe('AdminPageLayout', () => {
	test('Should match the snapshot', () => {
		const { container } = render(<Component>Test</Component>);

		expect(container).toMatchSnapshot();
	});
});
