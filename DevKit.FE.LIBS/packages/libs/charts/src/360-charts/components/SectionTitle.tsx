export const SectionTitle = ({ title, color = 'blue' }: { title: string; color?: 'blue' | 'green' }) => {
	return (
		<div className="flex items-center space-x-2 mb-4">
			<div className={`w-1 h-5 bg-gradient-to-b from-${color}-500 to-${color}-600 rounded-full`}></div>
			<h3 className="text-lg font-bold text-slate-900">{title}</h3>
		</div>
	);
};
