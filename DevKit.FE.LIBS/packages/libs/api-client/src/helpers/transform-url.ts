import isEmpty from 'lodash/isEmpty';
import omit from 'lodash/omit';
import { APIParametersType, NoStatusCode } from '../types';

function replaceAll(str: string, keyString: string, replaceStr: string) {
	return str.replace(new RegExp(keyString, 'g'), replaceStr);
}

export default function transformUrl(url: string, requestSpecificParameters: APIParametersType = {}) {
	let urlWithParams = url;

	if (url.includes('?'))
		throw {
			mapped: [
				{
					code: 'InvalidConfiguration',
					message:
						'query parameters are not allowed in the url, query will be appended automatically. Only query path parameters should be added as ":pathKey"',
				},
			],
			status: NoStatusCode,
		};

	const pathKeys = [];

	for (const key in requestSpecificParameters) {
		if (Object.prototype.hasOwnProperty.call(requestSpecificParameters, key)) {
			const value = Array.isArray(requestSpecificParameters[key])
				? (requestSpecificParameters[key] as []).join(',')
				: requestSpecificParameters[key].toString();

			const keyString = `:${key}`;

			if (urlWithParams.includes(keyString)) {
				if (Array.isArray(value) || typeof value === 'object') {
					throw {
						mapped: [
							{
								code: 'InvalidConfiguration',
								message: `parameter ${keyString} can't be array or object. Original value ${JSON.stringify(value)}`,
							},
						],
						status: NoStatusCode,
					};
				}
				pathKeys.push(key);
				urlWithParams = replaceAll(urlWithParams, keyString, value);
			}
		}
	}

	const queryParams = omit(requestSpecificParameters, pathKeys);

	if (!isEmpty(queryParams)) urlWithParams += `?${new URLSearchParams(queryParams).toString()}`;

	return urlWithParams;
}
