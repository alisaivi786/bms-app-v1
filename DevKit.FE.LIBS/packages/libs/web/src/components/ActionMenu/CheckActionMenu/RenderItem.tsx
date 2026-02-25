import { CheckIcon } from '@devkit/icons/web';
import styles from './styles';

interface Props {
	/** The menu item text */
	label: string;
	/** If true, the selected menu item will have a CheckIcon */
	checked: boolean;
}

const RenderItem = ({ label, checked }: Props) => {
	return (
		<div className={styles.itemContainer}>
			<CheckIcon className={styles.icon(checked)} />

			<p className={`${checked && 'font-medium'} text-paragraph`}>{label}</p>
		</div>
	);
};

export default RenderItem;
