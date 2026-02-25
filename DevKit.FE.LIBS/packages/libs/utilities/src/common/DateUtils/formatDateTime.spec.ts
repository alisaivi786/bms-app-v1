import { setDateUtilsConfig } from '@devkit/config/dist/date';
import { formatDateTime } from '.';

const sampleStartDay = new Date('2020-04-22T02:00:00.000Z');
const sampleAfternoonTime = new Date('2025-11-03T14:30:45.000Z'); // Nov 3, 2025 - 2:30:45 PM

beforeEach(() => {
	setDateUtilsConfig({
		timezone: 'GMT',
	});
});

describe('FormatDateTime with and without second test', () => {
	test('formatDateTime without second', () => {
		const formattedDateWithoutSecond = formatDateTime(sampleStartDay);

		expect(formattedDateWithoutSecond).toBe('‎22/04/2020 02:00');
	});

	test('formatDateTime with second', () => {
		const formattedDateWithSecond = formatDateTime(sampleStartDay, { showSecondes: true });

		expect(formattedDateWithSecond).toBe('‎22/04/2020 02:00:00');
	});
});

describe('FormatDateTime 24hr format (default)', () => {
	beforeEach(() => {
		setDateUtilsConfig({
			timezone: 'GMT',
			timeFormat: '24hr',
		});
	});

	test('formatDateTime 24hr without seconds', () => {
		const formatted = formatDateTime(sampleAfternoonTime);

		expect(formatted).toBe('‎03/11/2025 14:30');
		// Should NOT contain AM/PM in 24hr format
		expect(formatted).not.toContain('AM');
		expect(formatted).not.toContain('PM');
	});

	test('formatDateTime 24hr with seconds', () => {
		const formatted = formatDateTime(sampleAfternoonTime, { showSecondes: true });

		expect(formatted).toBe('‎03/11/2025 14:30:45');
		// Should NOT contain AM/PM in 24hr format
		expect(formatted).not.toContain('AM');
		expect(formatted).not.toContain('PM');
	});

	test('formatDateTime 24hr morning time', () => {
		const formatted = formatDateTime(sampleStartDay, { showSecondes: true });

		expect(formatted).toBe('‎22/04/2020 02:00:00');
		expect(formatted).not.toContain('AM');
		expect(formatted).not.toContain('PM');
	});
});

describe('FormatDateTime 12hr format', () => {
	beforeEach(() => {
		setDateUtilsConfig({
			timezone: 'GMT',
			timeFormat: '12hr',
		});
	});

	test('formatDateTime 12hr without seconds - afternoon', () => {
		const formatted = formatDateTime(sampleAfternoonTime);

		expect(formatted).toBe('‎03/11/2025 02:30 PM');
		// Should contain PM and use 12-hour format (02, not 14)
		expect(formatted).toContain('PM');
		expect(formatted).not.toContain('14');
	});

	test('formatDateTime 12hr with seconds - afternoon', () => {
		const formatted = formatDateTime(sampleAfternoonTime, { showSecondes: true });

		expect(formatted).toBe('‎03/11/2025 02:30:45 PM');
		// Should contain PM, use 12-hour format, and show seconds
		expect(formatted).toContain('PM');
		expect(formatted).toContain(':45');
		expect(formatted).not.toContain('14');
	});

	test('formatDateTime 12hr with seconds - morning', () => {
		const formatted = formatDateTime(sampleStartDay, { showSecondes: true });

		expect(formatted).toBe('‎22/04/2020 02:00:00 AM');
		// Should contain AM and use 12-hour format
		expect(formatted).toContain('AM');
		expect(formatted).not.toContain('PM');
	});

	test('formatDateTime 12hr without seconds - morning', () => {
		const formatted = formatDateTime(sampleStartDay);

		expect(formatted).toBe('‎22/04/2020 02:00 AM');
		expect(formatted).toContain('AM');
	});

	test('formatDateTime 12hr noon', () => {
		const noon = new Date('2020-04-22T12:00:00.000Z');
		const formatted = formatDateTime(noon, { showSecondes: true });

		expect(formatted).toBe('‎22/04/2020 12:00:00 PM');
		expect(formatted).toContain('PM');
	});

	test('formatDateTime 12hr midnight', () => {
		const midnight = new Date('2020-04-22T00:00:00.000Z');
		const formatted = formatDateTime(midnight, { showSecondes: true });

		expect(formatted).toBe('‎22/04/2020 12:00:00 AM');
		expect(formatted).toContain('AM');
	});
});
