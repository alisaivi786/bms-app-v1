import BaseButton from './BaseButton';
import { ResetButtonProps } from './types';

const ResetButton = (props: ResetButtonProps) => {
	return (
		<BaseButton {...props} type="reset">
			{props.children}
		</BaseButton>
	);
};

export default ResetButton;
