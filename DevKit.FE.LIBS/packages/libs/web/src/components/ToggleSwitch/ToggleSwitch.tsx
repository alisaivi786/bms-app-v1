import { useWebUIConfigOptions } from '../../layouts/ThemeProvider/theme-context';
import styles from './ToggleSwitch.Style';

export type SwitchSize = 'small' | 'medium' | 'large';

export interface IToggleSwitchProps {
	size?: SwitchSize;
	/** The value of the toggle whither it's true or false */
	checked: boolean;
	/**	Callback fired when the state changes. */
	onChange: (value: boolean) => void;
	/** If true, the component is disabled. */
	disabled?: boolean;
}

/** A Toggle Button can be used to select true/false for a related options. */
const ToggleSwitch = ({ size = 'small', onChange, checked, disabled = false }: IToggleSwitchProps) => {
	const { isRtlLocale } = useWebUIConfigOptions();

	return (
		<div
			role="switch"
			onClick={() => {
				!disabled && onChange(!checked);
			}}
			className={styles.switchContainer(size, checked, disabled, isRtlLocale)}
		>
			<span className="sr-only">Use setting</span>
			<span aria-hidden="true" className={styles.switchSpanContainer(checked)} />
		</div>
	);
};

export default ToggleSwitch;
