export const enableTestId =
	typeof process !== 'undefined' && process.env?.ENVIRONMENT !== 'prod' && process.env?.ENVIRONMENT !== 'production';
