import { fireEvent, render, screen } from '@testing-library/react';
import { Checkbox } from '.';
import { ICheckbox } from './Checkbox';

const createComponent = (props: ICheckbox<never>) => render(<Checkbox {...props}></Checkbox>);

describe('Checkbox Component', () => {
	test('Should render UnChecked Checkbox Component', () => {
		const onChangeStub = jest.fn();
		const { container } = createComponent({
			isChecked: false,
			onChange: onChangeStub,
			label: 'Checkbox test component',
		});

		expect(container).toMatchSnapshot();

		const labelOne = screen.getByTestId('label-1');

		expect(labelOne).toBeInTheDocument();

		const labelTwo = screen.getByTestId('label-2');
		const labelTwoClassName = labelTwo.className.includes('cursor-pointer text-caption1');

		expect(labelTwoClassName).toBeTruthy();

		const checkbox = screen.getByTestId('checkbox');

		fireEvent.click(checkbox);
		expect(onChangeStub).toHaveBeenCalledTimes(1);
	});

	test('Should render Checked Checkbox Component', () => {
		const onChangeStub = jest.fn();
		const { container } = createComponent({
			isChecked: true,
			onChange: onChangeStub,
			label: 'Checkbox test component',
		});

		expect(container).toMatchSnapshot();

		const labelOne = screen.getByTestId('label-1');

		expect(labelOne).toBeInTheDocument();

		const labelTwo = screen.getByTestId('label-2');
		const labelTwoClassName = labelTwo.className.includes('cursor-pointer text-caption1');

		expect(labelTwoClassName).toBeTruthy();

		const checkIcon = screen.getByTestId('checked-icon');

		expect(checkIcon).toBeInTheDocument();

		const checkbox = screen.getByTestId('checkbox');

		fireEvent.click(checkbox);
		expect(onChangeStub).toHaveBeenCalledTimes(1);
	});

	test('Should render unchecked disabled Checkbox Component', () => {
		const onChangeStub = jest.fn();
		const { container } = createComponent({
			isChecked: false,
			onChange: onChangeStub,
			disabled: true,
			label: 'Checkbox test component',
		});

		expect(container).toMatchSnapshot();

		const labelOne = screen.getByTestId('label-1');

		expect(labelOne).toBeInTheDocument();

		const labelTwo = screen.getByTestId('label-2');
		const labelTwoClassName = labelTwo.className.includes('opacity-30 pointer-events-none text-caption1');

		expect(labelTwoClassName).toBeTruthy();

		const checkbox = screen.getByTestId('checkbox');

		fireEvent.click(checkbox);
		expect(onChangeStub).toHaveBeenCalledTimes(0);
	});
});
