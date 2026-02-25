export const usePdfDownloader = () => {
	const fetchPdf = async (fileUrl: string, fileName: string, onComplete: () => void, onError: () => void) => {
		try {
			const file = await fetch(fileUrl);
			const blob = await file.blob();
			const blobUrl = URL.createObjectURL(blob);

			if (blobUrl) {
				const link = document.createElement('a');

				link.download = fileName;
				link.href = blobUrl;
				link.click();
				onComplete();
			} else {
				onError();
			}
		} catch (err) {
			onError();
		}
	};

	return { fetchPdf };
};
