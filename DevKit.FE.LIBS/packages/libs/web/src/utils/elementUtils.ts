export const isPointCovered = (x: number, y: number, element: HTMLElement | null) => {
	if (!element) return false;

	const elements = document.elementsFromPoint(x, y);
	const topmostElement = elements[0];

	return topmostElement !== element && !element.contains(topmostElement);
};

export const isElementCenterCovered = (element: HTMLElement | null) => {
	if (!element) return false;

	const rect = element.getBoundingClientRect();
	const centerX = rect.left + rect.width / 2;
	const centerY = rect.top + rect.height / 2;

	return isPointCovered(centerX, centerY, element);
};

export const isElementEdgesCovered = (element: HTMLElement | null) => {
	if (!element) return false;

	const rect = element.getBoundingClientRect();
	const centerX = rect.left + rect.width / 2;
	const centerY = rect.top + rect.height / 2;
	const left = rect.left + 5;
	const right = rect.right - 5;
	const top = rect.top + 5;
	const bottom = rect.bottom - 5;

	return (
		isPointCovered(left, centerY, element) ||
		isPointCovered(right, centerY, element) ||
		isPointCovered(centerX, top, element) ||
		isPointCovered(centerX, bottom, element)
	);
};
