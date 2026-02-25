/* eslint-disable */

// Mock for canvas module in Jest tests
module.exports = {
	createCanvas: () => ({
		getContext: () => ({
			fillRect: () => {},
			clearRect: () => {},
			getImageData: () => ({
				data: new Array(4).fill(0),
			}),
			putImageData: () => {},
			createImageData: () => [],
			setTransform: () => {},
			drawImage: () => {},
			save: () => {},
			fillText: () => {},
			restore: () => {},
			beginPath: () => {},
			moveTo: () => {},
			lineTo: () => {},
			closePath: () => {},
			stroke: () => {},
			translate: () => {},
			scale: () => {},
			rotate: () => {},
			arc: () => {},
			fill: () => {},
			measureText: () => ({ width: 0 }),
			transform: () => {},
			rect: () => {},
			clip: () => {},
		}),
		width: 150,
		height: 150,
		toDataURL: () =>
			'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==',
	}),
	loadImage: () => Promise.resolve(),
	registerFont: () => {},
	createImageData: () => [],
	Image: class {
		constructor() {
			this.src = '';
			this.width = 0;
			this.height = 0;
		}
	},
};
