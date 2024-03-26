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

interface PaginationControlsProps {
	hasNextPage: boolean;
	hasPrevPage: boolean;
	totalPages: number;
	currentPage: number;
	limit: number;
}

export default function PaginationControls({
	hasNextPage,
	hasPrevPage,
	totalPages,
	currentPage,
	limit,
}: PaginationControlsProps) {
	const isSmallDevice = useMediaQuery('only screen and (max-width : 768px)');
	const isMediumDevice = useMediaQuery('only screen and (max-width : 1024px)');

	const { pages } = usePagination({
		currentPage,
		totalPages,
		siblings: isSmallDevice ? 1 : isMediumDevice ? 2 : 3,
	});

	return (
		<Pagination className="mt-5">
			<PaginationContent>
				<PaginationItem>
					<PaginationPrevious
						className={cn({ 'pointer-events-none': !hasPrevPage })}
						href={`?page=${currentPage - 1}&limit=${limit}`}
					/>
				</PaginationItem>
				{pages.map((p, i) => (
					<PaginationItem key={p}>
						<PaginationLink
							className={cn({ 'pointer-events-none': p === currentPage })}
							isActive={p === currentPage}
							href={`?page=${p}&limit=${limit}`}
						>
							{p}
						</PaginationLink>
					</PaginationItem>
				))}
				<PaginationItem>
					<PaginationNext
						className={cn({ 'pointer-events-none': !hasNextPage })}
						href={`?page=${currentPage + 1}&limit=${limit}`}
					/>
				</PaginationItem>
			</PaginationContent>
		</Pagination>
	);
}
