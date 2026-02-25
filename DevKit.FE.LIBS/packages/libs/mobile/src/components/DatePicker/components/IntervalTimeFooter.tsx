import { useEffect, useRef, useState } from 'react';
import { View } from 'react-native';
import { formatDate, getDateUtilsConfig, getNow, getTzEndOfDay, getTzStartOfDay } from '@devkit/utilities';
import { useMobileUIConfigOptions } from '../../../layouts/ThemeProvider/theme-context';
import { Button } from '../../Buttons';
import { Modal } from '../../DialogModal';
// import { Popover } from '../../Popover';
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

	const { tw, locale } = useMobileUIConfigOptions();

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
		<View style={tw`${styles.viewIntervalTimeFooter}`}>
			<Modal
				isOpen={isOpen}
				onClose={() => {
					setIsOpen(false);
				}}
			>
				<View style={tw`${styles.intervalTimePickerContainer}`}>
					<TimeView hideButtons onValueChange={handleValueChange} currentSelectedDate={currentValue ?? toTimeHistory} />
				</View>
			</Modal>

			<View style={tw`w-full px-4 py-2 rounded-md`}>
				<Button
					onPress={() => {
						setIsOpen(true);
					}}
				>
					{`${label} ${formatDate(currentValue ?? toTimeHistory, {
						dateFormat: format,
						calendar: currentCalendar,
						locale,
					})}`}
				</Button>
			</View>
		</View>
	);
};
