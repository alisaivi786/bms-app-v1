export interface IYesNoToggleProps {
	/**	Callback fired when the state changes */
	onChange: (val: boolean) => void;
	/**The label of the true button, if not provided it will be 'Yes' by default */
	yesLabel?: string;
	/**The label of the false button, if not provided it will be 'No' by default */
	noLabel?: string;
	/** The selected value */
	value?: boolean;
	/** The variant of the button styles */
	variant?: 'black' | 'primary';
}

const SELECT_COLOR = {
	black: 'bg-black',
	primary: 'nj-bg-brand',
};

const HOVER_COLOR = {
	black: 'hover:bg-black',
	primary: 'hover:nj-bg-brand',
};

/**A toggle with Yes/No option */

function YesNoToggle({ value, yesLabel = 'yes', noLabel = 'No', onChange, variant = 'primary' }: IYesNoToggleProps) {
	const boxColor = SELECT_COLOR[variant];
	const hoverColor = HOVER_COLOR[variant];

	return (
		<div className="flex overflow-hidden rounded border border-gray-500">
			<div
				className={`w-[50%] md:w-full cursor-pointer text-center md:self-start border-r border-r-gray-500 px-4 py-3.5 md:py-2 text-paragraph capitalize ${hoverColor}  ${
					value ? ` text-white ${boxColor}` : 'text-gray-500'
				}`}
				onClick={() => onChange(true)}
			>
				{yesLabel}
			</div>
			<div
				className={`w-[50%] md:w-full cursor-pointer text-center md:self-start px-4 py-3.5 md:py-2 text-paragraph capitalize ${hoverColor} ${
					value === false ? ` text-white ${boxColor}` : 'text-gray-500'
				} `}
				onClick={() => onChange(false)}
			>
				{noLabel}
			</div>
		</div>
	);
}

export default YesNoToggle;
