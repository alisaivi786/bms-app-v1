import { ChatIcon, NotificationIcon } from '@devkit/icons/web';
import { LanguageSwitch } from '../components/LanguageSwitch/LanguageSwitch';
import { useWebUIConfigOptions } from '../layouts/ThemeProvider/theme-context';
import HeaderUserMenu from './HeaderUserMenu';
import { MarketSwitcherToggleButton } from './MarketSwitcher';
import { useMarketSwitcher } from './MarketSwitcherContext';

interface IHeaderMenuProps {
	disabled: boolean;
}

export const HeaderMenu = ({ disabled }: IHeaderMenuProps) => {
	const { headerOptions, onLanguageSwitchClick } = useWebUIConfigOptions();
	const { marketSwitcher } = useMarketSwitcher();

	const { onChatIconClick, onNotificationIconClick, headerMenuRender } = headerOptions ?? {};

	return (
		<div className="flex items-center gap-4">
			{!!headerMenuRender &&
				headerMenuRender({
					isDisabled: disabled,
				})}
			{!marketSwitcher && onLanguageSwitchClick && (
				<div className="hidden md:block">
					<LanguageSwitch />
				</div>
			)}

			{marketSwitcher && (
				<div className="hidden md:block">
					<MarketSwitcherToggleButton />
				</div>
			)}

			{onNotificationIconClick && (
				<NotificationIcon
					className="h-6 w-6 py-0.5 cursor-pointer"
					onClick={() => {
						if (!disabled) {
							onNotificationIconClick();
						}
					}}
				/>
			)}
			{onChatIconClick && (
				<ChatIcon
					className="h-6 w-6 py-0.5 cursor-pointer"
					onClick={() => {
						if (!disabled) {
							onChatIconClick();
						}
					}}
				/>
			)}
			<HeaderUserMenu />
		</div>
	);
};
