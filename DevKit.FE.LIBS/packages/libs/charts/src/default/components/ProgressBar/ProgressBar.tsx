'use client';

import React from 'react';
import { cn } from '../../utils/cn';

/**
 * A single row of data for the ProgressBar component.
 * You can include arbitrary keys; the `columns` prop decides what to show.
 */
export type ProgressBarRow = Record<string, string | number | undefined> & {
	/** Optional helper key for first column label */
	label?: string;
	/** Optional helper key for count column */
	count?: number;
	/** Percentage value (0..100) used by the progress column */
	percentage?: number;
};

/** Configuration for rendering a column in the grid. */
type ProgressBarColumn = {
	/** Key from each row used for this column */
	key: string;
	/** Header text for this column */
	title?: string;
};

export type ProgressBarProps = {
	/** Rows of data to display */
	data: ProgressBarRow[];
	/** Column definitions (order matters) */
	columns: ProgressBarColumn[];
	/** Optional extra class names for the container */
	className?: string;
};

/** Clamp a value to the inclusive range [0, 100]. */
const clampToPercentageRange = (value: number, min = 0, max = 100) => Math.min(Math.max(value, min), max);

// Local GrayLine placeholder for empty cells
const GrayLine: React.FC = () => (
	<span className="inline-block h-[1px] w-6 bg-[#E4E9F2] align-middle" aria-hidden="true" />
);

export function ProgressBar({ data, columns, className }: ProgressBarProps) {
	// Keep a clearly named reference to the provided columns
	const columnsToRender: ProgressBarColumn[] = columns;
	const baseCellClasses = 'text-[#23346F] text-[12px] md:text-[14px] text-left';
	const cellClassByKey: Record<string, string> = {
		label: 'pl-3 md:pl-6 font-bold',
		count: 'whitespace-nowrap',
	};

	const headerBaseCellClasses = 'pb-3 text-left text-[#A4A9B6] font-bold tracking-wide text-[12px] md:text-[14px]';
	const headerCellClassByKey: Record<string, string> = {
		label: 'pl-3 md:pl-6',
		count: 'whitespace-nowrap',
	};

	return (
		<div className={cn('w-full', className)}>
			{/* Header */}
			<div
				className={cn(
					'grid h-16	 content-end items-end bg-[#F7FAFC] border-b border-[#EDF0F6]',
					'grid-cols-[minmax(160px,auto)_minmax(160px,auto)_1fr] md:grid-cols-[minmax(220px,auto)_minmax(220px,auto)_1fr]'
				)}
			>
				{columnsToRender.map((column, columnIndex) => (
					<div key={columnIndex} className={cn(headerBaseCellClasses, headerCellClassByKey[column.key])}>
						{column.title}
					</div>
				))}
			</div>

			{/* Body */}
			<div>
				{data.map((rowData, rowIndex) => (
					<div
						key={rowIndex}
						className={cn(
							'grid items-center border-b border-[#EDF0F6] py-3 md:py-4',
							'grid-cols-[minmax(160px,auto)_minmax(160px,auto)_1fr] md:grid-cols-[minmax(220px,auto)_minmax(220px,auto)_1fr]'
						)}
					>
						{columnsToRender.map((column, columnIndex) => {
							const cellValue = rowData[column.key];
							const isPercentageColumn = column.key === 'percentage';

							// Render progress/percentage column
							if (isPercentageColumn) {
								const rawPercentageValue =
									typeof cellValue === 'number'
										? cellValue
										: typeof cellValue === 'string'
										? Number(cellValue)
										: undefined;
								const normalizedPercentage = clampToPercentageRange(
									rawPercentageValue ??
										(typeof rowData['percentage'] === 'number'
											? (rowData['percentage'] as number)
											: Number(rowData['percentage'])),
									0,
									100
								);

								return (
									<div
										key={columnIndex}
										className="flex items-center gap-2 w-full max-w-[260px] sm:max-w-[360px] md:max-w-[600px] pr-3 md:pr-8"
									>
										<div className="min-w-[3.5rem] text-[#23346F] font-bold text-[12px] md:text-[14px]">
											{Number.isFinite(normalizedPercentage) ? `${Math.round(normalizedPercentage)}%` : '-'}
										</div>
										<div className="relative h-1 flex-1 max-w-[220px] sm:max-w-[340px] md:max-w-[520px] rounded-full bg-[#E4E9F2]">
											<div
												className="absolute left-0 top-0 h-1 rounded-full bg-[#5AA2DB]"
												style={{ width: `${Number.isFinite(normalizedPercentage) ? normalizedPercentage : 0}%` }}
												aria-valuenow={Number.isFinite(normalizedPercentage) ? normalizedPercentage : 0}
												aria-valuemin={0}
												aria-valuemax={100}
												role="progressbar"
											/>
										</div>
									</div>
								);
							}

							return (
								<div key={columnIndex} className={cn(baseCellClasses, cellClassByKey[column.key] ?? 'font-bold')}>
									{cellValue || cellValue === 0 ? cellValue : <GrayLine />}
								</div>
							);
						})}
					</div>
				))}
			</div>
		</div>
	);
}

export default ProgressBar;
