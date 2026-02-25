import { isNil } from 'lodash';

// Normalize Arabic-Indic (U+0660–U+0669) and Eastern Arabic-Indic (U+06F0–U+06F9) digits to ASCII 0-9
export const normalizeArabicDigits = (input?: string | number | null): string => {
    if (isNil(input)) return '';

    return String(input).replace(/[\u0660-\u0669\u06F0-\u06F9]/g, (ch) => {
        const code = ch.charCodeAt(0);

        // Arabic-Indic
        if (code >= 0x0660 && code <= 0x0669) {
            return String(code - 0x0660);
        }

        // Eastern Arabic-Indic
        if (code >= 0x06F0 && code <= 0x06F9) {
            return String(code - 0x06F0);
        }

        return ch;
    });
};
