import { Pressable, Text } from 'react-native';
import { SfChevronDownIcon } from '@devkit/icons/native';
import { formatDate } from '@devkit/utilities';
import { useMobileUIConfigOptions } from '../../../layouts/ThemeProvider/theme-context';
import styles from '../date-picker.styles';
import { useCalendarViewContext } from './CalendarView';

export const TimeViewHeader = () => {
	const {
		updateViewState,
		viewState: { tzDate, currentCalendar },
	} = useCalendarViewContext();

	const { tw, locale } = useMobileUIConfigOptions();

	return (
		<Pressable
			onPress={() => {
				updateViewState({ viewMode: 'days' });
			}}
			style={tw`${styles.timeViewHeaderContainer}`}
		>
			<Text style={tw`text-brand-600`}>{formatDate(tzDate, { calendar: currentCalendar, locale })}</Text>
			<SfChevronDownIcon style={tw`text-brand-600`} width={16} height={16} />
		</Pressable>
	);
};
