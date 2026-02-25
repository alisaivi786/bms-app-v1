import { useEffect, useRef, useState } from 'react';
import { InteractionManager, Platform, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Step } from './types';

export const useStepMeasurements = ({
	isOpen,
	steps,
	stepperBodyRef,
	indicatorRefs,
	headerRef,
	setHeaderTop,
}: {
	isOpen: boolean;
	steps: Step[];
	stepperBodyRef: React.RefObject<View>;
	indicatorRefs: React.MutableRefObject<(View | null)[]>;
	headerRef: React.RefObject<View>;
	setHeaderTop: (top: number) => void;
}) => {
	const [indicatorPositions, setIndicatorPositions] = useState<number[]>(new Array(steps.length).fill(0));
	const layoutReady = useRef(false);
	const { top } = useSafeAreaInsets();

	const measurePositions = async () => {
		if (!stepperBodyRef.current || !isOpen || !layoutReady.current) return;

		// Get the stepper body's top position
		const stepperTop = await new Promise<number>((resolve) => {
			stepperBodyRef.current?.measureInWindow((_, y) => resolve(y));
		});

		// Measure all indicators concurrently
		const measurements = await Promise.all(
			steps.map((_, index) => {
				const indicatorRef = indicatorRefs.current[index];

				return new Promise<number>((resolve) => {
					if (indicatorRef) {
						indicatorRef.measureInWindow((_, y) => {
							resolve(y - stepperTop + 10);
						});
					} else {
						resolve(0);
					}
				});
			})
		);

		// Only update if measurements differ and are valid
		if (measurements.every((pos) => pos > 0) && measurements.some((pos, i) => pos !== indicatorPositions[i])) {
			setIndicatorPositions(measurements);
		} else if (measurements.some((pos) => pos <= 0)) {
			// Retry after interactions if measurements are invalid
			InteractionManager.runAfterInteractions(() => {
				requestAnimationFrame(measurePositions);
			});
		}
	};

	// Trigger measurements when layout is ready
	const handleLayout = () => {
		layoutReady.current = true;
		requestAnimationFrame(measurePositions);
	};

	useEffect(() => {
		if (!isOpen) {
			layoutReady.current = false;
			setIndicatorPositions(new Array(steps.length).fill(0));

			return;
		}

		// Schedule initial measurement
		const handle = InteractionManager.runAfterInteractions(() => {
			requestAnimationFrame(measurePositions);
		});

		return () => handle.cancel();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isOpen, steps]);

	const measureHeaderPosition = () => {
		if (headerRef.current) {
			headerRef.current.measure((_x, _y, _width, _height, _pageX, pageY) => {
				setHeaderTop(pageY - (Platform.OS === 'ios' ? 0 : top));
			});
		}
	};

	return {
		indicatorPositions,
		onLayout: handleLayout,
		measureHeader: measureHeaderPosition,
	};
};
