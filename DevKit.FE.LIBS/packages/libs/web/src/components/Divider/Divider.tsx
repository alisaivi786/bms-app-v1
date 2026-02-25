import DividerStyles from './Divider.styles';

export const Divider = ({ className }: { className?: string }) => {
	return <div className={DividerStyles.dividerStyle(className)} />;
};
