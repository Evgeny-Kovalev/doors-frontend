interface UsePaginationProps {
	currentPage: number;
	totalPages: number;
	siblings?: number;
}

export const usePagination = ({
	currentPage,
	totalPages,
	siblings = 2,
}: UsePaginationProps) => {
	const getPagesToShow = () => {
		const pagesToShow = siblings * 2 + 1;

		let startPage = currentPage - siblings;
		let endPage = currentPage + siblings;

		if (totalPages < pagesToShow) {
			startPage = 1;
			endPage = totalPages;
		} else if (currentPage <= pagesToShow - siblings) {
			startPage = 1;
			endPage = pagesToShow;
		} else if (currentPage >= totalPages - siblings) {
			startPage = totalPages - (pagesToShow - 1);
			endPage = totalPages;
		}

		return Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);
	};

	return {
		pages: getPagesToShow(),
	};
};
