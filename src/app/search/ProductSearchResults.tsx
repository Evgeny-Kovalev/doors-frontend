import PaginationControls from '@/features/products/components/PaginationControls';
import ProductCards from '@/features/products/components/ProductCards';
import { fetchProducts } from '@/shared/api';

interface ProductSearchResultsProps {
	q: string;
	currentPage: number;
	limit: number;
}

export default async function ProductSearchResults({
	q,
	currentPage,
	limit,
}: ProductSearchResultsProps) {
	const res = await fetchProducts({ q, limit, page: currentPage });

	// !TODO
	if (!res) return <div>Erorr</div>;

	const { data: products, meta } = res;

	return (
		<>
			{products.length > 0 ? (
				<>
					<ProductCards products={products} />
					<PaginationControls
						limit={limit}
						currentPage={currentPage}
						hasNextPage={meta.hasNextPage}
						hasPrevPage={meta.hasPreviousPage}
						totalPages={meta.pageCount}
					/>
				</>
			) : (
				<div>По запросу &quot;{q}&quot; ничего не найдено</div>
			)}
		</>
	);
}
