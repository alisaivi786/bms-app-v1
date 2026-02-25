type Variant = 'success' | 'error' | 'warning' | 'info';

export type MessageProps = {
	variant: Variant;
	text?: string;
	isClosable?: boolean;
};
