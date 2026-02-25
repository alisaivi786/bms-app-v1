import { formatDate, getDateUtilsConfig } from '@devkit/utilities';
import styles from '../date-picker.styles';
import { useCalendarViewContext } from './CalendarView';

export const TimeFooter = () => {
	const {
		updateViewState,
		viewState: { tzDate, currentCalendar },
	} = useCalendarViewContext();
	const { timeFormat } = getDateUtilsConfig();
	const format = timeFormat === '12hr' ? 'hh:mm aa' : 'HH:mm';

	return (
		<div
			className={styles.timeContainer}
			onClick={() => {
				updateViewState({ viewMode: 'time' });
			}}
		>
			{formatDate(tzDate, { dateFormat: format, calendar: currentCalendar })}
		</div>
	);
};
