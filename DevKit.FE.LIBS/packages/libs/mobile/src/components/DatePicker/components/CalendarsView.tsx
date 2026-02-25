import { Pressable, Text, View } from 'react-native';
import { Calendars } from '@devkit/utilities';
import { useMobileUIConfigOptions } from '../../../layouts/ThemeProvider/theme-context';
import { useCalendarViewContext } from './CalendarView';

export const CalendarsView = () => {
	const {
		viewState: { currentCalendar },
		calendars,
		onCalendarChange,
	} = useCalendarViewContext();
	const { tw, isRtlLocale } = useMobileUIConfigOptions();

	return (
		<View style={tw`w-full my-2 flex-row flex-grow gap-4 justify-evenly`}>
			{calendars.map((calendar) => {
				return (
					<Pressable
						key={calendar}
						onPress={() => {
							onCalendarChange && onCalendarChange(calendar);
						}}
					>
						<Text style={tw`${calendar !== currentCalendar ? 'text-black' : 'text-brand-600'}`}>
							{Calendars[calendar].name[isRtlLocale ? 'ar' : 'en']}
						</Text>
					</Pressable>
				);
			})}
		</View>
	);
};
