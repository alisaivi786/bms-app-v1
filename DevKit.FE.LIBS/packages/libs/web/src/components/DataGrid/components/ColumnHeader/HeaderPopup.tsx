import { Checkbox } from '../../../Checkbox';
import { Popover } from '../../../Popover';
import { useDataGridContext } from '../../Context/DataGridContext';
import useHeaderPopup from '../../hooks/useHeaderPopup';
import { IColumn } from '../../types';

interface IHeaderPopupProps<T, TAction extends string> {
	rows: T[];
	pageRows: T[];
	orderedColumns: IColumn<T, TAction>[] | undefined;
	pinned?: boolean;
	keyField: keyof T;
	serverSideHandling?: boolean;
	getUnitText?: (count: number) => string;
	getSelectPageText?: (count: number, isUnselect: boolean) => string | React.ReactNode;
	getSelectAllText?: (count: number, isUnselect: boolean) => string | React.ReactNode;
}

function HeaderPopup<T, TAction extends string>({
	rows,
	pageRows,
	pinned,
	serverSideHandling,
	keyField,
	getUnitText = (count) => (count > 1 ? 'Records' : 'Record'),
	getSelectAllText = (count: number, isUnselect: boolean) =>
		isUnselect ? (
			<div className="flex gap-1">
				Unselect all <p className="font-bold">&nbsp;{count}&nbsp;</p>
				{getUnitText(count)}
			</div>
		) : (
			<div className="flex gap-1">
				Select all <p className="font-bold">&nbsp;{count}&nbsp;</p>
				{getUnitText(count)}
			</div>
		),
	getSelectPageText = (count: number, isUnselect: boolean) =>
		isUnselect ? (
			<div className="flex gap-1">
				Unselect <p className="font-bold">&nbsp;{count}&nbsp;</p>
				{getUnitText(count)} on this page
			</div>
		) : (
			<div className="flex gap-1">
				Select <p className="font-bold">&nbsp;{count}&nbsp;</p>
				{getUnitText(count)} on this page
			</div>
		),
}: IHeaderPopupProps<T, TAction>) {
	const { allRowsSelected, selectAllVariant } = useDataGridContext<T>();

	const {
		selectPageText,
		selectAllText,
		isMenuOpen,
		setIsMenuOpen,
		onCheckAllForOnePage,
		onCheckAllForOnePageFromTooltip,
		onCheckAllFromTooltip,
	} = useHeaderPopup({
		pageRows,
		keyField,
		getSelectPageText,
		getSelectAllText,
		serverSideHandling,
		rows,
	});

	return (
		<Popover
			direction="bottom-start"
			popoverVariant="dark"
			isOpen={isMenuOpen}
			onIsOpenChange={(isOpen) => {
				//only closing is required
				if (!isOpen) setIsMenuOpen(false);
			}}
			content={
				<div className="flex w-full flex-col rounded-md border-b border-gray-200 bg-white py-2.5 text-paragraph font-normal text-black">
					<button
						className="flex items-center border-0 bg-none py-3 px-5 hover:nj-bg-brand hover:text-white"
						onClick={onCheckAllForOnePageFromTooltip}
					>
						{selectPageText}
					</button>
					{pageRows.length > 1 && (
						<button
							className="flex items-center border-0 bg-none py-3 px-5 hover:nj-bg-brand hover:text-white"
							onClick={onCheckAllFromTooltip}
						>
							{selectAllText}
						</button>
					)}
				</div>
			}
		>
			<div className={`${pinned ? '' : 'pl-1'}`}>
				{selectAllVariant !== 'hidden' && (
					<Checkbox
						isChecked={allRowsSelected}
						disabled={pageRows.length == 0 || selectAllVariant === 'disabled'}
						onChange={onCheckAllForOnePage}
					/>
				)}
			</div>
		</Popover>
	);
}

export default HeaderPopup;
