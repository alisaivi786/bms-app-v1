'use client';

import { LogoutV2Icon } from '@devkit/icons/web';
import { formatDate } from '@devkit/utilities';
import { useWebUIConfigOptions } from '../../ThemeProvider/theme-context';

type PartnerLogoutProps = {
	lastLoggedIn?: string | Date | null;
	onLogout?: () => void | Promise<void>;
	isOpen?: boolean;
};

export const PartnerLogout = ({ lastLoggedIn, onLogout, isOpen = true }: PartnerLogoutProps) => {
	const { locale } = useWebUIConfigOptions();

	const isArabic = locale === 'ar';

	const label = isArabic ? 'تسجيل خروج' : 'Logout';
	const lastLoginLabel = isArabic ? 'آخر تسجيل دخول :' : 'Last login :';

	if (!onLogout) {
		return null;
	}

	const formattedDate = lastLoggedIn
		? formatDate(lastLoggedIn, {
				dateFormat: 'dd-MM-yyyy hh:mm:ss a',
		  })
		: null;

	if (!isOpen) {
		return (
			<div className="mt-auto p-0 bg-transparent flex flex-col gap-0 items-center justify-center w-full">
				<button
					onClick={onLogout}
					className=" bg-white/10 hover:bg-white/10 px-3 py-2 rounded-lg text-white flex items-center justify-center cursor-pointer transition-colors w-[48px] flex-shrink-0"
				>
					<LogoutV2Icon className="h-4 w-4 shrink-0" />
				</button>
			</div>
		);
	}

	return (
		<div className="bg-white/5 flex flex-col gap-2 items-start px-4 py-5 rounded-2xl w-full">
			{formattedDate && (
				<div className="flex flex-col items-center w-full">
					<p className="text-caption1 text-white whitespace-pre w-full text-start">
						{lastLoginLabel}
						{formattedDate}
					</p>
				</div>
			)}
			<button
				onClick={onLogout}
				className="w-full min-w-[80px] nj-partner-menu-item-active hover:nj-partner-menu-item-active px-4 py-3.5 rounded-lg text-white flex items-center justify-center gap-2 text-body font-medium cursor-pointer transition-colors"
			>
				<LogoutV2Icon className="h-4 w-4" />
				<span>{label}</span>
			</button>
		</div>
	);
};
