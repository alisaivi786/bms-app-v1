import { useWebUIConfigOptions } from '../../ThemeProvider/theme-context';

type PartnerUserAvatarProps = {
	showEmail?: boolean;
};

export const PartnerUserAvatar = ({ showEmail = true }: PartnerUserAvatarProps) => {
	const { currentUser } = useWebUIConfigOptions();

	const { displayName, avatarInitials } = currentUser ?? {};
	const displayNameInitials = displayName
		?.split(' ')
		.map((name, index) => {
			if (index < 2) return name[0].toUpperCase();
		})
		.join('');
	const displayInitials = avatarInitials ?? displayNameInitials;

	return (
		<div className="flex items-center gap-2">
			<div className="nj-bg-brand text-white w-10 h-10 p-2 text-paragraph rounded-full flex justify-center items-center">
				<span>{displayInitials}</span>
			</div>
			{showEmail && <div className="text-black max-md:hidden">{displayName}</div>}
		</div>
	);
};
