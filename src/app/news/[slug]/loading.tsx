import { PageContainer } from '@/shared/components';
import { Skeleton } from '@/shared/ui';

export default function Loading() {
	return (
		<PageContainer withoutBox className="grid gap-3">
			<Skeleton className="h-[40px] lg:w-1/3" />
			<Skeleton className="h-[400px]" />
			<div className="grid gap-2">
				<Skeleton className="h-[30px]" />
				<Skeleton className="h-[30px] w-3/4" />
				<Skeleton className="h-[30px] w-1/2" />
				<Skeleton className="h-[30px] w-1/3" />
			</div>
		</PageContainer>
	);
}
