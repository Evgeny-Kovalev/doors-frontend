'use client';

import {
	Pagination,
	PaginationContent,
	PaginationItem,
	PaginationPrevious,
	PaginationLink,
	PaginationNext,
} from '@/shared/ui/pagination';
import { useMediaQuery } from '@/shared/hooks/useMediaQuery';
import { usePagination } from '@/shared/hooks/usePagination';
import { cn } from '@/shared/ui/utils';
import { usePathname, useSearchParams } from 'next/navigation';

interface PaginationControlsProps {
	hasNextPage: boolean;
	hasPrevPage: boolean;
	totalPages: number;
	currentPage: number;
	limit: number;
}

export const PaginationControls = ({
	hasNextPage,
	hasPrevPage,
	totalPages,
	currentPage,
	limit,
}: PaginationControlsProps) => {
	const isSmallDevice = useMediaQuery('only screen and (max-width : 768px)');
	const isMediumDevice = useMediaQuery('only screen and (max-width : 1024px)');

	const { pages } = usePagination({
		currentPage,
		totalPages,
		siblings: isSmallDevice ? 1 : isMediumDevice ? 2 : 3,
	});

	const pathname = usePathname();
	const searchParams = useSearchParams();

	const createPageURL = (pageNumber: number) => {
		const params = new URLSearchParams(searchParams.toString());
		params.set('page', pageNumber.toString());
		params.set('limit', limit.toString());
		return `${pathname}?${params.toString()}`;
	};

	return (
		<Pagination className="mt-5">
			<PaginationContent>
				<PaginationItem>
					<PaginationPrevious
						className={cn({ 'pointer-events-none': !hasPrevPage })}
						href={createPageURL(currentPage - 1)}
					/>
				</PaginationItem>
				{pages.map((p, i) => (
					<PaginationItem key={p}>
						<PaginationLink
							className={cn({ 'pointer-events-none': p === currentPage })}
							isActive={p === currentPage}
							href={createPageURL(p)}
						>
							{p}
						</PaginationLink>
					</PaginationItem>
				))}
				<PaginationItem>
					<PaginationNext
						className={cn({ 'pointer-events-none': !hasNextPage })}
						href={createPageURL(currentPage + 1)}
					/>
				</PaginationItem>
			</PaginationContent>
		</Pagination>
	);
};
