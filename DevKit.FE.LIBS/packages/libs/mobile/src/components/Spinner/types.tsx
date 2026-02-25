// import styles from './Spinner.styles';

export interface ISpinnerProps {
	/**
	 * Size of the indicator.
	 * Small has a height of 20, large has a height of 36.
	 *
	 * enum('small', 'large')
	 */
	size?: number | 'small' | 'large' | undefined;
	variant?: 'primary' | 'secondary';
	state?: 'danger';
	borderWidth?: number;
}
