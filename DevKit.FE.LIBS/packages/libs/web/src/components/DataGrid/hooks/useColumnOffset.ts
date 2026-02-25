function useColumnOffset() {
	const getLeftOffset = (
		index: number,
		columnsWidth: { index: number; width: number }[],
		frozen?: 'left' | 'right'
	) => {
		if (frozen !== 'left') return undefined;

		let offset = 0;

		columnsWidth
			.filter((c) => c.index < index)
			.forEach(({ width }) => {
				offset += width + 32 + 1;
			});

		offset--;

		return offset < 0 ? 0 : offset;
	};

	const getRightOffset = (
		index: number,
		columnsWidth: { index: number; width: number }[],
		frozen?: 'left' | 'right'
	) => {
		if (frozen !== 'right') return undefined;

		let offset = 0;

		columnsWidth
			.filter((c) => c.index > index)
			.forEach(({ width }) => {
				offset += width + 32 + 1;
			});

		return offset;
	};

	return { getLeftOffset, getRightOffset };
}

export default useColumnOffset;
