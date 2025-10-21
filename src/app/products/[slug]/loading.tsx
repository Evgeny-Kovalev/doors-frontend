import { PageContainer } from '@/shared/components';
import { Skeleton } from '@/shared/ui';

export default function Loading() {
	return (
		<PageContainer withoutBox className="grid grid-cols-2 gap-5">
			<Skeleton className="col-span-2 h-[600px] lg:col-span-1" />
			<Skeleton className="col-span-2 h-[600px] lg:col-span-1" />
			<Skeleton className="col-span-2 h-[300px]" />
		</PageContainer>
	);
}
