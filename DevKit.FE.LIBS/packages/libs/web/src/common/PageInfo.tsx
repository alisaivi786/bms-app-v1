import React, { ReactNode } from 'react';
// import { Collapsible } from '../components/Collapsible';
import { getResponsiveText } from '../utils/stringsUtils';

export interface IPageInfo {
	title: string | { base?: string; md?: string; lg?: string };
	titleIcon?: React.FC<React.SVGProps<SVGSVGElement>>;
	iconAction?: () => void;
	description?: string | { base?: string; md?: string; lg?: string };
	moreInfoText?: string;
	moreInfoContent?: ReactNode;
	hideInDesktop?: boolean;
}

const PageInfo = ({
	title,
	titleIcon: TitleIcon,
	iconAction,
	description,
	moreInfoContent,
	moreInfoText,
	hideInDesktop,
}: IPageInfo) => {
	const { mobile: mobileText, ipad: ipadText, desktop: desktopText } = getResponsiveText(title);
	const {
		mobile: mobileDescription,
		ipad: ipadDescription,
		desktop: desktopDescription,
	} = getResponsiveText(description);

	return (
		<div className="w-full pb-6 md:pt-5 lg:pt-5 lg:pb-0">
			{/** mobile view area */}
			<div className="md:invisible">
				{!!mobileText && (
					<div className="flex items-baseline">
						<h2 className="w-full text-center font-bold text-gray-800">
							<div
								dangerouslySetInnerHTML={{
									__html: mobileText?.replace(/\n/g, '<br />'),
								}}
							></div>
						</h2>
						{TitleIcon && <TitleIcon onClick={iconAction} />}
					</div>
				)}
				{!!mobileDescription && (
					<div className="w-full pt-4 text-start text-paragraph text-gray-800">
						<div
							dangerouslySetInnerHTML={{
								__html: mobileDescription?.replace(/\n/g, '<br />'),
							}}
						></div>
					</div>
				)}
			</div>
			{/** ipad view area */}
			<div className="invisible md:visible lg:invisible">
				{!!ipadText && (
					<h2 className="w-full text-center font-bold text-gray-800">
						<div
							dangerouslySetInnerHTML={{
								__html: ipadText?.replace(/\n/g, '<br />'),
							}}
						></div>
					</h2>
				)}
				{!!ipadDescription && (
					<div className="w-full pt-4 text-start text-paragraph text-gray-800">
						<div
							dangerouslySetInnerHTML={{
								__html: ipadDescription?.replace(/\n/g, '<br />'),
							}}
						></div>
					</div>
				)}
			</div>
			{/** desktop view area */}
			{!hideInDesktop && (
				<div className="invisible lg:visible">
					{!!desktopText && (
						<h2 className="w-full font-bold text-gray-700">
							<div
								dangerouslySetInnerHTML={{
									__html: desktopText?.replace(/\n/g, '<br />'),
								}}
							></div>
						</h2>
					)}
					{!!desktopDescription && (
						<div className="w-full pt-4 text-start text-gray-800">
							<div
								dangerouslySetInnerHTML={{
									__html: desktopDescription?.replace(/\n/g, '<br />'),
								}}
							></div>
						</div>
					)}
					{moreInfoText && moreInfoContent && (
						<div className={desktopText || desktopDescription ? 'pt-6' : ''}>
							{/* <Collapsible
								heading={
									<div className="text-bold text-xs">{moreInfoText}</div>
								}
							>
								<div className="text-bold text-xs py-4">{moreInfoContent}</div>
							</Collapsible> */}
						</div>
					)}
				</div>
			)}
		</div>
	);
};

export default PageInfo;
