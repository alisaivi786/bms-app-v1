import React from 'react';
import { ArrowLeftIcon, ArrowRightIcon } from '@devkit/icons/web';
import { ILink } from '@devkit/shared-types';
import { useWebUIConfigOptions } from '../../layouts/ThemeProvider/theme-context';

export interface IBreadCrumb {
	/** List of links that help a user visualize a page's location within the hierarchical structure of a website */
	links: ILink[];
}

const BreadCrumb = ({ links }: IBreadCrumb) => {
	const linksLength = links.length;
	const {
		renderLink: Link = ({ href, title, onClick, children, className }) => (
			<a href={href ?? '#'} onClick={onClick} className={className}>
				{title ?? children}
			</a>
		),
		isRtlLocale,
	} = useWebUIConfigOptions();

	return (
		<ul className="flex flex-wrap items-center">
			{links?.map((el, index) => {
				const isLastLink = index === linksLength - 1;
				const notClickable = el.isDisabled || isLastLink;

				return (
					<li className="flex items-center" key={index}>
						{notClickable ? (
							<span
								className="flex items-center nj-crumb-font-size
					     font-normal capitalize text-gray-700"
							>
								<div>{el.title ?? el.children}</div>
							</span>
						) : (
							<span className="flex items-center nj-crumb-font-size font-normal capitalize nj-text-brand cursor-pointer">
								<Link {...el} />
							</span>
						)}

						{!isLastLink && (
							<span className="mx-1.5 text-caption2 text-gray-700">
								{isRtlLocale ? (
									<ArrowLeftIcon data-testid="arrow-left-icon" />
								) : (
									<ArrowRightIcon data-testid="arrow-right-icon" />
								)}
							</span>
						)}
					</li>
				);
			})}
		</ul>
	);
};

export default BreadCrumb;
