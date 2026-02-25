export type ProgressBarSize = 'small' | 'medium' | 'large';

export type ProgressBarProps = {
	progress: number;
	size?: ProgressBarSize;
};
