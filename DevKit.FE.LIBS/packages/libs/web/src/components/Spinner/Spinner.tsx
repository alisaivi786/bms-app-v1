import styles from './Spinner.styles';

export interface ISpinnerProps {
	/** The size of the spinner */
	size: number;
	/** The spinner border width */
	borderWidth: number;
	variant?: 'primary' | 'secondary';
	state?: 'danger' | 'success';
}

/** The spinner component is mostly used as a loading indicator which comes in multiple sizes, and width separately or inside elements such as buttons to improve the user experience whenever data is being fetched from your server. */
export const Spinner = ({ size, borderWidth, variant = 'primary', state }: ISpinnerProps) => (
	<div
		data-testid="spinner"
		style={{ width: `${size}px`, height: `${size}px`, borderWidth: `${borderWidth}px` }}
		className={styles.spinnerStyle(variant, state)}
	></div>
);
