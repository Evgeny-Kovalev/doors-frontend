import { Skeleton } from '@/shared/ui/skeleton';

export const ProductsCardsSkeleton = () => {
	return (
		<div className="grid auto-rows-[0] grid-cols-2 grid-rows-1 gap-x-5 overflow-hidden sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
			{[...Array(6)].map((_, i) => (
				<Skeleton key={i} className="h-[400px] w-full rounded-xl md:h-[500px]" />
			))}
		</div>
	);
};
