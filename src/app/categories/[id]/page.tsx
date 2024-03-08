import CategoryList from '@/features/categories/components/CategoryList';
import ProductCards from '@/features/products/components/ProductCards';
import PageContainer from '@/shared/components/layout/PageContainer';
import PageTitle from '@/shared/components/layout/PageTitle';
import { CategoryApiResponse, ProductApiResponse } from '@/shared/types';
import { Separator } from '@/shared/ui/separator';
import { TreeNode, arrayToTree, findNodeById } from '@/shared/utils';
import { notFound } from 'next/navigation';

const fetchCategories = async (): Promise<CategoryApiResponse[]> => {
	const res = await fetch(`${process.env.API_URL}/categories`);
	const categories: CategoryApiResponse[] = await res.json();
	return categories;
};

const fetchProducts = async (categoryId: number): Promise<ProductApiResponse[]> => {
	const res = await fetch(`${process.env.API_URL}/products?categoryId=${categoryId}`);
	const products: ProductApiResponse[] = await res.json();
	return products;
};

interface PageProps {
	params: {
		id: string;
	};
}

export default async function Page({ params }: PageProps) {
	const categories = await fetchCategories();
	const categoriesTree: TreeNode<CategoryApiResponse>[] =
		arrayToTree<CategoryApiResponse>(categories, null, 'parentCategoryId');

	const category = findNodeById<CategoryApiResponse, number>(categoriesTree, +params.id);
	if (!category) return notFound();

	const products = await fetchProducts(category.id);

	return (
		<PageContainer>
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
		</PageContainer>
	);
}
