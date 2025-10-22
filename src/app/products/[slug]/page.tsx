import { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { openGraph } from '@/app/shared-metadata';
import { fetchProduct, fetchProducts, fetchRelatedProducts } from '@/entities/product';
import { PageContainer } from '@/shared/components';
import { limitMetadataDescription } from '@/shared/utils';

import { ProductApiResponse } from '@/shared/types';
import { ProductContent, ProductGallery, ProductSummary } from '@/widgets/single-product';
import { fetchCategoryHierarchy } from '@/entities/category';
import { ProductCardsGrid } from '@/entities/product';
import { Box } from '@/shared/ui';

type PageProps = {
	params: Promise<{
		slug: string;
	}>;
};

export async function generateMetadata(props: PageProps): Promise<Metadata | null> {
	const params = await props.params;

	const { slug } = params;

	const product = await fetchProduct(slug);
	if (!product) return null;

	const description = product.category.description;

	return {
		title: {
			absolute: product.name + ' | Двери',
		},
		description: limitMetadataDescription(description),

		openGraph: {
			...openGraph,
			url: `${process.env.NEXT_PUBLIC_BASE_URL}/products/${product.slug}`,
			tags: [product.name, ...product.params.map((p) => p.key.label)],
		},
	};
}

export async function generateStaticParams() {
	if (process.env.NODE_ENV === 'development') return [];

	let page = 1;
	let hasNextPage = true;
	const products: ProductApiResponse[] = [];

	while (hasNextPage) {
		const pageData = await fetchProducts({ page });
		if (!pageData) continue;
		console.log(
			`page-${page}`,
			pageData.data.map((p) => p.slug),
		);
		products.push(...pageData.data);
		hasNextPage = pageData.meta.hasNextPage;
		page++;
	}

	return products.map((product) => ({ slug: product.slug }));
}

export default async function Page(props: PageProps) {
	const params = await props.params;
	const product = await fetchProduct(params.slug);
	if (!product) return notFound();

	const categories = await fetchCategoryHierarchy(product.category.slug);
	const relatedProducts = await fetchRelatedProducts({
		categorySlug: product.category.slug,
		limit: 1000,
	});

	const randomProducts = relatedProducts?.sort(() => Math.random() - 0.5).slice(0, 6);

	const breadcrumbsItems = categories && [
		{
			label: 'Главная',
			href: '/',
		},
		...categories.map((category) => ({
			label: category.name,
			href: `/categories/${category.slug}`,
		})),
		{
			label: product.name,
			href: `/products/${product.slug}`,
		},
	];

	return (
		<PageContainer className=" gap-5" withoutBox breadcrumbsItems={breadcrumbsItems}>
			<div className="mb-5 grid grid-cols-2 gap-5">
				<div className="col-span-2 lg:col-span-1">
					<ProductGallery product={product} />
				</div>
				<div className="col-span-2 lg:col-span-1">
					<ProductSummary product={product} categories={categories} />
				</div>
				<div className="col-span-2">
					<ProductContent product={product} />
				</div>
			</div>
			<Box>
				<h4 className="mb-5 text-2xl font-bold">Вам может понравиться</h4>
				{randomProducts && randomProducts.length > 0 && (
					<ProductCardsGrid onlyOneRow products={randomProducts} />
				)}
			</Box>
		</PageContainer>
	);
}
