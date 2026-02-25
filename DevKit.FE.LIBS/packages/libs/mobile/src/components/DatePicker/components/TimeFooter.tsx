import { TwLayoutClassName, formatDate, getDateUtilsConfig } from '@devkit/utilities';
import { useMobileUIConfigOptions } from '../../../layouts';
import { Button } from '../../Buttons';
import styles from '../date-picker.styles';
import { useCalendarViewContext } from './CalendarView';

export const TimeFooter = () => {
	const {
		updateViewState,
		viewState: { tzDate, currentCalendar },
	} = useCalendarViewContext();
	const { locale } = useMobileUIConfigOptions();
	const { timeFormat } = getDateUtilsConfig();
	const format = timeFormat === '12hr' ? 'hh:mm aa' : 'HH:mm';

	return (
		<Button
			layoutClassName={styles.timeContainer as TwLayoutClassName}
			onPress={() => {
				updateViewState({ viewMode: 'time' });
			}}
		>
			{formatDate(tzDate, { dateFormat: format, calendar: currentCalendar, locale })}
		</Button>
	);
};
