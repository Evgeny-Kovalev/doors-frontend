import { ProductApiResponse } from '@/shared/types';
import ProductSummary from '@/features/singleProduct/components/ProductSummary';
import ProductGallery from '@/features/singleProduct/components/ProductGallery/ProductGallery';
import ProductContent from '@/features/singleProduct/components/ProductContent';
import PageContainer from '@/shared/components/layout/PageContainer';
import { notFound } from 'next/navigation';
import { fetchProduct } from '@/shared/api';

type PageProps = {
	params: {
		id: string;
	};
};

export default async function Page({ params }: PageProps) {
	const product = await fetchProduct(params.id);
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
