import PageContainer from '@/shared/components/layout/PageContainer';
import { Skeleton } from '@/shared/ui/skeleton';

export default function Loading() {
	return (
		<PageContainer className="grid grid-cols-2 gap-5">
			<Skeleton className="col-span-2 h-[600px] lg:col-span-1" />
			<Skeleton className="col-span-2 h-[600px] lg:col-span-1" />
			<Skeleton className="col-span-2 h-[300px]" />
		</PageContainer>
	);
}
