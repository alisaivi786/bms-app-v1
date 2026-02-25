export interface IProgressBarProps {
	totalBar: number;
	activePercent: number;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const ProgressBar = ({ totalBar, activePercent }: IProgressBarProps) => {
	//const { isAr } = useLocale();
	// const isAr = false;

	// const calculateWidth = () => {
	// 	return Math.floor(100 / totalBar);
	// };

	// const calculateIsActiveBar = (index: number) => {
	// 	return (
	// 		activePercent > calculateWidth() * (index - 1) &&
	// 		activePercent <= calculateWidth() * index
	// 	);
	// };

	// const calculateActivePercent = (index: number) => {
	// 	if (activePercent === calculateWidth() * (index + 1)) {
	// 		// passing full percentage
	// 		return 100;
	// 	} else if (
	// 		activePercent === Math.floor((calculateWidth() * (index + 1)) / 2 + 1)
	// 	) {
	// 		// passing half percantage
	// 		return 50;
	// 	} else if (activePercent < (calculateWidth() * (index + 1)) / 2) {
	// 		return activePercent + 30;
	// 	} else if (activePercent > (calculateWidth() * (index + 1)) / 2) {
	// 		return activePercent - 30;
	// 	}

	// 	return activePercent;
	// };

	// const getDirection = () => {
	// 	return isAr ? 'left' : 'right';
	// };

	return (
		<div className="flex h-0.5 w-full">
			{Array(totalBar)
				.fill(null)
				.map((_arr, index) => (
					<div
						key={index}
						className="flex bg-brand-500"
						// marginStart={index === 0 ? 0 : 2}
						// backgroundImage={
						// 	calculateIsActiveBar(index + 1)
						// 		? `linear-gradient(to ${getDirection()}, black, black ${calculateActivePercent(
						// 				index
						// 		  )}%, ${colors.devkit.brand.devkit20} ${calculateActivePercent(
						// 				index
						// 		  )}%, ${colors.devkit.brand.devkit20})`
						// 		: ''
						// }
						// backgroundSize="cover"
						// backgroundRepeat="no-repeat"
						// key={index}
						// flex="1"
						// borderRadius={10}
						// bgColor={
						// 	!calculateIsActiveBar(index + 1) &&
						// 	activePercent > calculateWidth() * (index + 1)
						// 		? 'black'
						// 		: colors.devkit.brand.devkit20
						// }
					/>
				))}
		</div>
	);
};

export default ProgressBar;
