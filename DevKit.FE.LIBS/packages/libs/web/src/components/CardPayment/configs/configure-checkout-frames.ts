type IWindow = Window;

declare let window: IWindow & typeof globalThis;

export const initializeCheckoutFrames = (onScriptLoad: () => void) => {
	if (typeof window !== typeof undefined) {
		cleanCheckoutFramesScript();

		const script = window.document.createElement('script');

		script.id = 'checkout-frames-js';
		script.src = 'https://cdn.checkout.com/js/framesv2.min.js';
		script.defer = true;

		script.onload = () => {
			onScriptLoad();
		};

		window.document.body.appendChild(script);
	}
};

export const cleanCheckoutFramesScript = () => {
	if (typeof window !== typeof undefined) {
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		const Frames = (window as any).Frames;

		if (Frames) {
			Object.keys(Frames.Events).forEach((key) => {
				Frames.removeAllEventHandlers(Frames.Events[key]);
			});
		}

		// remove the script if it is already there
		if (window.document.querySelector('#checkout-frames-js')) {
			window.document.body.removeChild(window.document.querySelector('#checkout-frames-js') as Node);
		}
	}
};
