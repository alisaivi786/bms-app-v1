import { Calendars } from '@devkit/utilities';
import { useWebUIConfigOptions } from '../../../layouts/ThemeProvider/theme-context';
import styles from '../date-picker.styles';
import { useCalendarViewContext } from './CalendarView';

export const CalendarsView = () => {
	const {
		viewState: { currentCalendar },
		calendars,
		onCalendarChange,
	} = useCalendarViewContext();
	const { isRtlLocale } = useWebUIConfigOptions();

	return (
		<>
			<div className="flex justify-evenly flex-grow   gap-2  ">
				{calendars.map((calendar) => {
					return (
						<div
							key={calendar}
							className={currentCalendar === calendar ? styles.dayViewLink.container : undefined}
							onClick={() => {
								onCalendarChange && onCalendarChange(calendar);
							}}
						>
							<label>{Calendars[calendar].name[isRtlLocale ? 'ar' : 'en']}</label>
						</div>
					);
				})}
			</div>
		</>
	);
};
