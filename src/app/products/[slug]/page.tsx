import { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { fetchProduct } from '@/shared/api';
import { limitMetadataDescription } from '@/shared/utils';
import { openGraph } from '@/app/shared-metadata';
import PageContainer from '@/shared/components/layout/PageContainer';

import { ProductGallery, ProductSummary, ProductContent } from '@/widgets/single-product';

type PageProps = {
	params: {
		slug: string;
	};
};

export async function generateMetadata({
	params: { slug },
}: PageProps): Promise<Metadata | null> {
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

export default async function Page({ params }: PageProps) {
	const product = await fetchProduct(params.slug);
	if (!product) return notFound();

	return (
		<PageContainer>
			<div className="grid grid-cols-2 gap-5">
				<div className="col-span-2 lg:col-span-1">
					<ProductGallery product={product} />
				</div>
				<div className="col-span-2 lg:col-span-1">
					<ProductSummary product={product} />
				</div>
				<div className="col-span-2">
					<ProductContent product={product} />
				</div>
			</div>
		</PageContainer>
	);
}
