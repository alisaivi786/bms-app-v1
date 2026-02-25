import { CommonRegex } from '../CommonRegex';
import { logger } from '../Debug';

export const parseIsoDateTime = (dateTimeString?: string) => {
	if (!dateTimeString) {
		return undefined;
	}

	if (!dateTimeString.match(CommonRegex.dateTimeStringRegex)) {
		logger.error(
			'[DateUtils][parseIsoDateTime]: dateTimeString is not match regex or does not exist parsing',
			dateTimeString
		);

		return undefined;
	}

	return new Date(dateTimeString);
};
