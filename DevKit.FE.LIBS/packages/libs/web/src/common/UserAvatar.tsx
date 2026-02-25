import { UserIcon } from '@devkit/icons/web';
import { useWebUIConfigOptions } from '../layouts/ThemeProvider/theme-context';

const UserAvatar = ({ variant }: { variant: 'dark' | 'light' }) => {
	const { currentUser } = useWebUIConfigOptions();

	const { displayName, avatarInitials } = currentUser ?? {};

	const avatarColors = {
		dark: 'nj-bg-brand text-white',
		light: 'bg-brand-50  text-brand-800',
	};

	const nameColor = {
		dark: 'text-black',
		light: 'text-white',
	};

	return (
		<div className="flex items-center gap-2">
			<div
				color="transparent"
				className={`${avatarColors[variant]} w-6 h-6 p-3 text-paragraph rounded-full flex justify-center items-center`}
			>
				<span className="md:hidden">{avatarInitials ?? displayName?.[0]}</span>
				<span className={avatarInitials || displayName?.[0] ? 'max-md:hidden' : ''}>
					<UserIcon />
				</span>
			</div>
			<div className={`${nameColor[variant]} max-md:hidden`}>{displayName}</div>
		</div>
	);
};

export default UserAvatar;
