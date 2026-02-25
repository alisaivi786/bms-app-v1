import { EmailIcon, SocialAppleIcon, SocialFacebookIcon, SocialGoogleIcon } from '@devkit/icons/web';
import { Meta } from '@storybook/react-vite';
import { StoryBookThemeProvider } from '../../../../.storybook/decorator/sbThemeProvider';
import { Button } from '../../../../src/components/Buttons';
import { Divider } from '../../../../src/components/Divider';
import { IFullPageLayoutProps } from '../../../../src/layouts/FullPageLayout/FullPageLayout';
import { LoginPageLayout } from '../../../../src/layouts/LoginPageLayout/LoginPageLayout';
import { useMockLayoutSettings } from '../../../../src/test-utils/useMockLayoutSettings';

type ComponentType = (args: IFullPageLayoutProps & { content: string }) => JSX.Element;

const SocialLoginLayout = () => {
	return (
		<LoginPageLayout>
			<div className="w-full gap-4 flex flex-col">
				<Button iconStart={EmailIcon}>Email</Button>
				<Button variant="social" iconStart={EmailIcon}>
					Email
				</Button>
				<Divider className="mt-8 pt-0.5" />
				<div className="w-full flex justify-center my-4">Or:</div>
				<Button variant="social" iconStart={SocialFacebookIcon} textWidth="w-40">
					Sign in with Facebook
				</Button>
				<Button variant="social" iconStart={SocialGoogleIcon} textWidth="w-40" disabled>
					Sign in with Google
				</Button>
				<Button variant="social" iconStart={SocialAppleIcon} textWidth="w-40">
					Sign in with Apple
				</Button>
			</div>
		</LoginPageLayout>
	);
};

const StoryMeta: Meta<ComponentType> = {
	title: 'Web/Layouts/DefaultLayouts/LoginPageLayout',
	component: LoginPageLayout,
	render: SocialLoginLayout,
	parameters: {
		layout: 'fullscreen',
	},
	decorators: [
		(Story, Context) => {
			const layoutSettings = useMockLayoutSettings({
				withMenu: true,
				isExpanded: true,
				onExpandedStateChange() {
					alert('expanded changed');
				},
			});

			return (
				<StoryBookThemeProvider sbContext={Context} settings={layoutSettings}>
					<Story />
				</StoryBookThemeProvider>
			);
		},
	],
};

export default StoryMeta;

export const SocialLogin = {};
