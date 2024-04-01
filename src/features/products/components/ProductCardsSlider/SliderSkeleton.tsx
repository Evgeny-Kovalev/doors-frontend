import { Skeleton } from '@/shared/ui/skeleton';

export const SliderSkeleton = () => {
	return (
		<div className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
			{[...Array(6)].map((_, i) => (
				<Skeleton key={i} className="h-[500px] w-full rounded-xl" />
			))}
		</div>
	);
};
