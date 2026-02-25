import {Transition, TransitionChild} from '@headlessui/react';
import { ThinCloseIcon } from '@devkit/icons/web';
import { IDrawerProps } from '@devkit/shared-types';
import LogoHeader from '../../common/LogoHeader';
import { DevkitSimpleBar } from '../../common/devkitSimpleBar';
import { useWebUIConfigOptions } from '../../layouts/ThemeProvider/theme-context';
import { IDrawerContextData } from './DrawerContext';

export const Drawer = ({
	children,
	position,
	isShown,
	showCloseIcon,
	onClose,
	preventAutoClose,
	title,
	closeDrawer,
}: IDrawerProps & IDrawerContextData) => {
	const triggerDrawerClose = () => {
		closeDrawer();
		onClose && onClose();
	};
	const { isRtlLocale } = useWebUIConfigOptions();
	const drawerPositions = {
		start: isRtlLocale ? { top: 0, right: 0 } : { top: 0, left: 0 },
		end: isRtlLocale ? { top: 0, left: 0 } : { top: 0, right: 0 },
	};

	const isDrawerShownInStart = (position === 'end' && isRtlLocale) || (position === 'start' && !isRtlLocale);

	return (
		<div className={`fixed top-0 z-drawer w-screen h-screen ${isShown ? '' : 'hidden'}`}>
			<Transition show={isShown}>
				<div>
					{/* Background overlay */}
					<div className="h-full w-full inset-0">
						<TransitionChild
							enter="transition-opacity ease-linear duration-300"
							enterFrom="opacity-0"
							enterTo="opacity-100"
							leave="transition-opacity ease-linear duration-300"
							leaveFrom="opacity-100"
							leaveTo="opacity-0"
						>
							<div
								className="absolute  inset-0 bg-black/25"
								onClick={() => {
									!preventAutoClose && triggerDrawerClose();
								}}
							/>
						</TransitionChild>
					</div>

					{/* Sliding sidebar */}
					<div
						style={{ ...drawerPositions[position || 'end'] }}
						className="absolute w-72 overflow-y-hidden min-h-full flex flex-auto flex-col overflow-hidden "
					>
						<TransitionChild
							enter="transition ease-in-out duration-300 transform"
							enterFrom={isDrawerShownInStart ? '-translate-x-full' : 'translate-x-full'}
							enterTo={isDrawerShownInStart ? 'translate-x-0' : 'translate-x-100'}
							leave="transition ease-in-out duration-300 transform"
							leaveFrom={isDrawerShownInStart ? 'translate-x-0' : 'translate-x-100'}
							leaveTo={isDrawerShownInStart ? '-translate-x-full' : 'translate-x-full'}
						>
							<div
								className="absolute flex h-full flex-col w-full overflow-y-hidden min-h-full bg-white"
								style={{ ...drawerPositions[position || 'end'] }}
							>
								<div className="flex  align-bottom  p-4  px-6  items-center ">
									<div className="w-full">{title ? title : <LogoHeader logoColorMode="dark" />}</div>
									{showCloseIcon && (
										<ThinCloseIcon
											className="rounded-md cursor-pointer h-6 w-6 text-gray-800"
											onClick={triggerDrawerClose}
										/>
									)}
								</div>

								<DevkitSimpleBar className="flex flex-col pb-10 h-[100dvh]">
									<div className="pb-10">{children}</div>
								</DevkitSimpleBar>
							</div>
						</TransitionChild>
					</div>
				</div>
			</Transition>
		</div>
	);
};
