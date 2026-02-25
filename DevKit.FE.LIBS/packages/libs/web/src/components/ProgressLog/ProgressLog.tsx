import { DevkitSimpleBar } from '../../common/devkitSimpleBar';
import { ProgressLogProps } from './types';

export const ProgressLog = ({ items, minWidth }: ProgressLogProps) => {
	return (
		<DevkitSimpleBar className="h-full w-full overflow-x-hidden">
			<div className="flex">
				{items.map((step, index) => {
					return (
						<div key={index} className="flex flex-col text-center" style={{ minWidth: minWidth ?? '200px' }}>
							<div className="flex justify-center items-center">
								<div
									className={`h-0.5 bg-black ${index === 0 ? 'invisible' : ''}`}
									style={{ backgroundColor: step.color, width: 'calc(50% - 10px)' }}
								></div>
								<div className="w-5 h-5 rounded-full bg-black" style={{ backgroundColor: step.color }}></div>
								<div
									className={`h-0.5 bg-black ${index === items.length - 1 ? 'invisible' : ''}`}
									style={{ backgroundColor: step.color, width: 'calc(50% - 10px)' }}
								></div>
							</div>
							<div className="text-paragraph font-bold mt-4 mb-2">{step.title}</div>
							<p className="text-caption1 px-4">{step.description}</p>
						</div>
					);
				})}
			</div>
		</DevkitSimpleBar>
	);
};
