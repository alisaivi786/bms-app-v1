/* eslint-disable @typescript-eslint/no-explicit-any */
import * as devkitIcons from '@devkit/icons/web';
import { Meta, StoryObj } from '@storybook/react-vite';

const meta: Meta = {
	title: 'DLS/Icons',
};

export default meta;

const IconsComponent = () => (
	<div>
		<h1 className="p-4 font-bold">SF Icons</h1>
		<div className="flex flex-wrap">
			{Object.keys(devkitIcons)
				.filter((icon) => icon.startsWith('Sf'))
				.map((icon, index) => (
					<div
						key={index}
						style={{
							display: 'flex',
							flexDirection: 'column',
							alignItems: 'center',
							margin: '10px',
							padding: '20px',
							boxShadow: '0px 0px 40px rgba(0, 0, 0, 0.07)',
							borderRadius: '16px',
							fontSize: '32px',
							width: '175px',
						}}
					>
						<div
							className="nj-text-brand"
							style={{
								fontSize: '32px',
							}}
						>
							{(devkitIcons as any)[icon]()}
						</div>
						<div style={{ fontSize: '10px', paddingTop: '20px' }}>{icon}</div>
					</div>
				))}
		</div>
		<hr className="my-6" />
		<h1 className="p-4 font-bold">Agency Icons</h1>
		<div className="flex flex-wrap">
			{Object.keys(devkitIcons)
				.filter((icon) => icon.startsWith('Ag'))
				.map((icon, index) => (
					<div
						key={index}
						style={{
							display: 'flex',
							flexDirection: 'column',
							alignItems: 'center',
							margin: '10px',
							padding: '20px',
							boxShadow: '0px 0px 40px rgba(0, 0, 0, 0.07)',
							borderRadius: '16px',
							fontSize: '32px',
							width: '175px',
						}}
					>
						<div
							className="nj-text-brand"
							style={{
								fontSize: '32px',
							}}
						>
							{(devkitIcons as any)[icon]()}
						</div>
						<div style={{ fontSize: '10px', paddingTop: '20px' }}>{icon}</div>
					</div>
				))}
		</div>
		<hr className="my-6" />
		<h1 className="p-4 font-bold">devkit Icons</h1>
		<div className="flex flex-wrap">
			{Object.keys(devkitIcons)
				.filter((icon) => icon.startsWith('Nj'))
				.map((icon, index) => (
					<div
						key={index}
						style={{
							display: 'flex',
							flexDirection: 'column',
							alignItems: 'center',
							margin: '10px',
							padding: '20px',
							boxShadow: '0px 0px 40px rgba(0, 0, 0, 0.07)',
							borderRadius: '16px',
							fontSize: '32px',
							width: '175px',
						}}
					>
						<div
							className="nj-text-brand"
							style={{
								fontSize: '32px',
							}}
						>
							{(devkitIcons as any)[icon]()}
						</div>
						<div style={{ fontSize: '10px', paddingTop: '20px' }}>{icon}</div>
					</div>
				))}
		</div>
		<hr className="my-6" />
		<h1 className="p-4 font-bold">Other Icons</h1>
		<div className="flex flex-wrap">
			{Object.keys(devkitIcons)
				.filter((icon) => !icon.startsWith('Sf') && !icon.startsWith('Ag') && !icon.startsWith('Nj'))
				.map((icon, index) => (
					<div
						key={index}
						style={{
							display: 'flex',
							flexDirection: 'column',
							alignItems: 'center',
							margin: '10px',
							padding: '20px',
							boxShadow: '0px 0px 40px rgba(0, 0, 0, 0.07)',
							borderRadius: '16px',
							fontSize: '32px',
							width: '175px',
						}}
					>
						<div
							className="nj-text-brand"
							style={{
								fontSize: '32px',
							}}
						>
							{(devkitIcons as any)[icon]()}
						</div>
						<div style={{ fontSize: '10px', paddingTop: '20px' }}>{icon}</div>
					</div>
				))}
		</div>
	</div>
);

export const Icons: StoryObj = {
	render: IconsComponent,
};
