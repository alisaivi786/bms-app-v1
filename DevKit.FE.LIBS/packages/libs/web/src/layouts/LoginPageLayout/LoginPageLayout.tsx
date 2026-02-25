import { Card } from '../../components/Card';
import { FullPageLayout, IFullPageLayoutProps } from '../FullPageLayout';

export const LoginPageLayout = ({ children, ...layoutProps }: IFullPageLayoutProps) => {
	return (
		<FullPageLayout verticalCenter variant="primary" stickyHeader {...layoutProps}>
			<div className="flex justify-center">
				<Card className=" w-full md:w-[586px] lg:w-[630px]">{children}</Card>
			</div>
		</FullPageLayout>
	);
};
