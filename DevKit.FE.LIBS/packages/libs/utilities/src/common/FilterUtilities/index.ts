import { StringAndNumberKeys } from '../../types';
import { getTzEndOfDay, getTzStartOfDay, parseIsoDateTime } from '../DateUtils';
import { logger } from '../Debug';

export const matchStringSearch = <TDataRow>(
	searchField: keyof TDataRow | ((item: TDataRow) => string | undefined),
	searchString: string | undefined | null,
	exact?: boolean
) => {
	return (array: TDataRow[]) => {
		return array.filter((u) => {
			let fieldValue = undefined;

			if (typeof searchField === 'function') {
				fieldValue = searchField(u);
			} else fieldValue = u[searchField];

			return searchString
				? exact
					? (fieldValue as unknown as string | undefined)?.toLowerCase() === searchString?.toLowerCase()
					: (fieldValue as unknown as string | undefined)?.toLowerCase().includes(searchString?.toLowerCase())
				: true;
		});
	};
};

export const matchNumberSearch = <TDataRow>(
	searchField: keyof TDataRow | ((item: TDataRow) => number | undefined),
	searchValue: number | undefined | null
) => {
	return (array: TDataRow[]) => {
		return array.filter((u) => {
			let fieldValue = undefined;

			if (typeof searchField === 'function') {
				fieldValue = searchField(u);
			} else fieldValue = u[searchField];

			if (typeof fieldValue !== 'number' && typeof fieldValue !== 'undefined' && fieldValue !== null) {
				logger.warn('matchNumberSearch data row field value is not number or undefined and will be ignored', {
					row: u,
					searchField,
					fieldValue,
				});

				return true;
			}

			return searchValue ? fieldValue === searchValue : true;
		});
	};
};

export const matchBooleanSearch = <TDataRow>(
	searchField: keyof TDataRow | ((item: TDataRow) => boolean | undefined),
	searchValue: boolean | undefined | null
) => {
	return (array: TDataRow[]) => {
		return array.filter((u) => {
			let fieldValue = undefined;

			if (typeof searchField === 'function') {
				fieldValue = searchField(u);
			} else fieldValue = u[searchField];

			if (typeof fieldValue !== 'boolean' && typeof fieldValue !== 'undefined' && fieldValue !== null) {
				logger.warn('matchBooleanSearch data row field value is not boolean or undefined and will be ignored', {
					row: u,
					searchField,
					fieldValue,
				});

				return true;
			}

			return searchValue !== undefined ? fieldValue === searchValue : true;
		});
	};
};

export const matchDateInRange = <TDataRow>(
	searchField: keyof TDataRow | ((item: TDataRow) => Date | string | undefined),
	fromDate?: Date | string,
	toDate?: Date | string,
	exact?: boolean
) => {
	const fromDateAsDate = typeof fromDate === 'string' ? parseIsoDateTime(fromDate) : fromDate;
	const toDateAsDate = typeof toDate === 'string' ? parseIsoDateTime(toDate) : toDate;

	const fromDateValue = !exact && fromDateAsDate ? getTzStartOfDay(fromDateAsDate) : fromDateAsDate;

	const toDateValue = !exact && toDateAsDate ? getTzEndOfDay(toDateAsDate) : toDateAsDate;

	return (array: TDataRow[]) => {
		if (fromDateValue || toDateValue)
			return array.filter((u) => {
				let fieldValue = undefined;

				if (typeof searchField === 'function') {
					fieldValue = searchField(u);
				} else fieldValue = u[searchField];

				const searchValue =
					typeof fieldValue === 'string' ? parseIsoDateTime(fieldValue) : (fieldValue as unknown as Date | undefined);

				if (!(searchValue instanceof Date) && typeof searchValue !== 'undefined') {
					logger.warn('matchDateInRange data row field value is not date or undefined and will be ignored', {
						row: u,
						searchField,
						fieldValue,
					});

					return true;
				}

				if (!searchValue) return false;
				else if (fromDateValue && toDateValue) return searchValue >= fromDateValue && searchValue <= toDateValue;
				else if (fromDateValue) return searchValue >= fromDateValue;
				else if (toDateValue) return searchValue <= toDateValue;

				return true;
			});

		return array;
	};
};

export const matchNumberInRange = <TDataRow>(
	searchField: StringAndNumberKeys<TDataRow> | ((item: TDataRow) => number),
	fromNum?: number,
	toNum?: number
) => {
	return (array: TDataRow[]) => {
		return array.filter((u) => {
			let fieldValue: number | undefined = undefined;

			if (typeof searchField === 'function') {
				fieldValue = searchField(u);
			} else fieldValue = u[searchField as keyof TDataRow] as unknown as number | undefined;

			let resultIsValid = !fromNum || !toNum;

			if (fromNum && (fieldValue || fieldValue === 0)) {
				resultIsValid = fieldValue >= fromNum;
			}

			if (toNum && (fieldValue || fieldValue === 0)) {
				resultIsValid = resultIsValid && fieldValue <= toNum;
			}

			return resultIsValid;
		});
	};
};

export const matchDataInArray = <TDataRow, K>(
	searchField: keyof TDataRow | ((item: TDataRow) => K[] | undefined),
	searchValue?: K
) => {
	return (array: TDataRow[]) => {
		return array.filter((u) => {
			if (!searchValue) return true;

			let fieldValue = undefined;

			if (typeof searchField === 'function') {
				fieldValue = searchField(u);
			} else fieldValue = u[searchField];

			if (Array.isArray(fieldValue)) {
				return (fieldValue as K[]).indexOf(searchValue) !== -1;
			}

			return false;
		});
	};
};
