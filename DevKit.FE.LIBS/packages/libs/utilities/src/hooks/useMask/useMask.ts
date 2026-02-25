const Regex = {
	mask: /[a9*]/,
	number: /[0-9]/,
	char: /[A-Za-z]/,
	all: /[A-Za-z0-9]/,
};

interface IUseMask {
	mask?: string;
	reverse?: boolean;
}

const useMask = (props: IUseMask) => {
	const { mask: maskRaw = '', reverse = false } = props;

	const mask = reverse ? maskRaw.split('').reverse().join('') : maskRaw;

	const applyMask = (valueRaw: string, currentPosition = 0) => {
		let value = reverse ? valueRaw.split('').reverse().join('') : valueRaw;
		const isLatestPosition = currentPosition === value.length;

		// Remove special characters
		value = value.replace(/\W/g, '');

		let result = '';
		// undefined to select the end of the input
		let newPosition: number | undefined = undefined;

		for (let i = 0, maskIndex = 0; i < value.length; i++, maskIndex++) {
			/**
			 * Calculate the new cursor position
			 * the next char after the current position (ignore musk positions)
			 */
			if (maskIndex >= currentPosition && typeof newPosition === 'undefined' && !isLatestPosition) {
				newPosition = currentPosition;
			}

			const char = value.charAt(i);
			let maskChar = mask.charAt(maskIndex);

			// If no mask, Break the loop and return the result
			if (maskChar === '' || char === '') break;

			while (!Regex.mask.test(maskChar)) {
				if (maskChar === '') break;

				result += maskChar;
				maskIndex++;

				maskChar = mask.charAt(maskIndex);
			}

			// Ignore special character values
			if (!Regex.all.test(char)) continue;

			if ((maskChar === '9' && !Regex.number.test(char)) || (maskChar === 'a' && !Regex.char.test(char))) {
				continue;
			}

			result += char;
		}

		return { result: reverse ? result.split('').reverse().join('') : result, newPosition };
	};

	const extractValue = (maskedValue: string) => {
		return maskedValue.replace(/\W/g, '');
	};

	return { applyMask, extractValue };
};

export default useMask;
