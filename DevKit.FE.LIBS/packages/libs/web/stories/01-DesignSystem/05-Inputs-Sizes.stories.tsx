import { PlusIcon, SfPlusIcon } from '@devkit/icons/web';
import { Meta, StoryFn, StoryObj } from '@storybook/react-vite';
import { Button } from '../../src/components/Buttons';
import { DatePicker } from '../../src/components/DatePicker';
import { Divider } from '../../src/components/Divider';
import { Dropdown } from '../../src/components/Dropdown';
import { TextField } from '../../src/components/TextField';

const StoryComponent: StoryFn = () => {
	return (
		<div className="inner-font flex flex-col gap-6 p-5">
			<div className="flex flex-col gap-6">
				<div className="text-bold capitalize">X Small Size</div>
				<div className="flex gap-5">
					<Button size="xSmall">Click Here</Button>
					<Button variant="secondary" size="xSmall">
						Click Here
					</Button>
					<Button variant="text" size="xSmall">
						Click Here
					</Button>
					<Button variant="iconPrimary" icon={SfPlusIcon} size="xSmall" />
					<Button variant="iconSecondary" icon={SfPlusIcon} size="xSmall" />
					<Button variant="iconText" icon={SfPlusIcon} size="xSmall" />
				</div>
				<div className="flex gap-5">
					<Button size="xSmall" isLoading={true}>
						Click Here
					</Button>
					<Button variant="secondary" isLoading size="xSmall">
						Click Here
					</Button>
					<Button variant="text" isLoading size="xSmall">
						Click Here
					</Button>
					<Button variant="iconPrimary" isLoading icon={SfPlusIcon} size="xSmall" />
					<Button variant="iconSecondary" isLoading icon={SfPlusIcon} size="xSmall" />
					<Button variant="iconText" isLoading icon={SfPlusIcon} size="xSmall" />
				</div>
				<div className="flex gap-5">
					<Button state="danger" size="xSmall">
						Click Here
					</Button>
					<Button state="danger" variant="secondary" size="xSmall">
						Click Here
					</Button>
					<Button state="danger" variant="text" size="xSmall">
						Click Here
					</Button>
					<Button state="danger" variant="iconPrimary" icon={SfPlusIcon} size="xSmall" />
					<Button state="danger" variant="iconSecondary" icon={SfPlusIcon} size="xSmall" />
					<Button state="danger" variant="iconText" icon={SfPlusIcon} size="xSmall" />
				</div>
				<div className="flex gap-5">
					<Button state="success" size="xSmall">
						Click Here
					</Button>
					<Button state="success" variant="secondary" size="xSmall">
						Click Here
					</Button>
					<Button state="success" variant="text" size="xSmall">
						Click Here
					</Button>
					<Button state="success" variant="iconPrimary" icon={SfPlusIcon} size="xSmall" />
					<Button state="success" variant="iconSecondary" icon={SfPlusIcon} size="xSmall" />
					<Button state="success" variant="iconText" icon={SfPlusIcon} size="xSmall" />
				</div>
				<div className="flex gap-5">
					<Button state="danger" size="xSmall" isLoading={true}>
						Click Here
					</Button>
					<Button state="danger" variant="secondary" isLoading size="xSmall">
						Click Here
					</Button>
					<Button state="danger" variant="text" isLoading size="xSmall">
						Click Here
					</Button>
					<Button state="danger" variant="iconPrimary" isLoading icon={SfPlusIcon} size="xSmall" />
					<Button state="danger" variant="iconSecondary" isLoading icon={SfPlusIcon} size="xSmall" />
					<Button state="danger" variant="iconText" isLoading icon={SfPlusIcon} size="xSmall" />
				</div>
				<div className="flex gap-5">
					<Button state="success" size="xSmall" isLoading={true}>
						Click Here
					</Button>
					<Button state="success" variant="secondary" isLoading size="xSmall">
						Click Here
					</Button>
					<Button state="success" variant="text" isLoading size="xSmall">
						Click Here
					</Button>
					<Button state="success" variant="iconPrimary" isLoading icon={SfPlusIcon} size="xSmall" />
					<Button state="success" variant="iconSecondary" isLoading icon={SfPlusIcon} size="xSmall" />
					<Button state="success" variant="iconText" isLoading icon={SfPlusIcon} size="xSmall" />
				</div>

				<div className="flex gap-5">
					<Button size="xSmall" variant="primary" iconStart={PlusIcon} iconEnd={PlusIcon}>
						Click
					</Button>
					<Button size="xSmall" variant="iconPrimary" icon={PlusIcon} />
				</div>
				<div className="flex gap-5">
					<Button size="xSmall" variant="primary" iconStart={PlusIcon} iconEnd={PlusIcon} disabled>
						Click
					</Button>
					<Button size="xSmall" variant="iconPrimary" icon={PlusIcon} disabled />
				</div>
				<div className="flex gap-5">
					<Button size="xSmall" variant="secondary" iconStart={PlusIcon} iconEnd={PlusIcon}>
						Click
					</Button>
					<Button size="xSmall" variant="iconSecondary" icon={PlusIcon} />
				</div>
				<div className="flex gap-5">
					<Button size="xSmall" variant="secondary" iconStart={PlusIcon} iconEnd={PlusIcon} disabled>
						Click
					</Button>
					<Button size="xSmall" variant="iconSecondary" icon={PlusIcon} disabled />
				</div>
				<div className="flex gap-5">
					<Button size="xSmall" variant="text" iconStart={PlusIcon} iconEnd={PlusIcon}>
						Click
					</Button>
					<Button size="xSmall" variant="iconText" icon={PlusIcon} />
				</div>
				<div className="flex gap-5">
					<Button size="xSmall" variant="text" iconStart={PlusIcon} iconEnd={PlusIcon} disabled>
						Click
					</Button>
					<Button size="xSmall" variant="iconText" icon={PlusIcon} disabled />
				</div>
			</div>
			<div className="flex items-center justify-center w-full h-px bg-gray-100"></div>

			{(['small', 'medium', 'large'] as const).map((size, index) => {
				return (
					<>
						<div className="flex flex-col gap-6">
							<div className="text-bold capitalize">{`${size} Size`}</div>
							<div className="flex gap-5">
								<TextField size={size} placeholder="Place holder" />
								<Button size={size}>Click Here</Button>
								<Button variant="secondary" size={size}>
									Click Here
								</Button>
								<Button variant="text" size={size}>
									Click Here
								</Button>
								<Button variant="iconPrimary" icon={SfPlusIcon} size={size} />
								<Button variant="iconSecondary" icon={SfPlusIcon} size={size} />
								<Button variant="iconText" icon={SfPlusIcon} size={size} />
							</div>
							<div className="flex gap-5">
								<TextField size={size} placeholder="Place holder" />
								<Button size={size} isLoading={true}>
									Click Here
								</Button>
								<Button variant="secondary" isLoading size={size}>
									Click Here
								</Button>
								<Button variant="text" isLoading size={size}>
									Click Here
								</Button>
								<Button variant="iconPrimary" isLoading icon={SfPlusIcon} size={size} />
								<Button variant="iconSecondary" isLoading icon={SfPlusIcon} size={size} />
								<Button variant="iconText" isLoading icon={SfPlusIcon} size={size} />
							</div>
							<div className="flex gap-5">
								<TextField size={size} placeholder="Place holder" />
								<Button state="danger" size={size}>
									Click Here
								</Button>
								<Button state="danger" variant="secondary" size={size}>
									Click Here
								</Button>
								<Button state="danger" variant="text" size={size}>
									Click Here
								</Button>
								<Button state="danger" variant="iconPrimary" icon={SfPlusIcon} size={size} />
								<Button state="danger" variant="iconSecondary" icon={SfPlusIcon} size={size} />
								<Button state="danger" variant="iconText" icon={SfPlusIcon} size={size} />
							</div>
							<div className="flex gap-5">
								<TextField size={size} placeholder="Place holder" />
								<Button state="success" size={size}>
									Click Here
								</Button>
								<Button state="success" variant="secondary" size={size}>
									Click Here
								</Button>
								<Button state="success" variant="text" size={size}>
									Click Here
								</Button>
								<Button state="success" variant="iconPrimary" icon={SfPlusIcon} size={size} />
								<Button state="success" variant="iconSecondary" icon={SfPlusIcon} size={size} />
								<Button state="success" variant="iconText" icon={SfPlusIcon} size={size} />
							</div>
							<div className="flex gap-5">
								<TextField size={size} placeholder="Place holder" />
								<Button state="danger" size={size} isLoading={true}>
									Click Here
								</Button>
								<Button state="danger" variant="secondary" isLoading size={size}>
									Click Here
								</Button>
								<Button state="danger" variant="text" isLoading size={size}>
									Click Here
								</Button>
								<Button state="danger" variant="iconPrimary" isLoading icon={SfPlusIcon} size={size} />
								<Button state="danger" variant="iconSecondary" isLoading icon={SfPlusIcon} size={size} />
								<Button state="danger" variant="iconText" isLoading icon={SfPlusIcon} size={size} />
							</div>
							<div className="flex gap-5">
								<TextField size={size} placeholder="Place holder" />
								<Button state="success" size={size} isLoading={true}>
									Click Here
								</Button>
								<Button state="success" variant="secondary" isLoading size={size}>
									Click Here
								</Button>
								<Button state="success" variant="text" isLoading size={size}>
									Click Here
								</Button>
								<Button state="success" variant="iconPrimary" isLoading icon={SfPlusIcon} size={size} />
								<Button state="success" variant="iconSecondary" isLoading icon={SfPlusIcon} size={size} />
								<Button state="success" variant="iconText" isLoading icon={SfPlusIcon} size={size} />
							</div>
							<div className="flex gap-5">
								<TextField
									suffix="Suffix."
									size={size}
									startIcon={PlusIcon}
									endIcon={PlusIcon}
									alwaysShowClearIcon
									isClearable
									hasErrors
									value="This is Value With Error"
								/>
								<Button size={size} iconStart={PlusIcon} iconEnd={PlusIcon}>
									Click
								</Button>
								<Button size={size} variant="iconPrimary" icon={PlusIcon} />
							</div>
							<div className="flex gap-5">
								<TextField
									suffix="Suffix."
									size={size}
									startIcon={PlusIcon}
									endIcon={PlusIcon}
									alwaysShowClearIcon
									isClearable
									value="This is Enabled Value"
								/>
								<Button size={size} variant="primary" iconStart={PlusIcon} iconEnd={PlusIcon}>
									Click
								</Button>
								<Button size={size} variant="iconPrimary" icon={PlusIcon} />
							</div>
							<div className="flex gap-5">
								<TextField
									suffix="Suffix."
									size={size}
									startIcon={PlusIcon}
									endIcon={PlusIcon}
									alwaysShowClearIcon
									isClearable
									disabled
									value="This is Value With Disabled"
								/>
								<Button size={size} variant="primary" iconStart={PlusIcon} iconEnd={PlusIcon} disabled>
									Click
								</Button>
								<Button size={size} variant="iconPrimary" icon={PlusIcon} disabled />
							</div>
							<div className="flex gap-5">
								<DatePicker placeholder="Select Date" size={size} />
								<Button size={size} variant="secondary" iconStart={PlusIcon} iconEnd={PlusIcon}>
									Click
								</Button>
								<Button size={size} variant="iconSecondary" icon={PlusIcon} />
							</div>
							<div className="flex gap-5">
								<DatePicker placeholder="Select Date" size={size} disabled value={new Date()} valueType="date" />
								<Button size={size} variant="secondary" iconStart={PlusIcon} iconEnd={PlusIcon} disabled>
									Click
								</Button>
								<Button size={size} variant="iconSecondary" icon={PlusIcon} disabled />
							</div>
							<div className="flex gap-5">
								<Dropdown
									placeholder="Select Item"
									size={size}
									options={[{ val: 'Val1' }, { val: 'Val2' }]}
									valueKey="val"
									value="Val1"
								/>
								<Button size={size} variant="text" iconStart={PlusIcon} iconEnd={PlusIcon}>
									Click
								</Button>
								<Button size={size} variant="iconText" icon={PlusIcon} />
							</div>
							<div className="flex gap-5">
								<Dropdown
									placeholder="Select Item"
									size={size}
									options={[{ val: 'Val1' }, { val: 'Val2' }]}
									valueKey="val"
									value="Val1"
									disabled
								/>
								<Button size={size} variant="text" iconStart={PlusIcon} iconEnd={PlusIcon} disabled>
									Click
								</Button>
								<Button size={size} variant="iconText" icon={PlusIcon} disabled />
							</div>
							<div className="flex gap-5">
								<TextField type="text-area" placeholder="Text Area Placeholder" size={size} />
							</div>
						</div>
						{index !== 2 && <Divider />}
					</>
				);
			})}
		</div>
	);
};

const StoryMeta: Meta = {
	title: 'DLS/Inputs Sizes',
	component: StoryComponent,
};

export default StoryMeta;

export const InputsSizes: StoryObj = {};
