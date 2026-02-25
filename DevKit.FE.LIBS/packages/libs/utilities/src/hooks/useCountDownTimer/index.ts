'use client';

import { useCallback, useEffect, useState } from 'react';
import { getDurationFromNow } from '../../common/DateUtils';
import { logger } from '../../common/Debug';

const formatNumber = (value: string) => {
	let result = value;

	while (result.length < 2) {
		result = `0${result}`;
	}

	return result;
};

const initialValue = {
	hours: '00',
	minutes: '00',
	seconds: '00',
	totalRemainingHours: 0,
	totalRemainingMinutes: 0,
	totalRemainingSeconds: 0,
	isExpired: true,
};

const calculateTimeStamp = (dueToDateTimeStamp: number) => {
	const currentTimerTimeStamp = getDurationFromNow(dueToDateTimeStamp);

	if (!currentTimerTimeStamp.isPast) {
		return {
			hours: formatNumber(currentTimerTimeStamp.hours.toFixed(0)),
			minutes: formatNumber(currentTimerTimeStamp.minutes.toFixed(0)),
			seconds: formatNumber(currentTimerTimeStamp.seconds.toFixed(0)),
			totalRemainingHours: currentTimerTimeStamp.totalHours,
			totalRemainingMinutes: currentTimerTimeStamp.totalMinutes,
			totalRemainingSeconds: currentTimerTimeStamp.totalSeconds,
			isExpired: false,
		};
	}

	return initialValue;
};

/**
 * accept dueToDate in unix timestamp or date and start count down until expire
 */
export const useCountDownTimer = ({ dueToDate }: { dueToDate: Date | number }) => {
	const dueToDateTimeStamp = typeof dueToDate === 'number' ? dueToDate : dueToDate.getTime();

	const [timeState, setTimeState] = useState(() => calculateTimeStamp(dueToDateTimeStamp));

	const calculateNewTimeStamp = useCallback(() => {
		logger.log('[useCountDownTimer][calculateNewTimeStamp]', {
			dueToDate: dueToDateTimeStamp,
		});

		setTimeState(calculateTimeStamp(dueToDateTimeStamp));
	}, [dueToDateTimeStamp]);

	useEffect(() => {
		logger.log('[useCountDownTimer][useEffect] calculateNewTimeStamp');
		calculateNewTimeStamp();
	}, [dueToDateTimeStamp]);

	useEffect(() => {
		logger.log('[useCountDownTimer][useEffect] interval', {
			isExpired: timeState.isExpired,
		});

		if (!timeState.isExpired) {
			const myInterval = setInterval(() => {
				calculateNewTimeStamp();
			}, 500);

			return () => {
				clearInterval(myInterval);
			};
		}
	}, [calculateNewTimeStamp, timeState.isExpired]);

	return timeState;
};

export default useCountDownTimer;
