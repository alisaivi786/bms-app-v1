import { useEffect, useState } from 'react';
import { Meta } from '@storybook/react-vite';
import { useResponsiveView } from '../../../src/hooks/useResponsiveView';
import { useWebUIConfigOptions } from '../../../src/layouts/ThemeProvider/theme-context';

const Component = () => {
	const res = useResponsiveView();
	const [width, setWidth] = useState(0);
	const {
		screens = {
			sm: 576,
			md: 768,
			lg: 1024,
			xl: 1200,
			'2xl': 1320,
			'3xl': 1480,
		},
	} = useWebUIConfigOptions();

	useEffect(() => {
		const checkDeviceType = () => {
			setWidth(window.innerWidth);
		};

		checkDeviceType();

		window.addEventListener('resize', checkDeviceType);

		return () => {
			window.removeEventListener('resize', checkDeviceType);
		};
	}, []);

	return (
		<div className="flex flex-col gap-8">
			<div className="bg-brand-200">{width}px</div>
			<div>
				config Levels:
				<div className="flex flex-col gap-4">
					{Object.keys(screens).map((val, index) => (
						<div key={index} className="bg-brand-200">
							{val}:{screens[val as keyof typeof screens]}
						</div>
					))}
				</div>
			</div>
			<hr />
			<div className="flex gap-3 w-full">
				<div className="flex-1">
					Values:
					<div className="flex flex-col gap-4">
						{Object.keys(res).map((val, index) => (
							<div key={index} className={res[val as keyof typeof res] ? 'bg-green-100' : 'bg-red-100'}>
								{val}:{res[val as keyof typeof res]}
							</div>
						))}
					</div>
				</div>
				<div className="flex-1">
					Tailwind:
					<div className="flex flex-col gap-4">
						<div className="bg-green-100 md:bg-red-100">sm</div>
						<div className="bg-red-100 md:bg-green-100 lg:bg-red-100">md</div>
						<div className="bg-red-100 lg:bg-green-100 xl:bg-red-100">lg</div>
						<div className="bg-red-100 xl:bg-green-100 2xl:bg-red-100">xl</div>
						<div className="bg-red-100 2xl:bg-green-100 3xl:bg-red-100">2xl</div>
						<div className="bg-red-100 3xl:bg-green-100">3xl</div>
						<div className="bg-red-100 max-sm:bg-green-100">max-sm</div>
						<div className="bg-red-100 max-md:bg-green-100">max-md</div>
						<div className="bg-red-100 max-lg:bg-green-100">max-lg</div>
						<div className="bg-red-100 max-xl:bg-green-100">max-xl</div>
						<div className="bg-red-100 max-2xl:bg-green-100">max-2xl</div>
						<div className="bg-red-100 max-3xl:bg-green-100 ">max-3xl</div>
					</div>
				</div>
			</div>
		</div>
	);
};

const StoryMeta: Meta = {
	title: 'Web/Hooks/useResponsive',
	component: Component,
};

export default StoryMeta;

export const UseResponsive = {};
