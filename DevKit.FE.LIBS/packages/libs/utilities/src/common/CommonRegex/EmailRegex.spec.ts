import { CommonRegex } from './index';

describe('Email Validation Regex', () => {
	describe('Invalid Email Cases', () => {
		const invalidEmails = [
			{ email: 'testexample.com', reason: 'Missing @ symbol' },
			{ email: 'user@', reason: 'Missing domain' },
			{ email: '@example.com', reason: 'Missing username' },
			{ email: 'user..name@example.com', reason: 'Consecutive dots in local-part' },
			{ email: 'user@-domain.com', reason: 'Hyphen at start of domain' },
			{ email: 'user@domain-.com', reason: 'Hyphen at end of domain' },
			{ email: 'user@@example.com', reason: 'Double @ symbol' },
			{ email: 'user@example', reason: 'Domain lacks top-level domain' },
			{ email: 'user@domain!name.com', reason: 'Invalid special characters in domain' },
			{ email: '.username@example.com', reason: 'Leading dot in username' },
			{ email: 'user.@example.com', reason: 'Trailing dot in username' },
			{ email: 'user @example.com', reason: 'Spaces in email' },
			{ email: 'user@例子广告', reason: 'Invalid Unicode domain' },
			{ email: 'user@domain..com', reason: 'Consecutive dots in domain' },
			{ email: 'user@-.com', reason: 'Hyphen-only domain' },
			{ email: 't@email.com', reason: 'Invalid short email' },
		];

		invalidEmails.forEach(({ email, reason }) => {
			it(`should fail for invalid email: ${email} - ${reason}`, () => {
				expect(CommonRegex.email.test(email)).toBe(false);
			});
		});
	});

	describe('Valid Email Cases', () => {
		const validEmails = [
			{ email: 'test@example.com', reason: 'Basic valid email' },
			{ email: 'first.last@example.com', reason: 'Valid local-part with dot' },
			{ email: 'user@domain-name.com', reason: 'Valid with hyphen in domain' },
			{ email: 'user-name@example.com', reason: 'Valid with hyphen in username' },
			{ email: 'user@mail.example.com', reason: 'Valid with subdomain' },
			{ email: 'user+tag@example.com', reason: 'Valid email with plus symbol' },
			{ email: 'xa@example.com', reason: 'Valid short username' },
			{ email: 'very.long.email.name@example.com', reason: 'Valid length email' },
			{ email: 'firstname.lastname+test.email@example-domain.com', reason: 'Mixed special characters' },
		];

		validEmails.forEach(({ email, reason }) => {
			it(`should pass for valid email: ${email} - ${reason}`, () => {
				expect(CommonRegex.email.test(email)).toBe(true);
			});
		});
	});
});
