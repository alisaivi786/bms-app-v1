import { SfChevronDownIcon } from '@devkit/icons/web';
import { formatDate } from '@devkit/utilities';
import styles from '../date-picker.styles';
import { useCalendarViewContext } from './CalendarView';

export const TimeViewHeader = () => {
	const {
		updateViewState,
		viewState: { tzDate, currentCalendar },
	} = useCalendarViewContext();

	return (
		<>
			<div
				className="flex w-full justify-between text-[color:var(--nj-brand)] items-center"
				onClick={() => {
					updateViewState({ viewMode: 'days' });
				}}
			>
				{formatDate(tzDate, { calendar: currentCalendar })}
				<SfChevronDownIcon className={styles.navigationIcon(false)} />
			</div>
		</>
	);
};
