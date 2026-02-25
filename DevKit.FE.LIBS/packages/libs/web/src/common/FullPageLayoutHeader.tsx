import { HeaderMenu } from './HeaderMenu';
import LogoHeader from './LogoHeader';

export interface IFullPageLayoutHeader {
	variant: 'default' | 'primary' | 'full-width';
	disabled: boolean;
}

export const FullPageLayoutHeader = ({ variant, disabled }: IFullPageLayoutHeader) => {
	return (
		<header
			className={`relative z-layoutSticky flex justify-center px-4 lg:px-16 md:px-6 max-w-screen ${
				variant === 'primary' ? 'nj-bg-login-header' : 'border-b border-b-gray-200 bg-white'
			}`}
		>
			<div className="w-full">
				<div className="relative py-5 flex justify-between">
					<div className="flex flex-1  gap-4">
						<LogoHeader disabled={disabled} />
					</div>
					<HeaderMenu disabled={disabled} />
				</div>
			</div>
		</header>
	);
};
