import { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { openGraph } from '@/app/shared-metadata';
import { fetchProduct, fetchProducts } from '@/entities/product';
import PageContainer from '@/shared/components/layout/PageContainer';
import { limitMetadataDescription } from '@/shared/utils';

import { ProductApiResponse } from '@/shared/types';
import { ProductContent, ProductGallery, ProductSummary } from '@/widgets/single-product';
import { fetchCategoryHierarchy } from '@/entities/category';
import {
	Box,
	Breadcrumb,
	BreadcrumbList,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbSeparator,
	BreadcrumbPage,
} from '@/shared/ui';
import Link from 'next/link';
import { Fragment } from 'react';

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

	return (
		<PageContainer>
			{categories && (
				<Box className="mb-3 w-fit px-5 py-2">
					<Breadcrumb>
						<BreadcrumbList>
							<BreadcrumbItem>
								<BreadcrumbLink asChild>
									<Link href="/">Главная</Link>
								</BreadcrumbLink>
							</BreadcrumbItem>
							<BreadcrumbSeparator />
							{categories.map((category, index) => (
								<Fragment key={category.id}>
									<BreadcrumbItem>
										{index === categories.length - 1 ? (
											<BreadcrumbPage>{category.name}</BreadcrumbPage>
										) : (
											<BreadcrumbLink asChild>
												<Link href={`/categories/${category.slug}`}>
													{category.name}
												</Link>
											</BreadcrumbLink>
										)}
									</BreadcrumbItem>
									{index < categories.length - 1 && <BreadcrumbSeparator />}
								</Fragment>
							))}
						</BreadcrumbList>
					</Breadcrumb>
				</Box>
			)}
			<div className="grid grid-cols-2 gap-5">
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
		</PageContainer>
	);
}
