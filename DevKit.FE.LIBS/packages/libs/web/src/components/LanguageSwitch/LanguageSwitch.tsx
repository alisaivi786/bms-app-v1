import { useWebUIConfigOptions } from '../../layouts/ThemeProvider/theme-context';

export const LanguageSwitch = ({ onLanguageChanged }: { onLanguageChanged?: () => void }) => {
	const { locale, onLanguageSwitchClick } = useWebUIConfigOptions();
	const isArabic = locale === 'ar';

	return (
		<>
			{onLanguageSwitchClick && (
				<div className="flex text-paragraph px-1 gap-0.5">
					<a
						className={isArabic ? 'cursor-pointer' : 'text-gray-600 cursor-default'}
						onClick={() => {
							if (isArabic) {
								onLanguageSwitchClick('en');
								onLanguageChanged?.();
							}
						}}
					>
						EN
					</a>
					<span>/</span>
					<a
						className={isArabic ? 'text-gray-600 cursor-default' : 'cursor-pointer'}
						onClick={() => {
							if (!isArabic) {
								onLanguageSwitchClick('ar');
								onLanguageChanged?.();
							}
						}}
					>
						عربي
					</a>
				</div>
			)}
		</>
	);
};
