import React from 'react';

export type ISlideItemProps = {
	title: string;
	description: string;
	img: React.ReactNode;
};

const SlideItem = ({ title, description, img }: ISlideItemProps) => {
	return (
		<div className="z-10 flex h-full w-full flex-col gap-2 bg-white p-10">
			<p className="p-2 text-title3 font-bold">{title}</p>
			<div className="flex flex-col gap-2 p-2">
				{description
					?.split('.')
					.filter((m) => !!m.trim())
					.map((item, index) => (
						<p className="text-caption1 text-gray-600" key={index}>
							{item}
						</p>
					))}
			</div>
			<div className="flex flex-row justify-end px-12">{img}</div>
		</div>
	);
};

export default SlideItem;
