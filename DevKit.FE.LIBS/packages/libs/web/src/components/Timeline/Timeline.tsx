'use client';
import { useState } from 'react';
import { DevkitSimpleBar } from '../../common/devkitSimpleBar';
import { Skeleton } from '../Skeleton';
import styles from './Timeline.style';
import { TimelineEvent } from './TimelineEvent';

export type TimelineProps<TValue> = {
	/**The timeline options */
	options: TValue[];
	/**The function to call when the user scrolls to the end of the list */
	onLoadMore?: () => Promise<void>;
	/**The function to render the timeline item */
	renderItem: (item: TValue, index: number) => JSX.Element;
};

/** Use Timeline for a vertically aligned timeline component to show a series of data. */

export const Timeline = <TValue,>({ options, onLoadMore, renderItem }: TimelineProps<TValue>) => {
	const [isLoading, setIsLoading] = useState(false);

	const handleOnLoadMore = async () => {
		if (!onLoadMore) return;

		setIsLoading(true);
		await onLoadMore();
		setIsLoading(false);
	};

	return (
		<DevkitSimpleBar onScrollEndReach={handleOnLoadMore}>
			<div className={styles.container}>
				{options.map((option, index) => (
					<TimelineEvent key={index} option={option} index={index} renderItem={() => renderItem(option, index)} />
				))}
			</div>
			{isLoading && (
				<div className={styles.skeletonContainer}>
					<div className={styles.skeletonRow}>
						<Skeleton className={styles.skeleton} />
					</div>
					<div className={styles.skeletonRow}>
						<Skeleton className={styles.skeleton} />
					</div>
				</div>
			)}
		</DevkitSimpleBar>
	);
};
