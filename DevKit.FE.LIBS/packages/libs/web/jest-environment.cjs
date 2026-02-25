const { TestEnvironment } = require('jest-environment-jsdom');

class CustomJSDOMEnvironment extends TestEnvironment {
	constructor(...args) {
		super(...args);

		// Prevent canvas from being loaded
		delete this.global.HTMLCanvasElement;

		// Override require to mock canvas
		const originalRequire = this.global.require || require;
		this.global.require = (id) => {
			if (id === 'canvas') {
				return {
					createCanvas: () => ({
						getContext: () => ({
							fillRect: () => {},
							clearRect: () => {},
							getImageData: () => ({ data: new Array(4).fill(0) }),
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
						toDataURL: () => 'data:image/png;base64,mock',
					}),
					loadImage: () => Promise.resolve(),
					registerFont: () => {},
					createImageData: () => [],
					Image: class MockImage {
						constructor() {
							this.src = '';
							this.width = 0;
							this.height = 0;
						}
					},
				};
			}
			return originalRequire(id);
		};
	}
}

module.exports = CustomJSDOMEnvironment;
