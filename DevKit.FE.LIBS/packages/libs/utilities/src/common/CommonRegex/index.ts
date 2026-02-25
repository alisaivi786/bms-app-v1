export const CommonRegex = {
	email:
		/^(?!.*\.\.)(?=.{2,}@)[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?\.)+[a-zA-Z]{2,}$/,
	alphaNumeric: /^[a-zA-Z0-9\sء-ي]*$/,
	alphaNumericEnglish: /^[a-zA-Z0-9\s]*$/,
	alphaNumericNoSpace: /^[a-zA-Z0-9ء-ي]*$/,
	alphaNumericEnglishNoSpace: /^[a-zA-Z0-9]*$/,
	percentageNumber: /^$|^([0-9]|([1-9][0-9])|100)$/,
	numeric: /^([0-9]*)$/,
	alphabetEnglish: /^[a-zA-Z\s]*$/,
	alphabetEnglishNoSpace: /^[a-zA-Z]*$/,
	uaeMobileNumber: /5[0-9]{8}/,
	alphaNumericArabicAndEnglish: /^[\sa-zA-Z\u0600-\u06FF,-\d]*$/,
	alphaNumericEnglishWithSpecialCharacter: /^[a-zA-Z0-9!@#$%\\^&\s*)(+=._-]*$/,
	dateTimeStringRegex: /\d{4}(-|\/)[01]\d(-|\/)[0-3]\d(T[0-2]\d:[0-5]\d:[0-5]\d(?:\.\d+)?Z?)?/,
};
