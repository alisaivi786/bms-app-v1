/**
 * Converts a request object to FormData for multipart/form-data requests
 * @param request - Request object to convert
 * @returns FormData instance ready to be sent
 */
export const convertToFormData = (request: Record<string, unknown>): FormData => {
	const formData = new FormData();

	Object.entries(request).forEach(([key, value]) => {
		if (value instanceof File || value instanceof Blob) {
			formData.append(key, value);
		} else if (value !== undefined && value !== null) {
			formData.append(key, String(value));
		}
	});

	return formData;
};

/**
 * Prepares the request body based on the content type
 * @param request - Request data
 * @param isMultipartFormData - Whether this is a multipart/form-data request
 * @returns Prepared request body
 */
export const prepareRequestBody = (
	request: Record<string, unknown> | null | undefined,
	isMultipartFormData: boolean
): BodyInit | undefined => {
	if (!request) {
		return undefined;
	}

	if (isMultipartFormData) {
		return convertToFormData(request);
	}

	// For JSON requests, stringify the body
	return JSON.stringify(request);
};
