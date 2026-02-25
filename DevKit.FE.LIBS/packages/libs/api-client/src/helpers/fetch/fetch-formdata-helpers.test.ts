import { convertToFormData, prepareRequestBody } from './fetch-formdata-helpers';

describe('fetch-formdata-helpers', () => {
	describe('convertToFormData', () => {
		it('should convert object to FormData', () => {
			const request = {
				name: 'John Doe',
				age: 30,
				email: 'john@example.com',
			};

			const formData = convertToFormData(request);

			expect(formData.get('name')).toBe('John Doe');
			expect(formData.get('age')).toBe('30');
			expect(formData.get('email')).toBe('john@example.com');
		});

		it('should handle File objects', () => {
			const file = new File(['test content'], 'test.txt', { type: 'text/plain' });
			const request = {
				file: file,
				description: 'Test file',
			};

			const formData = convertToFormData(request);

			expect(formData.get('file')).toBe(file);
			expect(formData.get('description')).toBe('Test file');
		});

		it('should handle Blob objects', () => {
			const blob = new Blob(['test content'], { type: 'text/plain' });
			const request = {
				blob: blob,
				name: 'test-blob',
			};

			const formData = convertToFormData(request);

			expect(formData.get('blob')).toBeInstanceOf(Blob);
			expect(formData.get('name')).toBe('test-blob');
		});

		it('should skip undefined and null values', () => {
			const request = {
				name: 'John',
				undefinedValue: undefined,
				nullValue: null,
				validValue: 'test',
			};

			const formData = convertToFormData(request);

			expect(formData.get('name')).toBe('John');
			expect(formData.get('validValue')).toBe('test');
			expect(formData.get('undefinedValue')).toBeNull();
			expect(formData.get('nullValue')).toBeNull();
		});
	});

	describe('prepareRequestBody', () => {
		it('should return undefined for no request data', () => {
			const result = prepareRequestBody(undefined, false);

			expect(result).toBeUndefined();
		});

		it('should return undefined for null request data', () => {
			const result = prepareRequestBody(null, false);

			expect(result).toBeUndefined();
		});

		it('should convert to FormData when isMultipartFormData is true', () => {
			const request = { name: 'John', age: 30 };
			const result = prepareRequestBody(request, true);

			expect(result).toBeInstanceOf(FormData);
			expect((result as FormData).get('name')).toBe('John');
			expect((result as FormData).get('age')).toBe('30');
		});

		it('should return JSON string when isMultipartFormData is false', () => {
			const request = { name: 'John', age: 30 };
			const result = prepareRequestBody(request, false);

			expect(typeof result).toBe('string');
			expect(JSON.parse(result as string)).toEqual(request);
		});
	});
});
