'use client';
import { useResponsiveView } from '../../hooks/useResponsiveView';
import styles from './Timeline.style';
import { TimelineContent } from './TimelineContent';

export const TimelineEvent = <TValue,>({
	option,
	index,
	renderItem,
}: {
	option: TValue;
	index: number;
	renderItem: (item: TValue) => JSX.Element;
}) => {
	const { sm } = useResponsiveView();
	const start = sm ? true : index % 2 === 0;

	return (
		<div className={styles.eventContainer} key={index}>
			{start ? (
				<div className={styles.opposite(sm)}></div>
			) : (
				<TimelineContent position="start" option={option} renderItem={renderItem} />
			)}
			<div className={styles.separator}>
				<div className={styles.marker}></div>
				<div className={styles.connector}></div>
			</div>
			{start ? (
				<TimelineContent position="end" option={option} renderItem={renderItem} />
			) : (
				<div className={styles.opposite(sm)}></div>
			)}
		</div>
	);
};
