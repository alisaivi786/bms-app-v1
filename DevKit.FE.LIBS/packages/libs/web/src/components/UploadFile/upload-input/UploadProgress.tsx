import UploadProgressStage from '../common/UploadProgressStage';

interface IUploadProgress {
	progress: number;
	uploadProgressTitle: string;
	uploadProgressLabel: string;
}
const UploadProgress = ({ progress, uploadProgressTitle, uploadProgressLabel }: IUploadProgress) => (
	<div className="flex items-center justify-center gap-x-4 md:w-96">
		<UploadProgressStage
			width={progress}
			uploadProgressTitle={uploadProgressTitle}
			uploadProgressLabel={uploadProgressLabel}
			className="w-full px-9 py-4"
			uploadLabelVariant="black"
		/>
	</div>
);

export default UploadProgress;
