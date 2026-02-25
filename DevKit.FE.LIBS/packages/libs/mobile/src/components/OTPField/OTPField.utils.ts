export const transformOTPValue = (length: number, initialValue?: string) => {
	const initialValuesArray = initialValue?.split('');

	return Array.from({ length }).reduce<Record<string, string>>(
		(acc, _, index) => ({ ...acc, [index]: initialValuesArray?.[index] ?? '' }),
		{}
	);
};
