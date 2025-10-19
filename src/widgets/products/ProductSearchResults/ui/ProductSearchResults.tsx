import { AlertDestructive, PaginationControls } from '@/shared/components';

import { fetchProducts } from '@/entities/product';
import { ProductCardsGrid } from '@/widgets/products';

interface ProductSearchResultsProps {
	q: string;
	currentPage: number;
	limit: number;
}

export const ProductSearchResults = async ({
	q,
	currentPage,
	limit,
}: ProductSearchResultsProps) => {
	const res = await fetchProducts({ q, limit, page: currentPage });

	if (!res) return <AlertDestructive>Не удалось загрузить товары</AlertDestructive>;

	const { data: products, meta } = res;

	return (
		<>
			{products.length > 0 ? (
				<>
					<ProductCardsGrid products={products} />
					{meta.pageCount > 1 && (
						<PaginationControls
							limit={limit}
							currentPage={currentPage}
							hasNextPage={meta.hasNextPage}
							hasPrevPage={meta.hasPreviousPage}
							totalPages={meta.pageCount}
						/>
					)}
				</>
			) : (
				<div>По запросу &quot;{q}&quot; ничего не найдено</div>
			)}
		</>
	);
};
