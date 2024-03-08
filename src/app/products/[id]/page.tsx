import { ProductApiResponse } from '@/shared/types';
import ProductSummary from '@/features/singleProduct/components/ProductSummary';
import ProductGallery from '@/features/singleProduct/components/ProductGallery';
import ProductContent from '@/features/singleProduct/components/ProductContent';

const fetchProduct = async (id: string): Promise<ProductApiResponse> => {
	const res = await fetch(`${process.env.API_URL}/products/${id}`);
	const product: ProductApiResponse = await res.json();
	return product;
};

type PageProps = {
	params: {
		id: string;
	};
	// searchParams?: any;
};

export default async function Page({ params }: PageProps) {
	const product = await fetchProduct(params.id);

	return (
		<div className="container py-5">
			<div className="flex gap-5">
				<div className="w-1/2">
					<ProductGallery product={product} />
				</div>
				<div className="w-1/2">
					<ProductSummary product={product} />
				</div>
			</div>
			<div>
				<ProductContent product={product} />
			</div>
		</div>
	);
}
