import { setDateUtilsConfig } from '@devkit/config/dist/date';
import { calculateAge } from '.';

describe('Calculate Age', () => {
	beforeEach(() => {
		jest.useFakeTimers();
		jest.setSystemTime(new Date('2024-02-07'));

		setDateUtilsConfig({
			timezone: 'Asia/Dubai',
		});
	});

	test('should return 39 years when birth date is current date -39 year and +1 day', () => {
		const birthDate = new Date('1984-02-08');
		const age = calculateAge(birthDate);

		expect(age).toBe(39);
	});

	test('should return 40 years when birth date is current date -39 year and -1 moth', () => {
		const birthDate = new Date('1984-01-07');
		const age = calculateAge(birthDate);

		expect(age).toBe(40);
	});

	test('should return 40 years when birth date is current date -39 year and -1 day', () => {
		const birthDate = new Date('1984-02-06');
		const age = calculateAge(birthDate);

		expect(age).toBe(40);
	});

	test('should return 40 years when birth date is current date -39 year', () => {
		const birthDate = new Date('1984-02-07');
		const age = calculateAge(birthDate);

		expect(age).toBe(40);
	});

	test('should return 0 years when birth date is current date -1 day', () => {
		const birthDate = new Date('2024-02-06');
		const age = calculateAge(birthDate);

		expect(age).toBe(0);
	});

	test('should return 0 years when birth date is current date -1 month', () => {
		const birthDate = new Date('2024-01-07');
		const age = calculateAge(birthDate);

		expect(age).toBe(0);
	});

	test('should return 1 years when birth date is current date -1 year', () => {
		const birthDate = new Date('2023-01-07');
		const age = calculateAge(birthDate);

		expect(age).toBe(1);
	});
});
