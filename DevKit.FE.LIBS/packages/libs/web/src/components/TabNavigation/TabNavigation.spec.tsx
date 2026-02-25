import { fireEvent, render, waitFor } from '@testing-library/react';
import { ITabNavigation, TabNavigation } from './TabNavigation';

beforeAll(() => {
	window.ResizeObserver = jest.fn(() => ({
		observe: jest.fn(),
		unobserve: jest.fn(),
		disconnect: jest.fn(),
	}));
});

const createComponent = ({
	selectedTabIndex,
	onSelectedTabIndexChanged,
	tabs,
	variant,
	noContainerBorder,
	titleContainerWidth,
}: ITabNavigation) =>
	render(
		<TabNavigation
			selectedTabIndex={selectedTabIndex}
			onSelectedTabIndexChanged={onSelectedTabIndexChanged}
			tabs={tabs}
			variant={variant}
			noContainerBorder={noContainerBorder}
			titleContainerWidth={titleContainerWidth}
		/>
	);

describe('TabNavigation', () => {
	// Tests that the component is rendered with the correct html
	it('should render component with correct html', async () => {
		// Arrange
		const selectedTabIndex = 0;
		const onSelectedTabIndexChanged = jest.fn();
		const tabs = [
			{ title: 'Tab 1', tabPanel: () => <div>Tab 1 Content</div> },
			{ title: 'Tab 2', tabPanel: () => <div>Tab 2 Content</div> },
			{ title: 'Tab 3', tabPanel: () => <div>Tab 3 Content</div> },
		];
		const variant = 'filled-dark';
		const noContainerBorder = false;
		const titleContainerWidth = '100%';

		// Act
		const screen = createComponent({
			noContainerBorder,
			selectedTabIndex,
			tabs,
			titleContainerWidth,
			variant,
			onSelectedTabIndexChanged,
		});

		// Assert
		await waitFor(() => {
			expect(screen).toMatchSnapshot();
		});
	});

	// Tests that the component is rendered with the correct props
	it('should render component with correct props', async () => {
		// Arrange
		const selectedTabIndex = 0;
		const onSelectedTabIndexChanged = jest.fn();
		const tabs = [
			{ title: 'Tab 1', tabPanel: () => <div>Tab 1 Content</div> },
			{ title: 'Tab 2', tabPanel: () => <div>Tab 2 Content</div> },
			{ title: 'Tab 3', tabPanel: () => <div>Tab 3 Content</div> },
		];
		const variant = 'filled-dark';
		const noContainerBorder = false;
		const titleContainerWidth = '100%';

		// Act
		const screen = createComponent({
			noContainerBorder,
			selectedTabIndex,
			tabs,
			titleContainerWidth,
			variant,
			onSelectedTabIndexChanged,
		});

		// Assert
		await waitFor(() => {
			expect(screen.getByText('Tab 1')).toBeInTheDocument();
			expect(screen.getByText('Tab 2')).toBeInTheDocument();
			expect(screen.getByText('Tab 3')).toBeInTheDocument();
		});
	});

	// Tests that the selected tab is changed when a tab is clicked
	it('should change selected tab when a tab is clicked', async () => {
		// Arrange
		const selectedTabIndex = 0;
		const onSelectedTabIndexChanged = jest.fn();
		const tabs = [
			{ title: 'Tab 1', tabPanel: () => <div>Tab 1 Content</div> },
			{ title: 'Tab 2', tabPanel: () => <div>Tab 2 Content</div> },
			{ title: 'Tab 3', tabPanel: () => <div>Tab 3 Content</div> },
		];
		const variant = 'filled-dark';
		const noContainerBorder = false;
		const titleContainerWidth = '100%';

		// Act
		const screen = createComponent({
			noContainerBorder,
			selectedTabIndex,
			tabs,
			titleContainerWidth,
			variant,
			onSelectedTabIndexChanged,
		});

		// Act
		fireEvent.click(screen.getByText('Tab 2'));

		// Assert
		await waitFor(() => {
			expect(onSelectedTabIndexChanged).toHaveBeenCalledWith(1);
		});
	});

	it('should render correct tab title and tab view for selected tab', async () => {
		// Arrange
		const selectedTabIndex = 1;
		const onSelectedTabIndexChanged = jest.fn();
		const tabs = [
			{ title: 'Tab 1', tabPanel: () => <div>Tab 1 Content</div> },
			{ title: 'Tab 2', tabPanel: () => <div>Tab 2 Content</div> },
			{ title: 'Tab 3', tabPanel: () => <div>Tab 3 Content</div> },
		];
		const variant = 'filled-dark';
		const noContainerBorder = false;
		const titleContainerWidth = '100%';

		// Act
		const screen = createComponent({
			noContainerBorder,
			selectedTabIndex,
			tabs,
			titleContainerWidth,
			variant,
			onSelectedTabIndexChanged,
		});

		// Assert
		await waitFor(() => {
			expect(screen.getByText('Tab 2 Content')).toBeInTheDocument();
			expect(screen.container.querySelector('button[aria-selected="true"]')).toHaveClass(
				'bg-black text-white font-bold'
			);
			expect(screen.container.querySelector('button[aria-selected="true"]')).toHaveTextContent('Tab 2');
		});
	});

	// Tests that the component is rendered with only one tab
	it('should render component with only one tab', async () => {
		// Arrange
		const selectedTabIndex = 0;
		const onSelectedTabIndexChanged = jest.fn();
		const tabs = [{ title: 'Tab 1', tabPanel: () => <div>Tab 1 Content</div> }];
		const variant = 'filled';
		const noContainerBorder = true;
		const titleContainerWidth = '100%';

		// Act
		const screen = createComponent({
			noContainerBorder,
			selectedTabIndex,
			tabs,
			titleContainerWidth,
			variant,
			onSelectedTabIndexChanged,
		});

		// Assert
		await waitFor(() => {
			expect(screen.getByText('Tab 1')).toBeInTheDocument();
		});
	});
});
