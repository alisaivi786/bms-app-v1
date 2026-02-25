import { memo } from 'react';

interface SectionHeaderProps {
	title: string;
	description: string;
	color?: 'blue' | 'green';
}

export const SectionHeader = memo(function SectionHeader({ title, description, color = 'blue' }: SectionHeaderProps) {
	return (
		<div className="flex items-center justify-between bg-gradient-to-r from-slate-50 to-gray-50 p-3 rounded-xl border border-slate-200">
			<div className="flex items-center space-x-3">
				<div className={`w-2 h-6 bg-gradient-to-b from-${color}-500 to-${color}-600 rounded-full`}></div>
				<div>
					<h2 className="text-xl font-bold text-slate-900">{title}</h2>
					<p className="text-slate-600 text-sm font-medium">{description}</p>
				</div>
			</div>
		</div>
	);
});
