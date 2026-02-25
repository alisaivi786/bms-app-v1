'use client';

import { useHTMLElementObserver } from '../../hooks/useHTMLElementObserver';
import { useWebUIConfigOptions } from '../ThemeProvider/theme-context';

export const MobileLayoutTabNavigation = ({ onHeightChange }: { onHeightChange: (height: number) => void }) => {
	const { contentRef } = useHTMLElementObserver<HTMLDivElement>({
		onChange: (element) => {
			onHeightChange(element.clientHeight);
		},
	});
	const { tabNavigation } = useWebUIConfigOptions();

	if (!tabNavigation || tabNavigation.length === 0) return <></>;

	return (
		<div
			ref={contentRef}
			className="fixed bottom-0 flex w-full bg-white border-t shadow-card border-t-gray-200 md:hidden"
		>
			{tabNavigation
				?.filter((item) => !item.isHidden)
				.map((item, index) => (
					<a
						href="#"
						key={`mobile-tab-navigation-${index}`}
						className={`flex-1 py-4 flex flex-col gap-2 justify-center items-center  !cursor-pointer ${
							item.isActive && !item.isDisabled ? 'nj-bg-brand text-white' : ''
						} ${item.isDisabled ? 'text-gray-500' : ''}`}
						onClick={(e) => {
							e.preventDefault();
							e.stopPropagation();

							if (!item.isDisabled) item.onClick?.();
						}}
					>
						{item.icon && <item.icon className="flex-shrink-0 w-6 h-6" />}
						{item.label ? <div className="text-center flex-1 text-caption2">{item.label}</div> : null}
					</a>
				))}
		</div>
	);
};
