require('@testing-library/jest-dom/extend-expect');

// Prevent Canvas from being loaded by JSDOM
if (typeof window !== 'undefined') {
	delete window.HTMLCanvasElement;
}

// Mock canvas module completely before any imports
jest.mock('canvas', () => ({
	createCanvas: jest.fn(() => ({
		getContext: jest.fn(() => ({
			fillRect: jest.fn(),
			clearRect: jest.fn(),
			getImageData: jest.fn(() => ({ data: new Array(4).fill(0) })),
			putImageData: jest.fn(),
			createImageData: jest.fn(() => []),
			setTransform: jest.fn(),
			drawImage: jest.fn(),
			save: jest.fn(),
			fillText: jest.fn(),
			restore: jest.fn(),
			beginPath: jest.fn(),
			moveTo: jest.fn(),
			lineTo: jest.fn(),
			closePath: jest.fn(),
			stroke: jest.fn(),
			translate: jest.fn(),
			scale: jest.fn(),
			rotate: jest.fn(),
			arc: jest.fn(),
			fill: jest.fn(),
			measureText: jest.fn(() => ({ width: 0 })),
			transform: jest.fn(),
			rect: jest.fn(),
			clip: jest.fn(),
		})),
		width: 150,
		height: 150,
		toDataURL: jest.fn(
			() =>
				'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg=='
		),
	})),
	loadImage: jest.fn(() => Promise.resolve()),
	registerFont: jest.fn(),
	createImageData: jest.fn(() => []),
	Image: jest.fn().mockImplementation(() => ({
		src: '',
		width: 0,
		height: 0,
	})),
}));

// Mock HTMLCanvasElement
global.HTMLCanvasElement =
	global.HTMLCanvasElement ||
	class HTMLCanvasElement {
		constructor() {
			this.width = 150;
			this.height = 150;
		}

		getContext() {
			return {
				fillRect: jest.fn(),
				clearRect: jest.fn(),
				getImageData: jest.fn(() => ({ data: new Array(4).fill(0) })),
				putImageData: jest.fn(),
				createImageData: jest.fn(() => []),
				setTransform: jest.fn(),
				drawImage: jest.fn(),
				save: jest.fn(),
				fillText: jest.fn(),
				restore: jest.fn(),
				beginPath: jest.fn(),
				moveTo: jest.fn(),
				lineTo: jest.fn(),
				closePath: jest.fn(),
				stroke: jest.fn(),
				translate: jest.fn(),
				scale: jest.fn(),
				rotate: jest.fn(),
				arc: jest.fn(),
				fill: jest.fn(),
				measureText: jest.fn(() => ({ width: 0 })),
				transform: jest.fn(),
				rect: jest.fn(),
				clip: jest.fn(),
			};
		}

		toDataURL() {
			return 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==';
		}
	};

HTMLCanvasElement.prototype.getContext = jest.fn(() => ({
	fillRect: jest.fn(),
	clearRect: jest.fn(),
	getImageData: jest.fn(() => ({ data: new Array(4).fill(0) })),
	putImageData: jest.fn(),
	createImageData: jest.fn(() => []),
	setTransform: jest.fn(),
	drawImage: jest.fn(),
	save: jest.fn(),
	fillText: jest.fn(),
	restore: jest.fn(),
	beginPath: jest.fn(),
	moveTo: jest.fn(),
	lineTo: jest.fn(),
	closePath: jest.fn(),
	stroke: jest.fn(),
	translate: jest.fn(),
	scale: jest.fn(),
	rotate: jest.fn(),
	arc: jest.fn(),
	fill: jest.fn(),
	measureText: jest.fn(() => ({ width: 0 })),
	transform: jest.fn(),
	rect: jest.fn(),
	clip: jest.fn(),
}));

HTMLCanvasElement.prototype.toDataURL = jest.fn(
	() =>
		'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg=='
);

// Mock ResizeObserver
global.ResizeObserver = jest.fn().mockImplementation(() => ({
	observe: jest.fn(),
	unobserve: jest.fn(),
	disconnect: jest.fn(),
}));

// Mock IntersectionObserver
global.IntersectionObserver = jest.fn().mockImplementation(() => ({
	observe: jest.fn(),
	unobserve: jest.fn(),
	disconnect: jest.fn(),
}));

// Mock matchMedia
Object.defineProperty(window, 'matchMedia', {
	writable: true,
	value: jest.fn().mockImplementation((query) => ({
		matches: false,
		media: query,
		onchange: null,
		addListener: jest.fn(), // deprecated
		removeListener: jest.fn(), // deprecated
		addEventListener: jest.fn(),
		removeEventListener: jest.fn(),
		dispatchEvent: jest.fn(),
	})),
});

// Mock scrollTo
window.scrollTo = jest.fn();

// Mock Element.scrollIntoView
Element.prototype.scrollIntoView = jest.fn();

// Fix for `getComputedStyle`
if (!window.getComputedStyle) {
	window.getComputedStyle = jest.fn(() => ({
		getPropertyValue: jest.fn(() => ''),
	}));
}

// Mock URL.createObjectURL and URL.revokeObjectURL
global.URL.createObjectURL = jest.fn(() => 'blob:mock-url');
global.URL.revokeObjectURL = jest.fn();

// Mock Element.prototype.getAnimations for Headless UI
if (typeof Element !== 'undefined') {
	Element.prototype.getAnimations = jest.fn(() => []);
}
