import React from 'react';

export const Skeleton = ({ className = '' }: { className?: string }) => {
	return (
		<div className={`h-2 w-full animate-pulse ${className}`} data-testid="skeleton-test-id">
			<div className="h-full w-full rounded-full bg-gray-200"></div>
		</div>
	);
};
