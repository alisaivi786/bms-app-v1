import { useState } from 'react';
import { Meta, StoryFn, StoryObj } from '@storybook/react-vite';
import { Button, SubmitButton } from '../../../src/components/Buttons';
import {
	CollapsibleForm as CollapsibleFormComponent,
	ICollapsibleFormProps,
} from '../../../src/components/CollapsibleForm';
import { Dropdown } from '../../../src/components/Dropdown';
import { FormContainer } from '../../../src/components/FormContainer';
import { TextField } from '../../../src/components/TextField';

type ComponentType = (args: Omit<ICollapsibleFormProps, 'renderCollapse'>) => JSX.Element;

const Template: StoryFn<ComponentType> = (args) => {
	const [isExpanded, onExpandChange] = useState(args.isExpanded);
	const data = [
		{ countryID: 1, name: 'Jone Doe' },
		{ countryID: 2, name: 'Jane Doe' },
	];

	return (
		<div className="bg-brand-50 p-5">
			<CollapsibleFormComponent
				isExpanded={isExpanded}
				onExpandChange={onExpandChange}
				renderCollapse={
					<FormContainer columnsCount={2}>
						<Dropdown options={data} valueKey="countryID" labelKey="name" isSearchable={true} label="Select" />
						<div className="flex gap-4 items-end">
							<SubmitButton>Submit</SubmitButton>
							<Button>Cancel</Button>
						</div>
					</FormContainer>
				}
				footer={<div className="w-full text-center">This is fixed footer</div>}
			>
				<FormContainer columnsCount={3}>
					<Dropdown options={data} valueKey="countryID" labelKey="name" isSearchable={true} label="Select" />
					<TextField label="Username" />
					<TextField label="Email" />
					<TextField label="Username" />
					<TextField label="Email" />
					<TextField label="Email" />
				</FormContainer>
				<div className="flex gap-4 items-end justify-center pt-6">
					<SubmitButton>Submit</SubmitButton>
					<Button>Cancel</Button>
				</div>
			</CollapsibleFormComponent>
		</div>
	);
};

const StoryMeta: Meta<ICollapsibleFormProps> = {
	title: 'Web/Components/Collapsible Form',
	component: CollapsibleFormComponent,
	argTypes: {
		minHeight: {
			defaultValue: undefined,
			type: 'number',
		},
	},
};

export default StoryMeta;

export const CollapsibleForm: StoryObj<ComponentType> = {
	render: Template,
};
