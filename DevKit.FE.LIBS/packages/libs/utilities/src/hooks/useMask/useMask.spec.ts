import useMask from './useMask';

describe('useMask', () => {
	describe('applyMask', () => {
		describe('basic functionality', () => {
			it('should apply a phone number mask correctly', () => {
				const { applyMask } = useMask({ mask: '(999) 999-9999' });
				const result = applyMask('1234567890');

				expect(result.result).toBe('(123) 456-7890');
			});

			it('should apply a credit card mask correctly', () => {
				const { applyMask } = useMask({ mask: '9999 9999 9999 9999' });
				const result = applyMask('1234567890123456');

				expect(result.result).toBe('1234 5678 9012 3456');
			});

			it('should apply a social security number mask correctly', () => {
				const { applyMask } = useMask({ mask: '999-99-9999' });
				const result = applyMask('123456789');

				expect(result.result).toBe('123-45-6789');
			});

			it('should apply a date mask correctly', () => {
				const { applyMask } = useMask({ mask: '99/99/9999' });
				const result = applyMask('12312023');

				expect(result.result).toBe('12/31/2023');
			});
		});

		describe('letter masks', () => {
			it('should apply letter-only mask correctly', () => {
				const { applyMask } = useMask({ mask: 'aaa-aaa' });
				const result = applyMask('abcdef');

				expect(result.result).toBe('abc-def');
			});

			it('should filter out numbers in letter-only mask', () => {
				const { applyMask } = useMask({ mask: 'aaa-aaa' });
				const result = applyMask('ab1cd2ef');

				expect(result.result).toBe('ab-cd');
			});

			it('should handle mixed case letters', () => {
				const { applyMask } = useMask({ mask: 'aaa-aaa' });
				const result = applyMask('AbCdEf');

				expect(result.result).toBe('AbC-dEf');
			});
		});

		describe('wildcard masks', () => {
			it('should apply wildcard mask correctly', () => {
				const { applyMask } = useMask({ mask: '***-***' });
				const result = applyMask('a1b2c3');

				expect(result.result).toBe('a1b-2c3');
				expect(result.newPosition).toBe(0);
			});

			it('should handle mixed alphanumeric with wildcard', () => {
				const { applyMask } = useMask({ mask: '** ** **' });
				const result = applyMask('A1B2C3');

				expect(result.result).toBe('A1 B2 C3');
			});
		});

		// TODO: Double check these tests
		describe('position tracking', () => {
			it('should track cursor position correctly during input', () => {
				const { applyMask } = useMask({ mask: '(999) 999-9999' });
				const result = applyMask('12345', 3);

				expect(result.result).toBe('(123) 45');
				expect(result.newPosition).toBe(3);
			});

			it('should handle position at mask separator', () => {
				const { applyMask } = useMask({ mask: '999-999-9999' });
				const result = applyMask('123456', 3);

				expect(result.result).toBe('123-456');
				expect(result.newPosition).toBe(3);
			});

			it('should handle position beyond current input length', () => {
				const { applyMask } = useMask({ mask: '999-999-9999' });
				const result = applyMask('123', 5);

				expect(result.result).toBe('123');
				expect(result.newPosition).toBeUndefined();
			});

			it('should handle position at start of input', () => {
				const { applyMask } = useMask({ mask: '(999) 999-9999' });
				const result = applyMask('1234567890', 0);

				expect(result.result).toBe('(123) 456-7890');
				expect(result.newPosition).toBe(0);
			});
		});

		describe('reverse mode', () => {
			it('should apply mask in reverse mode for currency', () => {
				const { applyMask } = useMask({ mask: '999,999.99', reverse: true });
				const result = applyMask('123456');

				expect(result.result).toBe('1,234.56');
				expect(result.newPosition).toBe(0);
			});

			it('should handle smaller numbers in reverse mode', () => {
				const { applyMask } = useMask({ mask: '999,999.99', reverse: true });
				const result = applyMask('123');

				expect(result.result).toBe('1.23');
				expect(result.newPosition).toBe(0);
			});

			it('should handle position tracking in reverse mode', () => {
				const { applyMask } = useMask({ mask: '999,999.99', reverse: true });
				const result = applyMask('12345', 3);

				expect(result.result).toBe('123.45');
				expect(result.newPosition).toBe(3);
			});
		});

		describe('edge cases', () => {
			it('should handle empty input', () => {
				const { applyMask } = useMask({ mask: '(999) 999-9999' });
				const result = applyMask('');

				expect(result.result).toBe('');
			});

			it('should handle empty mask', () => {
				const { applyMask } = useMask({ mask: '' });
				const result = applyMask('1234567890');

				expect(result.result).toBe('');
			});

			it('should handle input longer than mask', () => {
				const { applyMask } = useMask({ mask: '999' });
				const result = applyMask('1234567890');

				expect(result.result).toBe('123');
			});

			it('should handle special characters in input', () => {
				const { applyMask } = useMask({ mask: '(999) 999-9999' });
				const result = applyMask('123-456-7890');

				expect(result.result).toBe('(123) 456-7890');
			});

			it('should handle non-matching characters', () => {
				const { applyMask } = useMask({ mask: '999' });
				const result = applyMask('abc');

				expect(result.result).toBe('');
			});

			it('should filter mixed characters correctly', () => {
				const { applyMask } = useMask({ mask: '999' });
				const result = applyMask('1a2b3c');

				expect(result.result).toBe('12');
			});
		});

		describe('complex masks', () => {
			it('should handle mask with multiple separators', () => {
				const { applyMask } = useMask({ mask: 'aa-99-**-999' });
				const result = applyMask('ab12cd345');

				expect(result.result).toBe('ab-12-cd-345');
			});
		});

		describe('default parameters', () => {
			it('should work with default mask (empty string)', () => {
				const { applyMask } = useMask({});
				const result = applyMask('1234567890');

				expect(result.result).toBe('');
			});

			it('should work with default reverse (false)', () => {
				const { applyMask } = useMask({ mask: '999-999' });
				const result = applyMask('123456');

				expect(result.result).toBe('123-456');
			});
		});
	});

	describe('extractValue', () => {
		it('should extract numeric value from phone number', () => {
			const { extractValue } = useMask({ mask: '(999) 999-9999' });
			const result = extractValue('(123) 456-7890');

			expect(result).toBe('1234567890');
		});

		it('should extract value from credit card', () => {
			const { extractValue } = useMask({ mask: '9999 9999 9999 9999' });
			const result = extractValue('1234 5678 9012 3456');

			expect(result).toBe('1234567890123456');
		});

		it('should extract value from date', () => {
			const { extractValue } = useMask({ mask: '99/99/9999' });
			const result = extractValue('12/31/2023');

			expect(result).toBe('12312023');
		});

		it('should extract alphanumeric value', () => {
			const { extractValue } = useMask({ mask: 'aa-99-**' });
			const result = extractValue('ab-12-cd');

			expect(result).toBe('ab12cd');
		});

		it('should handle empty input', () => {
			const { extractValue } = useMask({ mask: '(999) 999-9999' });
			const result = extractValue('');

			expect(result).toBe('');
		});

		it('should handle input with only special characters', () => {
			const { extractValue } = useMask({ mask: '(999) 999-9999' });
			const result = extractValue('()- ');

			expect(result).toBe('');
		});

		it('should extract mixed alphanumeric from complex input', () => {
			const { extractValue } = useMask({ mask: '**-**-**' });
			const result = extractValue('A1-B2-C3!@#');

			expect(result).toBe('A1B2C3');
		});
	});

	describe('integration tests', () => {
		it('should work correctly for copy-paste scenarios', () => {
			const { applyMask } = useMask({ mask: '(999) 999-9999' });

			// Pasted formatted number
			let result = applyMask('(123) 456-7890');

			expect(result.result).toBe('(123) 456-7890');

			// Pasted unformatted number
			result = applyMask('1234567890');
			expect(result.result).toBe('(123) 456-7890');

			// Pasted partial number
			result = applyMask('123456');
			expect(result.result).toBe('(123) 456');
		});

		it('should properly handle progressive input for phone numbers', () => {
			const { applyMask, extractValue } = useMask({ mask: '(999) 999-9999' });

			// Test progressive input
			let result = applyMask('1', 1);

			expect(result.result).toBe('(1');

			result = applyMask('12', 2);
			expect(result.result).toBe('(12');

			result = applyMask('1234567890');

			expect(result.result).toBe('(123) 456-7890');

			// Extract final value
			const extractedValue = extractValue(result.result);

			expect(extractedValue).toBe('1234567890');
		});

		it('should handle reverse mode for currency formatting', () => {
			const { applyMask, extractValue } = useMask({ mask: '999,999.99', reverse: true });

			// Test currency formatting in reverse mode
			let result = applyMask('123');

			expect(result.result).toBe('1.23');

			result = applyMask('123456');

			expect(result.result).toBe('1,234.56');

			// Extract final value
			const extractedValue = extractValue(result.result);

			expect(extractedValue).toBe('123456');
		});
	});
});
