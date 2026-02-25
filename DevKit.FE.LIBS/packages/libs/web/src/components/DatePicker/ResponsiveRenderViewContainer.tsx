import clsx from 'clsx';
import React, { PropsWithChildren } from 'react';
import { FloatingOverlay, FloatingPortal } from '@floating-ui/react';
import { CalendarViewMode } from '@devkit/utilities';
import { BottomSheet } from '../DialogModal';

interface ResponsiveRenderViewContainerProps {
	isMounted: boolean;
	calenderViewRef: React.RefObject<HTMLDivElement>;
	isElementOutOfScope?: boolean;
	setFloating: (node: HTMLElement | null) => void;
	calendarViewStyles: React.CSSProperties;
	getFloatingProps: (userProps?: React.HTMLProps<HTMLElement> | undefined) => Record<string, unknown>;
	onCalendarClose: () => void;
	isFocused: boolean;
	isMobile: boolean;
	enableTimeSelection: boolean;
	pickerViewMode: CalendarViewMode | undefined;
	multiCalendar?: boolean;
	isIntervalPicker: boolean;
}

const ResponsiveRenderViewContainer: React.FC<PropsWithChildren<ResponsiveRenderViewContainerProps>> = ({
	children,
	calendarViewStyles,
	calenderViewRef,
	getFloatingProps,
	isElementOutOfScope,
	isFocused,
	isMounted,
	onCalendarClose,
	setFloating,
	isMobile,
	enableTimeSelection,
	pickerViewMode = 'days',
	multiCalendar = false,
	isIntervalPicker,
}) => {
	if (isMobile) {
		const getMobileHeight = () => {
			if (enableTimeSelection) {
				return isIntervalPicker ? '25rem' : '20rem';
			}

			return isIntervalPicker ? '20rem' : '17.5rem';
		};

		return (
			<BottomSheet isOpen={isFocused} onClose={onCalendarClose} height={getMobileHeight()}>
				{children}
			</BottomSheet>
		);
	}

	const getHeight = () => {
		if (!isIntervalPicker) {
			if (enableTimeSelection) {
				return [multiCalendar ? 'h-[23.75rem]' : 'h-[23.125rem]'];
			} else if (pickerViewMode === 'time') {
				return [multiCalendar ? 'h-[21.25rem]' : 'h-[20.625rem]'];
			} else {
				return [multiCalendar ? 'h-[22.5rem]' : 'h-[20.625rem]'];
			}
		} else {
			return [enableTimeSelection ? 'h-[25rem]' : 'h-[23.125rem]'];
		}
	};

	return isMounted ? (
		<FloatingPortal>
			<FloatingOverlay lockScroll onClick={onCalendarClose} />
			<div ref={calenderViewRef} className="sh-date-picker">
				<div
					className={clsx('z-floating flex ', getHeight(), isElementOutOfScope && 'invisible')}
					ref={setFloating}
					style={calendarViewStyles}
					{...getFloatingProps()}
				>
					<div className="bg-white rounded-md shadow-datePicker !block w-min  p-4 "> {children}</div>
				</div>
			</div>
		</FloatingPortal>
	) : (
		<></>
	);
};

export default ResponsiveRenderViewContainer;
