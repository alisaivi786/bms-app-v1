export type Step = {
	title: string;
	content?: string | React.ReactNode;
};

export type JourneyStepperProps = {
	steps: Step[];
	currentStepIndex: number;
	onStepPress?: (index: number) => void;
	hideProgressBar?: boolean;
};
