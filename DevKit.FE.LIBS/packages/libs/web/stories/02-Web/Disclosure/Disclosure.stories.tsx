import React, { useState } from 'react';
import { Meta, StoryFn, StoryObj } from '@storybook/react-vite';
import { Button } from '../../../src/components/Buttons';
import { Disclosures as DisclosureComponent, IDisclosureProps } from '../../../src/components/Disclosure';

type ComponentProps = IDisclosureProps & {
	toggleBehavior: 'single' | 'multiple';
};
type ComponentType = (args: ComponentProps) => JSX.Element;

const getNewItem = (itemIndex: number) => {
	return {
		header: `New Item ${itemIndex}`,
		body: (
			<>
				<div>
					Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum eleifend ac orci at euismod. Praesent eget
					diam dolor. Praesent mollis semper leo eget lobortis. Maecenas a efficitur sapien. Phasellus imperdiet
					volutpat sem id fermentum. In bibendum lacus scelerisque blandit euismod. Mauris purus dolor, suscipit in est
					condimentum, consectetur vulputate elit. Integer bibendum laoreet magna, et interdum est semper at. Quisque
					purus nulla, scelerisque non semper vitae, auctor vel elit. Vivamus risus sapien, elementum eu nisi vel,
					mollis tincidunt orci. Ut condimentum elementum dui vel gravida. Vivamus varius aliquet erat sit amet iaculis.
					Vestibulum tempus justo sapien, ut rutrum tellus tristique id.
				</div>
			</>
		),
	};
};

const Template: StoryFn<ComponentType> = (args) => {
	const [items, setItems] = useState(defaultState);
	const [openItems, setOpenItems] = useState<React.Key[]>([]);
	const onToggle = (newOpenItems: React.Key[], itemKey: React.Key) => {
		switch (args.toggleBehavior) {
			case 'single':
				// is all items expanded
				if (newOpenItems.length === items.length - 1) {
					setOpenItems([itemKey]);
				} else {
					setOpenItems(openItems.includes(itemKey) ? [] : [itemKey]);
				}
				break;
			case 'multiple':
				setOpenItems(newOpenItems);
				break;
		}
	};

	return (
		<div>
			<DisclosureComponent {...args} items={items} openItems={openItems} onToggle={onToggle} />

			<br />
			<div className="flex gap-2">
				<Button onClick={() => setOpenItems([...Array(items.length).keys()])}>Expand All</Button>
				<Button onClick={() => setOpenItems([])}>Collapse All</Button>
				<Button onClick={() => setItems(defaultState)}>Reset Filter</Button>
				<Button onClick={() => setItems(defaultState.filter((d) => d.header === 'Dental and Gum Treatment'))}>
					Filter Dental
				</Button>
				<Button
					onClick={() => {
						const newItems = [...items, getNewItem(items.length)];

						setItems(newItems);
						setOpenItems((prv) => [...prv, newItems.length - 1]);
					}}
				>
					Add New Item
				</Button>
				<Button
					onClick={() => {
						const lastItemIndex = items.length - 1;
						const newItems = [...items.slice(0, -1)];

						setItems(newItems);
						setOpenItems((prv) => prv.filter((key) => key !== lastItemIndex));
					}}
				>
					Remove Last Item
				</Button>
			</div>
		</div>
	);
};

const StoryMeta: Meta<ComponentProps> = {
	title: 'Web/Components/Disclosure',
	component: DisclosureComponent,
	argTypes: {
		toggleBehavior: {
			description: 'The toggle behavior to use (single and multiple)',
			options: ['single', 'multiple'],
			control: { type: 'radio' },
		},
	},
	args: {
		variant: 'primary',
		toggleBehavior: 'single',
	},
};

export default StoryMeta;

export const Disclosure: StoryObj<ComponentType> = {
	render: Template,
};

const defaultState = [
	{
		header: 'Maternity Cover',
		tooltipMessage: 'Please enter at least one field',
		body: (
			<>
				<div>
					Inside Abu Dhabi Combined In-patient outpatient limit up to the Annual Benefit limit of the policy. For
					Delivery inside Abu Dhabi, a Deductible of AED 500 is applicable as per HAAD.
				</div>
				<div>
					Outside Abu Dhabi Combined Inpatient & Outpatient Limit of AED 10,000 applicable. Same Out Patient Deductible
					as per the selected Plan will be applicable for Maternity Consultations and also Covered on reimbursement up
					to AED 1,600.
				</div>
				<div>
					The following screening tests covered as per DHA Antenatal care protocol: o FBC and Platelets o Blood group,
					Rhesus status and antibodies o VDRL o MSU & urinalysis o Rubella serology AED 30,000,000 o HIV o Hepatitis C
					offered to high-risk patients o GTT, if high risk o FBS, Random blood sugar OR HbA1C o Ultrasonography: 3
					scans.
				</div>
			</>
		),
	},
	{
		header: 'Dental and Gum Treatment',
		body: (
			<>
				<div>Covered subject to the following: Sub-limit: AED 3,500, Coinsurance: 20%</div>
			</>
		),
	},
	{
		header: 'Hearing and Vision Aids',
		body: (
			<>
				<div>Covered only in cases of medical emergencies.</div>
			</>
		),
	},
	{
		header: 'Out-Patient Services',
		body: (
			<>
				<div>Co-Payment: 20% co-payment upto AED 50</div>
			</>
		),
	},
];
