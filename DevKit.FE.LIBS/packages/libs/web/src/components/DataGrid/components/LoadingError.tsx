interface Props {
	loadingErrorMessage?: string;
}

function LoadingError(props: Props) {
	const { loadingErrorMessage = 'Something Went Wrong' } = props;

	return (
		<div className="flex h-64 w-full items-center justify-center p-5 text-caption1 font-medium text-red-500">
			<div className="text-paragraph">{loadingErrorMessage}</div>
		</div>
	);
}

export default LoadingError;
