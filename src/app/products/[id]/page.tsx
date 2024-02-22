// 'use client';

import { ProductApiResponse } from '@/shared/types';
import { PRODUCT, VARIANTS } from '../../../features/product/mock';
import ProductSummary from '@/features/product/components/ProductSummary';
import ProductGallery from '@/features/product/components/ProductGallery';
import ProductContent from '@/features/product/components/ProductContent';

const fetchProduct = async (id: string): Promise<ProductApiResponse> => {
	const res = await fetch(`http://localhost:4000/api/v1/products/${id}`);
	const product: ProductApiResponse = await res.json();
	product.variants = VARIANTS;
	return product;
};

type PageProps = {
	params: {
		id: string;
	};
	//   searchParams?: any;
};

export default function Page({ params }: PageProps) {
	// const product = await fetchProduct(params.id);

	const product = PRODUCT;

	// const [product, setProduct] = useState<ProductApiResponse>();

	// useEffect(() => {
	// 	const f = async () => {
	// 		const p = await fetchProduct(params.id);
	// 		setProduct(p);
	// 		setFilteredVariants(p.variants);
	// 	};
	// 	f();
	// }, [params.id]);

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
				<ProductContent product={PRODUCT} />
			</div>
			{/* <pre>product: {JSON.stringify(product, null, 2)}</pre> */}
		</div>
	);
}
