import { ReactNode, createContext, useContext, useState } from 'react';
import { IDrawerProps } from '@devkit/shared-types';
import { useWebUIConfigOptions } from '../../layouts/ThemeProvider/theme-context';
import { Drawer } from './Drawer';

export interface IDrawerContextData extends IDrawerProps {
	/**If true, then the Drawer will be shown */
	isShown: boolean;
	/**Action to close drawer */
	closeDrawer: () => void;
}

interface IDrawerContextActions {
	showDrawer: (newValues: Partial<Omit<IDrawerContextData, 'isShown'>>) => void;
}

const drawerContext = createContext<IDrawerContextData & IDrawerContextActions>({
	position: 'end',
	showCloseIcon: true,
	onClose: () => undefined,
	preventAutoClose: false,
	title: '',
	isShown: false,
	showDrawer: () => undefined,
	closeDrawer: () => undefined,
});

export const DrawerProvider = ({ children }: { children: ReactNode }) => {
	const [contextValues, setContextValues] = useState<IDrawerContextData>({
		position: 'end',
		showCloseIcon: true,
		onClose: () => undefined,
		preventAutoClose: false,
		title: '',
		isShown: false,
		closeDrawer: () => undefined,
	});

	return (
		<drawerContext.Provider
			value={{
				...contextValues,
				showDrawer: (newValues) => {
					setContextValues({ ...contextValues, ...newValues, isShown: true });
				},
				closeDrawer: () => {
					setContextValues({ ...contextValues, isShown: false });
				},
			}}
		>
			{children}
			<Drawer
				{...contextValues}
				closeDrawer={() => {
					setContextValues({ ...contextValues, isShown: false });
				}}
			/>
		</drawerContext.Provider>
	);
};

export const useDrawer = () => {
	const { showDrawer, closeDrawer } = useContext(drawerContext);
	const { drawer } = useWebUIConfigOptions();

	const { ...defaultProps } = drawer?.drawerDefaults ?? {};

	const onShowDrawer = (props: IDrawerProps | undefined | null) => {
		if (props) {
			showDrawer({ ...defaultProps, ...props });
		}
	};

	return {
		showDrawer: (props: IDrawerProps | undefined | null) => {
			onShowDrawer(props);
		},
		closeDrawer: closeDrawer,
	};
};
