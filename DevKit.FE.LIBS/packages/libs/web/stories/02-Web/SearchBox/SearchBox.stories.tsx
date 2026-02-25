import { useState } from 'react';
import { Meta, StoryFn } from '@storybook/react-vite';
import ResetButton from '../../../src/components/Buttons/ResetButton';
import SubmitButton from '../../../src/components/Buttons/SubmitButton';
import { SearchBox, SearchBoxProps } from '../../../src/components/SearchBox';

type ComponentType = (args: SearchBoxProps) => JSX.Element;

const Template: StoryFn<ComponentType> = () => {
	const [state, setState] = useState<string | undefined>();

	return (
		<form
			onReset={() => {
				setState(undefined);
			}}
		>
			<div className="p-5">
				<SearchBox
					debounceTimeInMilliseconds={1000}
					onChange={(value) => {
						setState(value);
					}}
					value={state}
				/>
			</div>
			<div className="p-5">Value is : {state || ''}</div>
			<div className="p-5">
				<ResetButton>Reset</ResetButton>
			</div>
			<div className="p-5">
				<SubmitButton>Submit</SubmitButton>
			</div>
		</form>
	);
};

const StoryMeta: Meta<ComponentType> = {
	title: 'Web/Components/Search Box',
	render: Template,
	component: SearchBox,
};

export default StoryMeta;

export const Basic = {};
