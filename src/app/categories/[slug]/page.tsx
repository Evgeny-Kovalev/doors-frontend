import CategoryList from '@/features/categories/components/CategoryList';
import PaginationControls from '@/features/products/components/PaginationControls';
import ProductCards from '@/features/products/components/ProductCards';
import { fetchCategory, fetchProducts } from '@/shared/api';
import BoxContainer from '@/shared/components/layout/BoxContainer';
import PageTitle from '@/shared/components/layout/PageTitle';
import { PRODUCT_PER_PAGE } from '@/shared/constants';
import { Separator } from '@/shared/ui/separator';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { limitMetadataDescription } from '@/shared/utils';

interface PageProps {
	params: {
		slug: string;
	};
	searchParams: { [key: string]: string | string[] | undefined };
}

export async function generateMetadata({
	params: { slug },
}: PageProps): Promise<Metadata | null> {
	const category = await fetchCategory(slug);
	if (!category) return null;

	const { description } = category;

	return {
		title: category.name,
		description: limitMetadataDescription(description),

		openGraph: {
			url: `${process.env.NEXT_PUBLIC_BASE_URL}/categories/${category.slug}`,
			tags: [category.name],
		},
	};
}

export default async function Page({ params, searchParams }: PageProps) {
	console.log(params.slug, 123);

	const category = await fetchCategory(params.slug);

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
