import { OutlinedInfoCircleIcon } from '@devkit/icons/web';
import { ComponentPopoverVariantType } from '@devkit/utilities';
import { Popover } from '../../../Popover';
import { GRID_EXPAND_COLUMN_NAME, GRID_SELECTION_COLUMN_NAME } from '../../constants';
import { IColumn } from '../../types';
import HeaderPopup from './HeaderPopup';

interface HeaderContentProps<T, TAction extends string> {
	rows: T[];
	pageRows: T[];
	headerRender?: () => React.ReactNode;
	keyField: keyof T;
	name: string;
	orderedColumns: IColumn<T, TAction>[] | undefined;
	popover?: { header: string; description: string } | React.ReactNode;
	popoverVariant?: ComponentPopoverVariantType;
	pinned?: boolean;
	isPinned?: boolean;
	serverSideHandling?: boolean;
	getUnitText?: (count: number) => string;
	getSelectPageText?: (count: number, isUnselect: boolean) => string | React.ReactNode;
	getSelectAllText?: (count: number, isUnselect: boolean) => string | React.ReactNode;
}
function HeaderContent<T, TAction extends string>(props: HeaderContentProps<T, TAction>) {
	const {
		rows,
		name,
		headerRender,
		popover,
		pageRows,
		pinned,
		isPinned,
		orderedColumns,
		getSelectAllText,
		getSelectPageText,
		getUnitText,
		serverSideHandling,
		keyField,
		popoverVariant,
	} = props;

	if (headerRender) {
		return headerRender() as JSX.Element;
	}

	if (name === GRID_SELECTION_COLUMN_NAME) {
		return (
			<HeaderPopup
				rows={rows}
				pageRows={pageRows}
				serverSideHandling={serverSideHandling}
				orderedColumns={orderedColumns}
				pinned={pinned}
				keyField={keyField}
				getSelectAllText={getSelectAllText}
				getSelectPageText={getSelectPageText}
				getUnitText={getUnitText}
			/>
		);
	}

	if (isPinned || name === GRID_EXPAND_COLUMN_NAME) {
		return <></>;
	}

	return (
		<div className="flex items-center justify-center gap-2">
			{name}
			{popover && (
				<div className="flex pb-0.5">
					<Popover direction="bottom" content={popover} popoverVariant={popoverVariant}>
						<OutlinedInfoCircleIcon className="text-gray-600" fontSize={15} />
					</Popover>
				</div>
			)}
		</div>
	);
}

export default HeaderContent;
