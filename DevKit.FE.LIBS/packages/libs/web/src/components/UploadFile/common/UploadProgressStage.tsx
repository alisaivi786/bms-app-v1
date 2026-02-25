import { Spinner } from '../../Spinner';

interface IUploadProgressStage {
	width: number;
	uploadProgressLabel?: string;
	uploadProgressTitle: string;
	className?: string;
	uploadLabelVariant?: 'black' | 'gray';
}

const UPLOAD_LABEL_VARIANT = {
	black: 'text-black',
	gray: 'text-gray-600',
};

const UploadProgressStage = ({
	width,
	uploadProgressLabel,
	uploadProgressTitle,
	className,
	uploadLabelVariant = 'gray',
}: IUploadProgressStage) => {
	return (
		<section className={className}>
			<div className="flex items-center gap-2 lg:gap-0">
				<div className="lg:hidden">
					<Spinner size={24} borderWidth={2} />
				</div>
				<div className="text-paragraph lg:font-medium ">
					{uploadProgressTitle}
					<span className="lg:hidden">...</span>
				</div>
			</div>

			<div className="my-2 h-2 rounded border border-gray-200 bg-gray-50 hidden lg:block">
				<div
					className="z-10 h-full rounded nj-bg-brand transition-all  ease-linear "
					style={{
						width: `${width}%`,
					}}
				></div>
			</div>
			<div className={`text-caption1 font-normal hidden lg:block ${UPLOAD_LABEL_VARIANT[uploadLabelVariant]}`}>
				{uploadProgressLabel ?? 'It may take few minutes to complete this process.'}
			</div>
		</section>
	);
};

export default UploadProgressStage;
