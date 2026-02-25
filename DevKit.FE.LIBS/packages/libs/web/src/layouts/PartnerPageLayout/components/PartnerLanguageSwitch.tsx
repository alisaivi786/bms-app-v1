'use client';

import { useState } from 'react';
import { GlobalIcon } from '@devkit/icons/web';
import { useWebUIConfigOptions } from '../../ThemeProvider/theme-context';
import styles from './PartnerLanguageSwitch.styles';

type PartnerLanguageSwitchProps = {
	onLanguageChanged?: () => void;
};

export const PartnerLanguageSwitch = ({ onLanguageChanged }: PartnerLanguageSwitchProps) => {
	const { locale, onLanguageSwitchClick } = useWebUIConfigOptions();
	const isArabic = locale === 'ar';
	const [isLoading, setIsLoading] = useState(false);

	if (!onLanguageSwitchClick) {
		return null;
	}

	const handleClick = async () => {
		if (isLoading) return;

		try {
			setIsLoading(true);
			const newLocale = isArabic ? 'en' : 'ar';

			await onLanguageSwitchClick(newLocale);
			onLanguageChanged?.();
		} finally {
			setIsLoading(false);
		}
	};

	const languageText = isArabic ? 'العربية' : 'English';

	return (
		<button className={styles.button} onClick={handleClick} disabled={isLoading} type="button">
			<div className={styles.contentContainer}>
				<GlobalIcon className={styles.icon} />
				<span className={styles.label}>{languageText}</span>
			</div>
		</button>
	);
};
