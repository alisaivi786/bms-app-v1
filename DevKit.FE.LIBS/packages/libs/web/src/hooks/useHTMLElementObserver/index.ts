import { useEffect, useRef } from 'react';

/**
 * React Hook used to observer HTML element layout
 * @param onChange callback to run when the element is changed
 * @returns
 */
export const useHTMLElementObserver = <THtmlElement extends HTMLElement>({
	onChange,
}: {
	onChange: (element: THtmlElement) => void;
}) => {
	const contentRef = useRef<THtmlElement>(null);
	const resizingDelayTimer = useRef<NodeJS.Timeout>();

	useEffect(() => {
		let resizedObserver: ResizeObserver | undefined;

		if (contentRef.current) {
			resizedObserver = new ResizeObserver(() => {
				clearTimeout(resizingDelayTimer?.current);

				resizingDelayTimer.current = setTimeout(() => {
					if (contentRef.current) onChange(contentRef.current);
				});
			});

			resizedObserver?.observe(contentRef.current);
		}

		return () => {
			if (resizedObserver && contentRef.current) {
				resizedObserver?.unobserve(contentRef.current);
				resizedObserver?.disconnect();
			}
		};
	}, [contentRef.current]);

	return {
		contentRef,
	};
};
