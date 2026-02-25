import { FC, ReactNode } from 'react';

type Props = {
	elementId: string;
	children: ReactNode;
};

const LinkToId: FC<Props> = (props) => {
	const { elementId, children } = props;

	function scrollSmoothTo() {
		const element = document.getElementById(elementId);

		element?.scrollIntoView({ block: 'start', behavior: 'smooth' });
	}

	return (
		<span onClick={() => scrollSmoothTo()} style={{ cursor: 'pointer' }}>
			{children}
		</span>
	);
};

export default LinkToId;
