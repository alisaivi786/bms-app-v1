export const ThumbnailImage = ({ thumbnailPath, customCss }: { thumbnailPath: string; customCss?: string }) => {
	return <img src={thumbnailPath} className={`w-12 h-12 object-contain p-0 ${customCss}`} />;
};
