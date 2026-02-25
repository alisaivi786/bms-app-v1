import { createContext, useContext, useEffect, useRef, useState } from 'react';
import { View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
	ECalendars,
	TzDateState,
	getDateUtilsConfig,
	getNow,
	getTzDate,
	getTzEndOfDay,
	getTzStartOfMonth,
	getTzStartOfYear,
	getTzTimeStates,
	getTzTodayDate,
} from '@devkit/utilities';
import { useMobileUIConfigOptions } from '../../../layouts/ThemeProvider/theme-context';
import { Button } from '../../Buttons';
import styles from '../date-picker.styles';
import { CalendarsView } from './CalendarsView';
import { DaysView } from './DaysView';
import { DaysViewHeader } from './DaysViewHeader';
import { IntervalTimeFooter } from './IntervalTimeFooter';
import { MonthsView } from './MonthsView';
import { MonthsViewHeader } from './MonthsViewHeader';
import { TimeFooter } from './TimeFooter';
import { TimeView } from './TimeView';
import { TimeViewHeader } from './TimeViewHeader';
import { YearsView } from './YearsView';
import { YearsViewHeader } from './YearsViewHeader';

export type CalendarViewMode = 'days' | 'months' | 'years' | 'time';

export type CalendarViewState = {
	tzDate: Date;
	viewMode: CalendarViewMode;
	viewNavigate: number;
	currentCalendar: ECalendars;
	intervalStartDate: Date | undefined;
	intervalEndDate: Date | undefined;
	intervalEndDateHover: Date | undefined;
};

type CalendarViewProps = {
	pickerViewMode: CalendarViewMode | undefined;
	defaultMonth: Date | undefined;
	currentDate: Date | undefined;
	currentEndDate?: Date;
	onChange: (date: Date, calendar?: ECalendars, endDate?: Date) => void;
	fromDate: Date | undefined;
	toDate: Date | undefined;
	enableTimeSelection: boolean | undefined;
	onCancelSelection: () => void;
	autoSelectTime: boolean;
	calendars: ECalendars[];
	selectedCalendar?: ECalendars;
	onCalendarChange?: (value: ECalendars) => void;
	isIntervalPicker: boolean;
	maxSelectionRangeDays?: number;
	hideFooter?: boolean;
};

type CalenderContextView = {
	viewState: CalendarViewState;
	updateViewState: (viewState: Partial<CalendarViewState>) => void;
	value: Date | undefined;
	defaultViewDate: Date | undefined;
	onDateSelection: (value: Date) => void;
	onCancelSelection: () => void;
	fromDate: Date | undefined;
	toDate: Date | undefined;
	enableTimeSelection: boolean;
	calendars: ECalendars[];
	selectedCalendar?: ECalendars;
	onCalendarChange?: (value: ECalendars) => void;
	isIntervalPicker: boolean;
	maxSelectionRangeDays?: number;
};

const calendarContext = createContext<CalenderContextView>({
	viewState: {
		tzDate: getNow(),
		viewMode: 'days',
		viewNavigate: 0,
		currentCalendar: 'gregorian',
		intervalStartDate: undefined,
		intervalEndDate: undefined,
		intervalEndDateHover: undefined,
	},
	updateViewState: () => undefined,
	defaultViewDate: undefined,
	value: undefined,
	onDateSelection: () => undefined,
	onCancelSelection: () => undefined,
	fromDate: undefined,
	toDate: undefined,
	enableTimeSelection: false,
	calendars: ['gregorian'],
	isIntervalPicker: false,
	maxSelectionRangeDays: undefined,
});

export const CalendarView = ({
	pickerViewMode = 'days',
	currentDate,
	currentEndDate,
	onChange,
	defaultMonth,
	fromDate,
	toDate,
	enableTimeSelection = false,
	onCancelSelection,
	autoSelectTime,
	calendars,
	selectedCalendar,
	onCalendarChange,
	isIntervalPicker,
	maxSelectionRangeDays,
	hideFooter,
}: CalendarViewProps) => {
	const stateDate = defaultMonth ?? getTzTodayDate();
	const [viewState, setViewState] = useState<CalendarViewState>({
		intervalStartDate: currentDate,
		intervalEndDate: currentEndDate,
		intervalEndDateHover: undefined,
		tzDate: stateDate,
		viewMode: pickerViewMode,
		viewNavigate: 0,
		currentCalendar: selectedCalendar ?? (calendars && calendars.length > 0) ? calendars[0] : 'gregorian',
	});
	const fromTimeHistory = useRef<TzDateState>();
	const toTimeHistory = useRef<TzDateState>();
	const { timeFormat } = getDateUtilsConfig();
	const insets = useSafeAreaInsets();

	const { tw, isRtlLocale } = useMobileUIConfigOptions();

	const saveHistory = () => {
		if (viewState.intervalStartDate) {
			fromTimeHistory.current = getTzTimeStates(viewState.intervalStartDate);
		}

		if (viewState.intervalEndDate) {
			toTimeHistory.current = getTzTimeStates(viewState.intervalEndDate);
		}
	};

	const geRevisedTime = (dateValue: Date, timeState: TzDateState | undefined) => {
		if (!timeState) return dateValue;

		const hour =
			(timeState?.hours && timeFormat === '12hr' && timeState?.hours > 12 ? timeState.hours - 12 : timeState.hours) ??
			0;

		const minutes = timeState.minutes;

		const valueTimeState = getTzTimeStates(dateValue);

		const resultTzDate = getTzDate({
			year: valueTimeState.year,
			month: valueTimeState.month,
			day: valueTimeState.day,
			hours: hour,
			minutes: minutes,
		});

		return resultTzDate;
	};

	/**
	 * Handles the selection of dates in an interval picker.
	 *
	 * - 1st selection is the start date.
	 * - 2nd selection if greater than start date is the end date else the selections are reversed
	 * - 3rd selection resets date and performs 1st selection
	 *
	 * @param {Date} selected - The selected date.
	 */
	const handleIntervalSelection = (selected: Date) => {
		let { intervalStartDate: currentFromDate, intervalEndDate: currentToDate } = viewState;

		if (!currentFromDate) {
			currentFromDate = geRevisedTime(selected, fromTimeHistory.current);
		} else if (currentFromDate && !currentToDate) {
			if (selected >= currentFromDate) {
				currentToDate = toTimeHistory.current
					? geRevisedTime(selected, toTimeHistory.current)
					: getTzEndOfDay(selected);
			} else {
				currentToDate = toTimeHistory.current
					? geRevisedTime(currentFromDate, toTimeHistory.current)
					: getTzEndOfDay(currentFromDate);
				currentFromDate = geRevisedTime(selected, fromTimeHistory.current);
			}
		} else {
			saveHistory();
			currentFromDate = geRevisedTime(selected, getTzTimeStates(viewState.intervalStartDate ?? getNow()));
			currentToDate = undefined;
		}

		setViewState((prev) => ({ ...prev, intervalStartDate: currentFromDate, intervalEndDate: currentToDate }));

		if (hideFooter && currentFromDate) {
			onChange(currentFromDate, viewState.currentCalendar, currentToDate);
		}
	};

	const onDateSelection = (selectedDate: Date) => {
		switch (viewState.viewMode) {
			case 'time':
				onChange(selectedDate, viewState.currentCalendar);
				break;
			case 'days':
				if (!isIntervalPicker) {
					if (enableTimeSelection && !autoSelectTime) {
						setViewState((prev) => ({ ...prev, tzDate: selectedDate, viewMode: 'time' }));
					} else {
						onChange(selectedDate, viewState.currentCalendar);
					}
				} else {
					handleIntervalSelection(selectedDate);
				}
				break;
			case 'months':
				if (pickerViewMode === 'months') {
					onChange(getTzStartOfMonth(selectedDate, viewState.currentCalendar), viewState.currentCalendar);
				} else {
					setViewState((prev) => ({ ...prev, tzDate: selectedDate, viewMode: 'days' }));
				}
				break;
			case 'years':
				if (pickerViewMode === 'years') {
					onChange(getTzStartOfYear(selectedDate, viewState.currentCalendar), viewState.currentCalendar);
				} else {
					setViewState((prev) => ({ ...prev, tzDate: selectedDate, viewMode: 'months' }));
				}
				break;
		}
	};

	const updateViewState = (newPartialState: Partial<CalendarViewState>) => {
		setViewState((prev) => ({ ...prev, ...newPartialState }));
	};

	useEffect(() => {
		setViewState((prev) => {
			return {
				...prev,
				intervalStartDate: currentDate,
				currentCalendar: selectedCalendar ?? prev.currentCalendar,
			};
		});
	}, [selectedCalendar, currentDate]);

	const calendarHeaderSection = {
		years: <YearsViewHeader />,
		months: <MonthsViewHeader />,
		days: <DaysViewHeader />,
		time: pickerViewMode === 'time' ? null : <TimeViewHeader />,
	}[viewState.viewMode];

	const calendarView = {
		days: isIntervalPicker ? (
			<DaysView
				onClick={onDateSelection}
				viewState={viewState}
				value={viewState.intervalStartDate}
				secondaryValue={viewState.intervalEndDate}
				updateViewState={updateViewState}
			/>
		) : (
			<DaysView
				onClick={onDateSelection}
				viewState={viewState}
				value={viewState.intervalStartDate}
				secondaryValue={undefined}
			/>
		),
		months: <MonthsView onClick={onDateSelection} />,
		years: <YearsView onClick={onDateSelection} />,
		time: <TimeView currentSelectedDate={viewState?.tzDate} />,
	}[viewState.viewMode];

	return (
		<calendarContext.Provider
			value={{
				viewState,
				value: viewState.intervalStartDate,
				fromDate,
				toDate,
				defaultViewDate: defaultMonth,
				updateViewState: (newPartialState) => {
					setViewState((prev) => ({ ...prev, ...newPartialState }));
				},
				onDateSelection: (date) => {
					onDateSelection(date);
				},
				onCancelSelection,
				enableTimeSelection,
				calendars,
				onCalendarChange,
				isIntervalPicker,
				maxSelectionRangeDays,
			}}
		>
			<View style={tw`${styles.mainViewContainer(isIntervalPicker)} pb-[${insets.bottom}px]`}>
				{calendars.length > 1 && (
					<View style={tw`${styles.headerContainer(isRtlLocale, viewState.viewMode)}`}>
						<CalendarsView />
					</View>
				)}

				{pickerViewMode !== 'time' && (
					<View style={tw`${styles.headerContainer(isRtlLocale, viewState.viewMode)}`}>{calendarHeaderSection}</View>
				)}
				<View style={tw`${styles.viewContainer(pickerViewMode)}`}>{calendarView}</View>
				{!hideFooter && enableTimeSelection && viewState.viewMode !== 'time' && !isIntervalPicker && (
					<View style={tw`${styles.viewTimeFooter}`}>
						<TimeFooter />
					</View>
				)}

				{!hideFooter && enableTimeSelection && isIntervalPicker && viewState.viewMode !== 'time' && (
					<View style={tw`p-4`}>
						<IntervalTimeFooter label={isRtlLocale ? 'وقت البدء:' : 'Start Time:'} fieldKey="intervalStartDate" />
						<IntervalTimeFooter label={isRtlLocale ? 'وقت الإنتهاء:' : 'End Time:'} fieldKey="intervalEndDate" />
					</View>
				)}

				{!hideFooter && isIntervalPicker && (
					<View style={tw`${styles.viewTimeFooter}`}>
						<Button variant="social" onPress={onCancelSelection} size="small">
							{isRtlLocale ? 'إلغاء' : 'Cancel'}
						</Button>
						<Button
							onPress={() => {
								if (viewState.intervalStartDate)
									onChange(viewState.intervalStartDate, viewState.currentCalendar, viewState.intervalEndDate);
							}}
							// start date mandatory
							disabled={!viewState.intervalStartDate}
							size="small"
						>
							{isRtlLocale ? 'موافق' : 'Apply'}
						</Button>
					</View>
				)}
			</View>
		</calendarContext.Provider>
	);
};

export const useCalendarViewContext = () => useContext(calendarContext);
