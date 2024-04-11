import CategoryList from '@/features/categories/components/CategoryList';
import PaginationControls from '@/features/products/components/PaginationControls';
import ProductCards from '@/features/products/components/ProductCards';
import { fetchCategory, fetchProducts } from '@/shared/api';
import BoxContainer from '@/shared/components/layout/BoxContainer';
import PageTitle from '@/shared/components/layout/PageTitle';
import { PRODUCT_PER_PAGE } from '@/shared/constants';
import { Separator } from '@/shared/ui/separator';
import { notFound } from 'next/navigation';

interface PageProps {
	params: {
		id: string;
	};
	searchParams: { [key: string]: string | string[] | undefined };
}

export default async function Page({ params, searchParams }: PageProps) {
	const category = await fetchCategory(params.id);

	if (!category) return notFound();

	const currentPage = Number(searchParams['page'] ?? '1');
	const limit = Number(searchParams['limit'] ?? PRODUCT_PER_PAGE);

	const productsRes = await fetchProducts(category.id, currentPage, limit);

	if (!productsRes) return notFound();

	const { data: products, meta } = productsRes;

	return (
		<BoxContainer>
			<PageTitle>{category.name}</PageTitle>
			{category.children.length > 0 && (
				<>
					<CategoryList className="mb-5" categories={category.children} />
					<Separator className="mb-5" />
				</>
			)}
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
				// !TODO
				<div>There are no products in this category yet</div>
			)}
		</BoxContainer>
	);
}
