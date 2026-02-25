import { Meta, StoryFn, StoryObj } from '@storybook/react-vite';

const StoryComponent: StoryFn = () => (
	<div className="flex flex-col gap-10">
		<div className="flex flex-col gap-3">
			<div className="font-bold">Essentials</div>
			<hr />
			<h1>h1 - Hello world</h1>
			<h2>h2 - Hello world</h2>
			<h3>h3 - Hello world</h3>
			<h4>h4 - Hello world</h4>
		</div>
		<div className="flex flex-col gap-3">
			<div className="font-bold">Font Weights</div>
			<hr />
			<div className="grid grid-cols-2 gap-5">
				<div className="font-normal">
					font-normal <br />
					<div className="text-caption2">font-weight:400</div>
				</div>
				<div className="font-normal">
					As UX professionals, it is our job to advocate on behalf of the user. However, in order to do it, not only
					must we deeply understand our users, but we must also help our colleagues understand them and prioritize their
					needs.
				</div>
				<div className="font-medium">
					font-medium <br />
					<div className="text-caption2">font-weight:500</div>
				</div>
				<div className="font-medium">
					As UX professionals, it is our job to advocate on behalf of the user. However, in order to do it, not only
					must we deeply understand our users, but we must also help our colleagues understand them and prioritize their
					needs.
				</div>
				<div className="font-semibold">
					font-semibold <br />
					<div className="text-caption2">font-weight:600</div>
				</div>
				<div className="font-semibold">
					As UX professionals, it is our job to advocate on behalf of the user. However, in order to do it, not only
					must we deeply understand our users, but we must also help our colleagues understand them and prioritize their
					needs.
				</div>

				<div className="font-bold">
					font-bold <br />
					<div className="text-caption2">font-weight:700</div>
				</div>
				<div className="font-bold">
					As UX professionals, it is our job to advocate on behalf of the user. However, in order to do it, not only
					must we deeply understand our users, but we must also help our colleagues understand them and prioritize their
					needs.
				</div>
			</div>
		</div>
		<div className="flex flex-col gap-3">
			<div className="font-bold">Font Sizes</div>
			<hr />
			<div className="grid grid-cols-2 gap-5">
				<div className="grid grid-cols-2 gap-5">
					<div className="text-body">
						text-display1
						<br />
						<div className="text-caption2">size: 60px - line height: 84px</div>
					</div>
					<div className="text-display1">Hello world</div>
					<div className="text-body">
						text-display2
						<br />
						<div className="text-caption2">size: 50px - line height: 70px</div>
					</div>
					<div className="text-display2">Hello world</div>
					<div className="text-body">
						text-display3
						<br />
						<div className="text-caption2">size: 42px - line height: 58.8px</div>
					</div>
					<div className="text-display3">Hello world</div>
					<div className="text-body">
						text-h1
						<br />
						<div className="text-caption2">size: 32px - line height: 44.8px</div>
					</div>
					<div className="text-h1">Hello world</div>
					<div className="text-body">
						text-h2
						<br />
						<div className="text-caption2">size: 28px - line height: 39.2px</div>
					</div>
					<div className="text-h2">Hello world</div>
					<div className="text-body">
						text-h3
						<br />
						<div className="text-caption2">size: 24px - line height: 33.6px</div>
					</div>
					<div className="text-h3">Hello world</div>
					<div className="text-body">
						text-title
						<br />
						<div className="text-caption2">size: 18px - line height: 25.2px</div>
					</div>
					<div className="text-title">Hello world</div>
					<div className="text-body">
						text-body
						<br />
						<div className="text-caption2">size: 16px - line height: 22.4px</div>
					</div>
					<div className="text-body">Hello world</div>
					<div className="text-body">
						text-paragraph
						<br />
						<div className="text-caption2">size: 14px - line height: 19.6px</div>
					</div>
					<div className="text-paragraph">Hello world</div>
					<div className="text-body">
						text-caption1
						<br />
						<div className="text-caption2">size: 12px - line height: 16.8px</div>
					</div>
					<div className="text-caption1">Hello world</div>
					<div className="text-body">
						text-caption2
						<br />
						<div className="text-caption2">size: 10px - line height: 12px</div>
					</div>
					<div className="text-caption2">Hello world</div>
					<div className="text-body">
						text-legal
						<br />
						<div className="text-caption2">size: 8px - line height: 11.2px</div>
					</div>
					<div className="text-legal">Hello world</div>
				</div>
			</div>
		</div>
	</div>
);

const StoryMeta: Meta = {
	title: 'DLS/Typography',
	component: StoryComponent,
};

export default StoryMeta;

export const Typography: StoryObj = {};
