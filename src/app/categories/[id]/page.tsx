import CategoryList from '@/features/categories/components/CategoryList';
import PaginationControls from '@/features/products/components/PaginationControls';
import ProductCards from '@/features/products/components/ProductCards';
import BoxContainer from '@/shared/components/layout/BoxContainer';
import PageTitle from '@/shared/components/layout/PageTitle';
import { PRODUCT_PER_PAGE } from '@/shared/constants';
import { CategoryApiResponse, Paginated, ProductApiResponse } from '@/shared/types';
import { Separator } from '@/shared/ui/separator';
import { TreeNode, arrayToTree, findNodeById } from '@/shared/utils';
import { notFound } from 'next/navigation';

const fetchCategories = async (): Promise<CategoryApiResponse[]> => {
	const res = await fetch(`${process.env.API_URL}/categories`);
	const categories: CategoryApiResponse[] = await res.json();
	return categories;
};

const fetchProducts = async (
	categoryId: number,
	page?: number,
	limit?: number,
): Promise<Paginated<ProductApiResponse> | null> => {
	const params = new URLSearchParams();

	params.set('categoryId', categoryId.toString());
	page && params.set('page', page.toString());
	limit && params.set('limit', limit.toString());

	const res = await fetch(`${process.env.API_URL}/products?` + params);
	if (!res.ok) return null;
	const products: Paginated<ProductApiResponse> = await res.json();
	return products;
};

interface PageProps {
	params: {
		id: string;
	};
	searchParams: { [key: string]: string | string[] | undefined };
}

export default async function Page({ params, searchParams }: PageProps) {
	const categories = await fetchCategories();
	const categoriesTree: TreeNode<CategoryApiResponse>[] =
		arrayToTree<CategoryApiResponse>(categories, null, 'parentCategoryId');

	const category = findNodeById<CategoryApiResponse, number>(categoriesTree, +params.id);
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
				<ProductCards products={products} />
			) : (
				// !TODO
				<div>There are no products in this category yet</div>
			)}
			<PaginationControls
				limit={limit}
				currentPage={currentPage}
				hasNextPage={meta.hasNextPage}
				hasPrevPage={meta.hasPreviousPage}
				totalPages={meta.pageCount}
			/>
		</BoxContainer>
	);
}
