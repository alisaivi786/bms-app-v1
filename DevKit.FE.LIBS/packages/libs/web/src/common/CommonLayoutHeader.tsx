import { useHTMLElementObserver } from '../hooks/useHTMLElementObserver';
import { HeaderMenu } from './HeaderMenu';
import LogoHeader from './LogoHeader';

export interface IDashboardLayoutHeaderProps {
	onHeaderHeightChange?: (height: number) => void;
	disabled: boolean;
}

export const DashboardLayoutHeader = ({ onHeaderHeightChange, disabled }: IDashboardLayoutHeaderProps) => {
	const { contentRef } = useHTMLElementObserver<HTMLDivElement>({
		onChange: (element) => {
			onHeaderHeightChange?.(element.getBoundingClientRect().height);
		},
	});
	const headerClasses = ['flex justify-end border-b border-b-gray-200 p-4 py-5 lg:px-8 md:px-6'];

	return (
		<header
			className={`relative z-layoutSticky max-md:sticky max-md:top-0 bg-white ${headerClasses.join(' ')}`}
			ref={contentRef}
		>
			<div className="flex flex-1  gap-4">
				<LogoHeader logoColorMode="dark" />
			</div>

			<HeaderMenu disabled={disabled} />
		</header>
	);
};
