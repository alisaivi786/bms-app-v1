import React from 'react';
import { View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { fireEvent, render } from '@testing-library/react-native';
import { useMobileUIConfigOptions } from '../ThemeProvider';
import { FullScreenLayout } from './FullScreenLayout';

// Mock dependencies
jest.mock('react-native-safe-area-context', () => ({
	useSafeAreaInsets: jest.fn(),
}));
jest.mock('../ThemeProvider', () => ({
	useMobileUIConfigOptions: jest.fn(),
}));

const mockedUseSafeAreaInsets = useSafeAreaInsets as jest.Mock;
const mockedUseMobileUIConfigOptions = useMobileUIConfigOptions as jest.Mock;

describe('FullScreenLayout', () => {
	beforeEach(() => {
		// Reset mocks before each test
		mockedUseSafeAreaInsets.mockReturnValue({ top: 10, bottom: 20 });
		mockedUseMobileUIConfigOptions.mockReturnValue({
			tw: jest.fn((styles: string) => ({ style: styles })),
			isRtlLocale: false,
		});
	});

	afterEach(() => {
		jest.clearAllMocks();
	});

	it('renders correctly with default props (snapshot)', () => {
		const { toJSON } = render(
			<FullScreenLayout>
				<View testID="content">Sample Content</View>
			</FullScreenLayout>
		);

		expect(toJSON()).toMatchSnapshot();
	});

	it('renders header when pageTitle is provided', () => {
		const { getByTestId } = render(
			<FullScreenLayout pageTitle="Test Page">
				<View testID="content">Sample Content</View>
			</FullScreenLayout>
		);

		expect(getByTestId('header')).toBeTruthy();
		expect(getByTestId('header-title')).toBeTruthy();
	});

	it('renders header when onBackPress is provided', () => {
		const onBackPress = jest.fn();
		const { getByTestId } = render(
			<FullScreenLayout onBackPress={onBackPress}>
				<View testID="content">Sample Content</View>
			</FullScreenLayout>
		);

		expect(getByTestId('header')).toBeTruthy();
		expect(getByTestId('back-button')).toBeTruthy();
	});

	it('does not render header when neither pageTitle nor onBackPress is provided', () => {
		const { queryByTestId } = render(
			<FullScreenLayout>
				<View testID="content">Sample Content</View>
			</FullScreenLayout>
		);

		expect(queryByTestId('header')).toBeNull();
	});

	it('renders footer when footer prop is provided', () => {
		const footer = (
			<View testID="footer-content" style={{ padding: 10 }}>
				Footer Content
			</View>
		);
		const { getByTestId } = render(
			<FullScreenLayout footer={footer}>
				<View testID="content">Sample Content</View>
			</FullScreenLayout>
		);

		expect(getByTestId('footer-container')).toBeTruthy();
		expect(getByTestId('footer-content')).toBeTruthy();
	});

	it('does not render footer when footer prop is not provided', () => {
		const { queryByTestId } = render(
			<FullScreenLayout>
				<View testID="content">Sample Content</View>
			</FullScreenLayout>
		);

		expect(queryByTestId('footer-container')).toBeNull();
	});

	it('renders subHeader when provided', () => {
		const subHeader = <View testID="subheader">Subheader Content</View>;
		const { getByTestId } = render(
			<FullScreenLayout pageTitle="Test Page" subHeader={subHeader}>
				<View testID="content">Sample Content</View>
			</FullScreenLayout>
		);

		expect(getByTestId('subheader')).toBeTruthy();
	});

	it('calls onBackPress when back button is pressed and not disabled', () => {
		const onBackPress = jest.fn();
		const { getByTestId } = render(
			<FullScreenLayout onBackPress={onBackPress} isBackButtonDisabled={false}>
				<View testID="content">Sample Content</View>
			</FullScreenLayout>
		);

		fireEvent.press(getByTestId('back-button'));
		expect(onBackPress).toHaveBeenCalled();
	});

	it('does not call onBackPress when back button is disabled', () => {
		const onBackPress = jest.fn();
		const { getByTestId } = render(
			<FullScreenLayout onBackPress={onBackPress} isBackButtonDisabled={true}>
				<View testID="content">Sample Content</View>
			</FullScreenLayout>
		);

		fireEvent.press(getByTestId('back-button'));
		expect(onBackPress).not.toHaveBeenCalled();
	});

	it('applies safe area insets correctly', () => {
		const { getByTestId } = render(
			<FullScreenLayout pageTitle="Test Page" footer={<View testID="footer-content" />}>
				<View testID="content">Sample Content</View>
			</FullScreenLayout>
		);

		const rootView = getByTestId('full-screen-layout');

		expect(rootView.props.style).toContainEqual({ marginTop: 10 });

		const footerContainer = getByTestId('footer-container');

		expect(footerContainer.props.style).toContainEqual({ paddingBottom: 20 });
	});

	it('applies Tailwind styles from ThemeProvider', () => {
		const { getByTestId } = render(
			<FullScreenLayout pageTitle="Test Page">
				<View testID="content">Sample Content</View>
			</FullScreenLayout>
		);

		const rootView = getByTestId('full-screen-layout');

		expect(rootView.props.style).toEqual(
			expect.arrayContaining([
				expect.objectContaining({ style: ['flex-1 bg-gray-100'] }),
				expect.objectContaining({ marginTop: 10 }),
			])
		);
	});
});
