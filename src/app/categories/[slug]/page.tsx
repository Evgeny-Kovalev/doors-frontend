import { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { openGraph } from '@/app/shared-metadata';
import {
	fetchCategories,
	fetchCategory,
	fetchCategoryHierarchy,
} from '@/entities/category';
import { fetchProducts } from '@/entities/product';
import { PageContainer, PageTitle, PaginationControls } from '@/shared/components';
import { PRODUCT_PER_PAGE } from '@/shared/constants';
import { Separator } from '@/shared/ui';
import { limitMetadataDescription } from '@/shared/utils';

import { CategoryList } from '@/entities/category';
import { ProductCardsGrid } from '@/entities/product';

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

export async function generateStaticParams() {
	if (process.env.NODE_ENV === 'development') return [];

	const categories = await fetchCategories();
	if (!categories) return [];
	return categories.map((category) => ({ slug: category.slug }));
}

export default async function Page(props: PageProps) {
	const searchParams = await props.searchParams;
	const params = await props.params;
	const category = await fetchCategory(params.slug);

	if (!category) return notFound();

	const childCategories = await fetchCategories({
		parentCategorySlug: category.slug,
	});

	const currentPage = Number(searchParams['page'] ?? '1');
	const limit = Number(searchParams['limit'] ?? PRODUCT_PER_PAGE);

	const productsRes = await fetchProducts({
		categorySlug: category.slug,
		page: currentPage,
		limit,
	});

	if (!productsRes) return notFound();

	const { data: products, meta } = productsRes;

	const categories = await fetchCategoryHierarchy(category.slug);

	const breadcrumbsItems = categories && [
		{
			label: 'Главная',
			href: '/',
		},
		...categories.map((category) => ({
			label: category.name,
			href: `/categories/${category.slug}`,
		})),
	];

	return (
		<PageContainer breadcrumbsItems={breadcrumbsItems}>
			<PageTitle>{category.name}</PageTitle>
			{childCategories && childCategories.length > 0 && (
				<>
					<CategoryList className="mb-5" categories={childCategories} />
					<Separator className="mb-5" />
				</>
			)}
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
				// !TODO
				<div>Здесь еще нет товаров</div>
			)}
		</PageContainer>
	);
}
