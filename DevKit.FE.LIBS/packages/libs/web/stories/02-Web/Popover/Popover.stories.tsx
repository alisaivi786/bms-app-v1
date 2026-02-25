import { useState } from 'react';
import { Send2Icon } from '@devkit/icons/web';
import { Meta, StoryFn } from '@storybook/react-vite';
import Button from '../../../src/components/Buttons/Button';
import { IPopoverProps, Popover as PopoverComponent } from '../../../src/components/Popover';
import { TabNavigation } from '../../../src/components/TabNavigation';
import { TextField } from '../../../src/components/TextField/TextField';

type ComponentType = (args: IPopoverProps) => JSX.Element;

const Template: StoryFn<ComponentType> = (args) => {
	const [isOpened, setIsOpened] = useState<boolean | undefined>(false);
	const [selectedTab, setSelectedTab] = useState(0);

	return (
		<div className="flex h-full w-full items-center justify-center">
			<PopoverComponent
				{...args}
				isOpen={!!isOpened}
				onIsOpenChange={(value?: boolean) => {
					setIsOpened(value);
				}}
				content={
					<div className="flex flex-col justify-between p-6">
						<p className="mb-4 w-full border-b border-solid border-gray-200 pb-4 text-start text-title3 font-bold text-black">
							Share Quote List
						</p>
						<TabNavigation
							onSelectedTabIndexChanged={setSelectedTab}
							noContainerBorder
							tabs={[
								{
									title: 'Email',
									tabPanel: () => (
										<div className="w-full">
											<div className="pb-8">
												<TextField placeholder="Enter email address" label="Email" />
											</div>
											<div className="flex w-full justify-between border-t border-solid border-gray-200 pt-4 text-title3">
												<Button
													layoutClassName="w-32"
													onClick={() => {
														setIsOpened(false);
													}}
													variant="secondary"
												>
													Cancel
												</Button>
												<Button
													layoutClassName="w-32"
													onClick={() => {
														setIsOpened(false);
													}}
												>
													Send
												</Button>
											</div>
										</div>
									),
								},
								{
									title: 'SMS',
									tabPanel: () => (
										<div className="w-full">
											<div className="pb-8">
												<TextField placeholder="mobile number" label="Mobile" suffix="971" />
											</div>
											<div className="flex w-full justify-between border-t border-solid border-gray-200 pt-4 text-title3">
												<Button
													layoutClassName="w-32"
													onClick={() => {
														setIsOpened(false);
													}}
													variant="secondary"
												>
													Cancel
												</Button>
												<Button
													layoutClassName="w-32"
													onClick={() => {
														setIsOpened(false);
													}}
												>
													Send
												</Button>
											</div>
										</div>
									),
								},
							]}
							selectedTabIndex={selectedTab}
							variant="filled"
						></TabNavigation>
					</div>
				}
			>
				<Send2Icon />
			</PopoverComponent>
		</div>
	);
};

const StoryMeta: Meta<ComponentType> = {
	title: 'Web/Components/Popover',
	component: PopoverComponent,
	render: Template,
	parameters: {},
};

export default StoryMeta;

export const Popover = {
	args: {
		popoverVariant: 'light',
	},
};
