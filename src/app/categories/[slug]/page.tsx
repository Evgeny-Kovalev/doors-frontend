import { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { openGraph } from '@/app/shared-metadata';
import { fetchCategory, fetchProducts } from '@/shared/api';
import BoxContainer from '@/shared/components/layout/BoxContainer';
import PageTitle from '@/shared/components/layout/PageTitle';
import { PRODUCT_PER_PAGE } from '@/shared/constants';
import { Separator } from '@/shared/ui/separator';
import { limitMetadataDescription } from '@/shared/utils';

import { PaginationControls } from '@/shared/components/PaginationControls';
import { CategoryList } from '@/widgets/categories';
import { ProductCards } from '@/widgets/products/ProductCards';

interface PageProps {
	params: Promise<{
		slug: string;
	}>;
	searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export async function generateMetadata(props: PageProps): Promise<Metadata | null> {
	const params = await props.params;

	const { slug } = params;

	const category = await fetchCategory(slug);
	if (!category) return null;

	const { description } = category;

	return {
		title: category.name,
		description: limitMetadataDescription(description),

		openGraph: {
			...openGraph,
			url: `${process.env.NEXT_PUBLIC_BASE_URL}/categories/${category.slug}`,
			tags: [category.name],
		},
	};
}
//TODO: add generateStaticParams with children categories

// export async function generateStaticParams() {
// 	const categories = await fetchCategories();
// 	if (!categories) return [];
// 	return categories.map((category) => ({ slug: category.slug }));
// }

export default async function Page(props: PageProps) {
	const searchParams = await props.searchParams;
	const params = await props.params;
	const category = await fetchCategory(params.slug);

	if (!category) return notFound();

	const currentPage = Number(searchParams['page'] ?? '1');
	const limit = Number(searchParams['limit'] ?? PRODUCT_PER_PAGE);

	const productsRes = await fetchProducts({
		categorySlug: category.slug,
		page: currentPage,
		limit,
	});

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
				<div>Здесь еще нет товаров</div>
			)}
		</BoxContainer>
	);
}
