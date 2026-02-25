/* eslint-disable react/no-unescaped-entities */

/* eslint-disable @typescript-eslint/no-explicit-any */
import sortBy from 'lodash/sortBy';
import { useEffect, useRef, useState } from 'react';
import { Meta, StoryFn, StoryObj } from '@storybook/react-vite';
import tailwindConfig from '../../tailwind.config.js';

const InnerColor = ({ space, value }: { space: number; value: string }) => {
	const ref = useRef<HTMLDivElement | null>(null);
	const [width, setWidth] = useState(0);

	useEffect(() => {
		setWidth(ref.current?.clientWidth ?? 0);
	}, [ref.current?.clientWidth]);

	return (
		<div className="flex whitespace-nowrap" style={{ gap: '20px' }}>
			<div ref={ref} style={{ width: value }} className="nj-bg-brand">
				&nbsp;
			</div>
			<div className="flex" style={{ fontSize: '14px', gap: '20px' }}>
				{space}
				<div className="text-gray-700" style={{ fontSize: '12px' }}>
					{value} = {width}px
				</div>
			</div>
		</div>
	);
};

const StoryComponent: StoryFn = () => {
	const [fontSize, setFontSize] = useState<number | undefined>(16);

	return (
		<div className="inner-font flex flex-col" style={{ gap: '40px' }}>
			<p>
				Spacing system in Tailwindcss is used for padding, margin, width, height, radius, ...etc. It gives measurements
				based on the root element 'html' font size 'rem'. It is powerful way to standardize the spacing used on the
				website and also to allow the components scaling by only change the root font size. <br />
				it is used through the tailwind utility classes. For example p-5, m-6, w-10
			</p>
			<div className="flex flex-col text-gray-700" style={{ gap: '10px' }}>
				Default html font size is 16px, you can change to understand how the spacing system will be affected with the
				root font size 'rem'
				<input
					type="number"
					className="w-full border-x-gray-200"
					style={{ padding: '16px', borderWidth: '1px', borderRadius: '16px' }}
					maxLength={2}
					onChange={(e) => {
						if (e.currentTarget.value && !isNaN(Number(e.currentTarget.value))) {
							setFontSize(Number(e.currentTarget.value));
						} else {
							setFontSize(undefined);
						}
					}}
					value={`${fontSize}`}
				/>
			</div>
			<style>{`html {font-size:${fontSize ?? 16}px} .inner-font * {font-size:16px;line-height:24px}`}</style>
			<div className="flex flex-col" style={{ gap: '20px' }}>
				{sortBy(
					Object.keys(tailwindConfig.theme?.spacing ?? {})
						.map((key) => Number(key))
						.filter((key) => !isNaN(key)),
					(val) => val
				).map((space, index) => {
					return (
						<InnerColor
							key={`${index}`}
							space={Number(space)}
							value={(tailwindConfig.theme?.spacing as any)?.[space.toString()]}
						/>
					);
				})}
			</div>
		</div>
	);
};

const StoryMeta: Meta = {
	title: 'DLS/Spacing',
	component: StoryComponent,
};

export default StoryMeta;

export const Spacing: StoryObj = {};
