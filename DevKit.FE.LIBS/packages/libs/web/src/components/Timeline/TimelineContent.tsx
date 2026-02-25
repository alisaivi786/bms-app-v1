import { DirectionLeftCaretFilledIcon, DirectionRightCaretFilledIcon } from '@devkit/icons/web';
import styles from './Timeline.style';

export const TimelineContent = <TValue,>({
	position,
	option,
	renderItem,
}: {
	position: 'start' | 'end';
	option: TValue;
	renderItem: (item: TValue) => JSX.Element;
}) => {
	return (
		<div className={styles.contentContainer(position)}>
			<div className={styles.contentInnerContainer(position)}>
				<div className={styles.arrowContainer(position)}>
					{position === 'end' ? <DirectionLeftCaretFilledIcon className={styles.arrow} /> : <DirectionRightCaretFilledIcon className={styles.arrow} />}
				</div>
				{renderItem?.(option)}
			</div>
		</div>
	);
};
