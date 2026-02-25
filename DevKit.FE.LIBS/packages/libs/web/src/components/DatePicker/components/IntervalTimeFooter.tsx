import { useEffect, useRef, useState } from 'react';
import { formatDate, getDateUtilsConfig, getNow, getTzEndOfDay, getTzStartOfDay } from '@devkit/utilities';
import { Popover } from '../../Popover';
import { TextLink } from '../../TextLink';
import styles from '../date-picker.styles';
import { useCalendarViewContext } from './CalendarView';
import { TimeView } from './TimeView';

export const IntervalTimeFooter = ({
	label,
	fieldKey,
}: {
	label?: string;
	fieldKey: 'intervalStartDate' | 'intervalEndDate';
}) => {
	const toTimeHistory = useRef<Date>();

	const {
		updateViewState,
		viewState: { tzDate, currentCalendar, intervalStartDate, intervalEndDate },
	} = useCalendarViewContext();

	const currentValue =
		(fieldKey === 'intervalEndDate'
			? intervalEndDate ?? toTimeHistory?.current ?? getTzEndOfDay(intervalEndDate ?? intervalStartDate ?? getNow())
			: intervalStartDate) ?? tzDate;

	useEffect(() => {
		if (intervalEndDate) toTimeHistory.current = intervalEndDate;
	}, [intervalEndDate]);

	const { timeFormat } = getDateUtilsConfig();
	const format = timeFormat === '12hr' ? 'hh:mm aa' : 'HH:mm';

	const [isOpen, setIsOpen] = useState(false);

	const handleValueChange = (val: Date) => {
		if (fieldKey == 'intervalStartDate') {
			updateViewState({ intervalStartDate: val });
		} else {
			if (!intervalStartDate) updateViewState({ intervalStartDate: getTzStartOfDay(val), intervalEndDate: val });
			else updateViewState({ intervalEndDate: val });
		}
		setIsOpen(false);
	};

	return (
		<div className={styles.viewIntervalTimeFooter}>
			<Popover
				isOpen={isOpen}
				content={
					<div className={styles.intervalTimePickerContainer}>
						<TimeView
							hideButtons
							onValueChange={handleValueChange}
							currentSelectedDate={currentValue ?? toTimeHistory}
						/>
					</div>
				}
				popoverVariant="light"
				persistOnClick
				onIsOpenChange={setIsOpen}
				className="mt-20"
			>
				<div className="flex px-4 py-2 w-full rounded-md hover:bg-gray-200">
					<TextLink
						text={`${label}
					${formatDate(currentValue ?? toTimeHistory, {
						dateFormat: format,
						calendar: currentCalendar,
					})}`}
						onClick={() => {
							setIsOpen(true);
						}}
					></TextLink>
				</div>
			</Popover>
		</div>
	);
};
