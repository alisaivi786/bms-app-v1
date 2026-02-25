import isNil from 'lodash/isNil';
import { ReactNode, createContext, useContext, useEffect, useState } from 'react';
import { useHTMLElementObserver } from '../../hooks/useHTMLElementObserver';

interface ICollapsibleContext {
	/** 	If true, expands the children, otherwise collapse it.*/
	open: boolean;
	/**  	Callback fired when the expand/collapse state is changed */
	toggle: (open?: boolean) => void;
}

const CollapsibleContext = createContext<ICollapsibleContext>({
	open: false,
	toggle: () => undefined,
});

export interface ICollapsibleProps {
	/**	React elements to be rendered */

	children: ReactNode | ((props: ICollapsibleContext) => JSX.Element);
	/** 	If true, expands the children, otherwise collapse it.*/

	open?: boolean;

	/**  	Callback fired when the expand/collapse state is changed */
	onToggle?: (open: boolean) => void;
}

export const CollapsibleButton = ({ children }: { children: ReactNode }) => {
	const { toggle } = useCollapsible();

	return (
		<div className="cursor-pointer" onClick={() => toggle()}>
			{children}
		</div>
	);
};

export const CollapsiblePanel = ({ children, minHeight }: { children: React.ReactNode; minHeight?: number }) => {
	const [contentMaxHeight, setContentMaxHeight] = useState(0);
	const { contentRef } = useHTMLElementObserver<HTMLDivElement>({
		onChange: (elem) => {
			setContentMaxHeight(elem.getBoundingClientRect().height);
		},
	});
	const [isMount, setIsMount] = useState(false);
	const { open } = useCollapsible();

	useEffect(() => {
		setTimeout(() => {
			setIsMount(true);
		}, 100);
	}, []);

	return (
		<div
			className={`max-h-0 overflow-hidden ${isMount ? 'transition-max-height duration-300' : ''} -mx-1 px-1`}
			style={{
				minHeight: `${minHeight}px`,
				maxHeight: `${open ? contentMaxHeight : 0}px`,
			}}
		>
			<div className="text-paragraph font-normal" ref={contentRef}>
				{children}
			</div>
		</div>
	);
};

export const Collapsible = ({ children, open, onToggle }: ICollapsibleProps) => {
	const [unControlledOpen, setUnControlledOpen] = useState(false);
	const isUncontrolled = isNil(open);
	const isOpen = isUncontrolled ? unControlledOpen : open;
	const setIsOpen = isUncontrolled
		? (val: boolean) => {
				setUnControlledOpen(val);
				onToggle?.(val);
		  }
		: onToggle;

	const toggle = (value?: boolean) => {
		if (typeof value === 'boolean') {
			setIsOpen?.(value);
		} else {
			setIsOpen?.(!isOpen);
		}
	};

	return (
		<div>
			<CollapsibleContext.Provider
				value={{
					open: isOpen,
					toggle,
				}}
			>
				{typeof children === 'function' ? children({ open: isOpen, toggle }) : children}
			</CollapsibleContext.Provider>
		</div>
	);
};

export const useCollapsible = () => {
	return useContext(CollapsibleContext);
};
