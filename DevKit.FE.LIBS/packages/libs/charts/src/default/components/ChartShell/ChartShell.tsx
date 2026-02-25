import clsx from 'clsx';
import { ReactNode } from 'react';
import { Card } from '@devkit/web';

type CardSidebarProps = {
	children: ReactNode;
	sidebarClassName?: string;
	position?: 'start' | 'end';
};
type CardHeaderFooterProps = {
	className?:string;
	children: ReactNode;

}
type ChartShellProps = {
	header?: React.ReactNode;
	sidebar?: React.ReactNode;
	sidebarPosition?: 'start' | 'end';
	footer?: React.ReactNode;
	children: React.ReactNode;
	className?: string;
	sidebarClassName?: string;
};

function CardHeader({ children, className = '' }: CardHeaderFooterProps) {
	return <div className={`mb-6 ${className}`}>{children}</div>;
}

function CardSidebar({ children, sidebarClassName = '', position = 'start' }: CardSidebarProps) {
	return <div className={clsx('w-64 ml-6', position === 'end' && 'order-last', sidebarClassName)}>{children}</div>;
}

function CardFooter({ children, className = '' }: CardHeaderFooterProps) {
	return <div className={`mt-6 ${className}`}>{children}</div>;
}

export function ChartShell({
	header,
	sidebar,
	footer,
	children,
	sidebarPosition = 'start',
	className,
    sidebarClassName
}: ChartShellProps) {
	return (
		<Card className={className}>
			{header && <CardHeader>{header}</CardHeader>}
			<div className="flex">
				{sidebar && <CardSidebar position={sidebarPosition} sidebarClassName={sidebarClassName}>{sidebar}</CardSidebar>}
				{children}
			</div>

			{footer && <CardFooter>{footer}</CardFooter>}
		</Card>
	);
}
