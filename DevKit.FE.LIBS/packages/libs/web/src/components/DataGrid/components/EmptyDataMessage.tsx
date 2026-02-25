import { ReactElement } from 'react';
import { useWebUIConfigOptions } from '../../../layouts/ThemeProvider/theme-context';

interface Props {
	emptyDataMessage?: string | ReactElement;
	width: number;
	height: number;
}

function EmptyDataMessage(props: Props) {
	const { isRtlLocale } = useWebUIConfigOptions();
	const { emptyDataMessage, width, height } = props;

	return (
		<div className="relative items-center justify-center table-row h-64 font-medium text-caption1 text-gray-600">
			<div className="sticky start-0">
				<div
					className="absolute flex items-center justify-center h-full text-center align-middle start-0"
					style={{ width: `${width}px`, height: `${height}px` }}
				>
					{emptyDataMessage ?? (isRtlLocale ? 'لا توجد سجلات' : 'No Records Found')}
				</div>
			</div>
		</div>
	);
}

export default EmptyDataMessage;
