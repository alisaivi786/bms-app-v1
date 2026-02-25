import { isIOS } from 'react-device-detect';

export const Anchor = ({
	children,
	...props
}: React.DetailedHTMLProps<React.AnchorHTMLAttributes<HTMLAnchorElement>, HTMLAnchorElement>) => {
	return (
		<a
			{...props}
			onMouseOver={(e) => {
				// This is a workaround for iOS devices to fix the need to double click an item to trigger onClick event
				// Known issue (https://discussions.apple.com/thread/254958075?sortBy=best)
				if (isIOS) {
					props.onClick?.(e);
				}
			}}
		>
			{children}
		</a>
	);
};
