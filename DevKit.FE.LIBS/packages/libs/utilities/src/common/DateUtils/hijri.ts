export type ECalendars = 'hijri' | 'gregorian';

export const Calendars = {
	gregorian: { name: { en: 'Gregorian', ar: 'ميلادي' } },
	hijri: { name: { en: 'Hijri', ar: 'هجري' } },
};

/**
 * format options
 * 'u-ca-islamic-nu-latn','u-ca-islamic-umalqura-nu-latn','u-ca-islamic-tbla-nu-latn'
 * 'u-ca-islamic-civil-nu-latn','u-ca-islamic-rgsa-nu-latn', 'u-ca-islamicc-nu-latn';
 */
export const islamicCalendarFormat = 'u-ca-islamic-tbla-nu-latn';

const intPart = (e: number) => {
	if (e < -1e-7) {
		return Math.ceil(e - 1e-7);
	}

	return Math.floor(e + 1e-7);
};

export class HijriDate {
	day: number;
	month: number;
	year: number;
	// TODO
	// hour: number;
	// minute: number;
	// second: number;

	constructor(day: number, month: number, year: number) {
		this.day = day;
		this.month = month;
		this.year = year;
	}

	toDate = (secondMonthRoundBack?: boolean) => {
		if (this.month === 2 && this.day === 29 && secondMonthRoundBack) {
			/** if its required to go one day back to keep in Safar month,
			 * will return 28 Safar (one day back)
			 * this is a need in cases where the month is critical like
			 * getTzEachMonthOfInterval function
			 * 	or else it will be automatically converted to `${this.year}-03-01` in the next return statement
			 */
			return new Date(`${this.year}-${this.month}-28`);
		}

		return new Date(`${this.year}-${this.month}-${this.day}`);
	};
}
/**
 * Convert Gregorian date to Hijri date
 * using Tabular Islamic calendar (islamic-tbla)
 * same conversion method is used in the following converter
 * https://www.date-convert.net/
 */

export const gregorianToHijri = (gregorianDate: Date) => {
	let d = gregorianDate.getDate();
	let m = gregorianDate.getMonth() == 12 ? 1 : gregorianDate.getMonth() + 1;
	let y = gregorianDate.getFullYear();

	const delta = 1;
	let jd;

	if (y > 1582 || (y == 1582 && m > 10) || (y == 1582 && m == 10 && d > 14)) {
		jd =
			intPart((1461 * (y + 4800 + intPart((m - 14) / 12))) / 4) +
			intPart((367 * (m - 2 - 12 * intPart((m - 14) / 12))) / 12) -
			intPart((3 * intPart((y + 4900 + intPart((m - 14) / 12)) / 100)) / 4) +
			d -
			32075 +
			delta;
	} else {
		jd = 367 * y - intPart((7 * (y + 5001 + intPart((m - 9) / 7))) / 4) + intPart((275 * m) / 9) + d + 1729777 + delta;
	}

	let l;

	l = jd - 1948440 + 10632;
	const n = intPart((l - 1) / 10631);

	l = l - 10631 * n + 354;
	const j = intPart((10985 - l) / 5316) * intPart((50 * l) / 17719) + intPart(l / 5670) * intPart((43 * l) / 15238);

	l = l - intPart((30 - j) / 15) * intPart((17719 * j) / 50) - intPart(j / 16) * intPart((15238 * j) / 43) + 29;
	m = intPart((24 * l) / 709);
	d = l - intPart((709 * m) / 24);
	y = 30 * n + j - 30;

	return new HijriDate(d, m, y);
};

/**
 * Convert Hijri date to Gregorian date
 * using Tabular Islamic calendar (islamic-tbla)
 * same conversion method is used in the following converter
 * https://www.date-convert.net/
 */
export const hijriToGregorian = (d: number, m: number, y: number) => {
	const delta = 1;
	const jd = intPart((11 * y + 3) / 30) + 354 * y + 30 * m - intPart((m - 1) / 2) + d + 1948440 - 385 - delta;

	let j, l, i, k, n;

	if (jd > 2299160) {
		l = jd + 68569;
		n = intPart((4 * l) / 146097);

		l -= intPart((146097 * n + 3) / 4);
		i = intPart((4e3 * (l + 1)) / 1461001);

		l = l - intPart((1461 * i) / 4) + 31;
		j = intPart((80 * l) / 2447);

		d = l - intPart((2447 * j) / 80);
		l = intPart(j / 11);
		m = j + 2 - 12 * l;
		y = 100 * (n - 49) + i + l;
	} else {
		j = jd + 1402;
		k = intPart((j - 1) / 1461);
		l = j - 1461 * k;
		n = intPart((l - 1) / 365) - intPart(l / 1461);
		i = l - 365 * n + 30;
		j = intPart((80 * i) / 2447);
		d = i - intPart((2447 * j) / 80);
		i = intPart(j / 11);
		m = j + 2 - 12 * i;
		y = 4 * k + n + i - 4716;
	}

	return new Date(`${y}-${m}-${d}`);
};

/**
 * find the number of days in specific month of specific year, depending on 30-year cycle rules of tabular Islamic calendar
 * @param month hijri month like 1 for Muharram, 2 for Safar
 * @param year hijri year like 1445
 * @returns the number of days in the specified month of the specified year
 */
export const getHijriMonthDaysNumber = (month: number, year: number) => {
	const days = [30, 29, 30, 29, 30, 29, 30, 29, 30, 29, 30, 29];

	const r = year % 30;

	const i =
		month == 12 &&
		(r == 2 || r == 5 || r == 7 || r == 10 || r == 13 || r == 16 || r == 18 || r == 21 || r == 24 || r == 26 || r == 29)
			? 1
			: 0;

	return days[month - 1] + i;
};
