interface Props {
	label: string;
}

const RenderItem = ({ label }: Props) => {
	return (
		<div className="px-4 py-2">
			<p className="text-paragraph">{label}</p>
		</div>
	);
};

export default RenderItem;
