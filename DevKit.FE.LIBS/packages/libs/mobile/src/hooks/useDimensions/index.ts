import React from 'react';
import { Dimensions } from 'react-native';

export const useDimensions = () => {
	const [orientation, setOrientation] = React.useState('PORTRAIT');

	React.useEffect(() => {
		const dim = Dimensions.get('screen');

		if (dim.height >= dim.width) setOrientation('PORTRAIT');
		else setOrientation('LANDSCAPE');

		const subscription = Dimensions.addEventListener('change', ({ window: { width, height } }) => {
			if (width < height) {
				setOrientation('PORTRAIT');
			} else {
				setOrientation('LANDSCAPE');
			}
		});

		return () => subscription?.remove();
	}, []);

	const isPortrait = React.useMemo(() => {
		return orientation === 'PORTRAIT';
	}, [orientation]);

	return {
		isPortrait,
	};
};
