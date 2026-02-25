import { Skeleton } from '../../Skeleton';

const DropdownSkeleton = ({ loadingRef }: { loadingRef: React.RefObject<HTMLDivElement> }) => {
	return (
		<div className="px-4 py-4" ref={loadingRef}>
			<Skeleton className="h-3 w-full" />
		</div>
	);
};

export default DropdownSkeleton;
