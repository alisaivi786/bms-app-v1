import React from 'react';
import { render } from '@testing-library/react-native';
import { useReactFormController } from '@devkit/utilities';
import { useMobileUIConfigOptions } from '../../layouts';
import { MultiSelectDropdown } from './MultiSelectDropdown';

// Mock dependencies
jest.mock('../../layouts', () => ({
	useMobileUIConfigOptions: jest.fn(),
}));

jest.mock('@devkit/utilities', () => ({
	useReactFormController: jest.fn(),
}));

jest.mock('../FormInputGroup', () => ({
	FormInputGroup: ({ children }: { children: React.ReactNode }) => children,
}));

jest.mock('../TextField/TextField', () => {
	// eslint-disable-next-line @typescript-eslint/no-var-requires
	const MockReact = require('react');
	// eslint-disable-next-line @typescript-eslint/no-var-requires
	const { View } = require('react-native');
	const InternalTextField = MockReact.forwardRef((_props: unknown, ref: React.Ref<unknown>) => {
		MockReact.useImperativeHandle(ref, () => ({
			blur: jest.fn(),
		}));

		return <View testID="text-field" />;
	});

	InternalTextField.displayName = 'InternalTextField';

	return { InternalTextField };
});

jest.mock('./common/MultiSelectDropdownBottomSheet', () => {
	// eslint-disable-next-line @typescript-eslint/no-var-requires
	const { View } = require('react-native');

	return {
		__esModule: true,
		default: ({ children }: { children?: React.ReactNode }) => <View testID="bottom-sheet">{children}</View>,
	};
});

const mockedUseMobileUIConfigOptions = useMobileUIConfigOptions as jest.Mock;
const mockedUseReactFormController = useReactFormController as jest.Mock;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function removeDynamicIds(node: any): any {
	if (typeof node !== 'object' || node === null) return node;

	const clone = Array.isArray(node) ? [...node] : { ...node };

	if (clone?.props?.id && typeof clone.props.id === 'string' && /^:r\d+:/.test(clone.props.id)) {
		clone.props = { ...clone.props };
		delete clone.props.id;
	}

	if (clone.children) {
		clone.children = clone.children.map(removeDynamicIds);
	}

	if (clone.props?.children) {
		if (Array.isArray(clone.props.children)) {
			clone.props.children = clone.props.children.map(removeDynamicIds);
		} else {
			clone.props.children = removeDynamicIds(clone.props.children);
		}
	}

	return clone;
}

jest.mock('react-native-gesture-handler', () => {
	// eslint-disable-next-line @typescript-eslint/no-var-requires
	const MockView = require('react-native').View;

	return {
		...jest.requireActual('react-native-gesture-handler'),
		Swipeable: MockView,
		GestureHandlerRootView: MockView,
		TouchableOpacity: MockView,
	};
});

jest.mock('@gorhom/bottom-sheet', () => {
	// eslint-disable-next-line @typescript-eslint/no-var-requires
	const MockView = require('react-native').View;
	// eslint-disable-next-line @typescript-eslint/no-var-requires
	const mockReact = require('react');
	const MockBottomSheetModal = mockReact.forwardRef(
		(_props: { children: React.ReactNode }, ref: React.Ref<{ present: () => void; close: () => void }>) => {
			MockBottomSheetModal.displayName = 'MockBottomSheetModal';
			mockReact.useImperativeHandle(ref, () => ({
				present: jest.fn(),
				close: jest.fn(),
			}));

			return <MockView>{_props.children}</MockView>;
		}
	);

	return {
		BottomSheetModalProvider: ({ children }: { children?: React.ReactNode }) => <MockView>{children}</MockView>,
		BottomSheetModal: MockBottomSheetModal,
		BottomSheetFlatList: MockView,
	};
});

describe('MultiSelectDropdown', () => {
	beforeEach(() => {
		// Reset mocks before each test
		mockedUseMobileUIConfigOptions.mockReturnValue({
			tw: jest.fn((styles: string) => ({ style: styles })),
			isRtlLocale: false,
		});
		
		mockedUseReactFormController.mockReturnValue({
			onChange: jest.fn(),
			value: undefined,
			hasErrors: false,
			formId: undefined,
			errors: [],
		});
	});

	afterEach(() => {
		jest.clearAllMocks();
	});

	it('renders correctly with default props', () => {
		const { toJSON } = render(
			<MultiSelectDropdown
				options={[
					{ id: '1', label: 'Option 1' },
					{ id: '2', label: 'Option 2' },
				]}
				labelKey="label"
				valueKey="id"
				value={[]}
				placeholder="Select items"
				onChange={jest.fn()}
			/>
		);

		expect(removeDynamicIds(toJSON())).toMatchSnapshot();
	});

	it('renders with selected values', () => {
		const { toJSON } = render(
			<MultiSelectDropdown
				options={[
					{ id: '1', label: 'Option 1' },
					{ id: '2', label: 'Option 2' },
				]}
				labelKey="label"
				valueKey="id"
				value={['1']}
				placeholder="Select items"
				onChange={jest.fn()}
			/>
		);

		expect(removeDynamicIds(toJSON())).toMatchSnapshot();
	});

	it('renders with menu variant', () => {
		const { toJSON } = render(
			<MultiSelectDropdown
				options={[
					{ id: '1', label: 'Option 1' },
					{ id: '2', label: 'Option 2' },
				]}
				labelKey="label"
				valueKey="id"
				value={[]}
				placeholder="Select items"
				onChange={jest.fn()}
				variant="menu"
			/>
		);

		expect(removeDynamicIds(toJSON())).toMatchSnapshot();
	});
});
