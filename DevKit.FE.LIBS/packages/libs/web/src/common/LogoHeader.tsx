import { useWebUIConfigOptions } from '../layouts/ThemeProvider/theme-context';

interface ILogoHeaderProps {
	disabled?: boolean;
	showLicense?: boolean;
	logoColorMode?: 'white' | 'dark';
}

const LogoHeader = ({ disabled = false, logoColorMode = 'dark' }: ILogoHeaderProps) => {
	const { logoRender } = useWebUIConfigOptions();

	return (
		<>
			{!!logoRender &&
				logoRender({
					logoColorMode,
					isDisabled: disabled,
				})}
		</>
	);
};

export default LogoHeader;
