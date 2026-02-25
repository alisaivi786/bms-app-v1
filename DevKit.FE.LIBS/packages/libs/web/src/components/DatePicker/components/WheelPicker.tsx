import { useEffect, useRef } from 'react';
import { DevkitSimpleBar, DevkitSimpleBarRef } from '../../../common/devkitSimpleBar';

interface WheelPickerItem<T> {
	value: T;
	label: string;
	isDisabled?: boolean;
}

interface WheelPickerProps<T> {
	items: WheelPickerItem<T>[];
	onChange: (value: T) => void;
	value: T;
}

function useDebounce<T>(callback: (value: T) => void, delay: number) {
	const callbackRef = useRef(callback);

	useEffect(() => {
		callbackRef.current = callback;
	}, [callback]);

	return (value: T) => {
		setTimeout(() => {
			callbackRef.current(value);
		}, delay);
	};
}

function convertRemToPixels(rem: number) {
	try {
		return rem * parseFloat(getComputedStyle(document.documentElement).fontSize);
	} catch {
		return rem * 16;
	}
}

function WheelPicker<T>({ items, onChange, value }: WheelPickerProps<T>) {
	const itemHeight = convertRemToPixels(2.25);
	const debounceValue = 50;
	const scrollingRef = useRef<NodeJS.Timeout>();
	const wheelSimpleBarRef = useRef<DevkitSimpleBarRef>(null);

	const handleOnChange = useDebounce(onChange, debounceValue);

	const handleScroll = useDebounce((event: React.UIEvent<HTMLDivElement, UIEvent>) => {
		let isAnimating = false;

		if (!isAnimating) {
			isAnimating = true;

			requestAnimationFrame(() => {
				const scrollTop = Math.max((event.target as HTMLElement).scrollTop, 0);
				const selectedElement = Math.min(Math.max(Math.floor(scrollTop / itemHeight), 0), items.length - 1);

				clearTimeout(scrollingRef.current);

				scrollingRef.current = setTimeout(() => {
					handleOnChange(items[selectedElement].value);
				}, debounceValue);
				isAnimating = false;
			});
		}
	}, debounceValue);

	useEffect(() => {
		const itemIndex = items.findIndex((item) => item.value === value);

		if (wheelSimpleBarRef.current) {
			wheelSimpleBarRef.current.scrollTop(itemIndex * itemHeight);
		}
	}, []);

	function splitItemsByDisabled(items: WheelPickerItem<T>[]) {
		const disabledStart = [];
		const activeItems = [];
		const disabledEnd = [];
		let cursorPointer = 0;

		for (let i = 0; i <= items.length; i += 1) {
			const item = items[i];

			if (!item) {
				continue;
			}

			const isNextItemIsNotSame = item?.isDisabled !== items[i + 1]?.isDisabled;

			if (item?.isDisabled && isNextItemIsNotSame && cursorPointer === 0) {
				disabledStart.push(item);
				cursorPointer += 1;
				continue;
			}

			if (item?.isDisabled && !isNextItemIsNotSame && cursorPointer === 0) {
				disabledStart.push(item);
				continue;
			}

			if (!item?.isDisabled && !isNextItemIsNotSame && (cursorPointer === 1 || !disabledStart.length)) {
				activeItems.push(item);
				continue;
			}

			if (!item?.isDisabled && isNextItemIsNotSame && (cursorPointer === 1 || !disabledStart.length)) {
				activeItems.push(item);
				cursorPointer += 1;
				continue;
			}

			if (cursorPointer === 2 || !(disabledStart.length || !activeItems.length)) {
				disabledEnd.push(item);
			}
		}

		return [disabledStart, activeItems, disabledEnd];
	}

	const itemsWithDisabledSteps = splitItemsByDisabled(items as WheelPickerItem<T>[]);

	return (
		<div
			className="flex items-center w-full relative rtl:flex-row-reverse h-[16.25rem]"
			onScroll={(e) => {
				e.stopPropagation();
				e.preventDefault();
			}}
		>
			<div className="absolute border-t border-b h-9 snap-center border-gray-100 w-full"></div>
			<DevkitSimpleBar
				className="h-full w-full scrollbar-hide snap-y snap-mandatory overflow-y-scroll"
				scrollSnapType="snap-y"
				onScroll={handleScroll}
				ref={wheelSimpleBarRef}
				dragScroll={true}
				fixedContent={
					<div
						className="absolute h-full w-full cursor-pointer"
						style={{
							background: 'linear-gradient(0deg, rgba(255,255,255,1) 0%, transparent 50%, rgba(255,255,255,1) 100%)',
							pointerEvents: 'none',
						}}
					/>
				}
			>
				<div className="my-28">
					{itemsWithDisabledSteps.map((items, index) => {
						return (
							<div key={index} className="flex flex-col items-center">
								{items.map((item, index) => {
									return (
										<div
											key={index}
											className={`w-full h-9 flex items-center justify-center
											 ${item.isDisabled ? 'text-gray-400 snap-align-none' : 'text-black snap-center cursor-grab'} ${
												value === item.value && 'font-medium'
											}`}
										>
											{item.label}
										</div>
									);
								})}
							</div>
						);
					})}
				</div>
			</DevkitSimpleBar>
		</div>
	);
}

export default WheelPicker;
