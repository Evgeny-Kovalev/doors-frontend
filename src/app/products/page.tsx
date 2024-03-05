import ProductCards from '@/features/products/components/ProductCards';
import { ProductApiResponse } from '@/shared/types';

const fetchProducts = async (): Promise<ProductApiResponse[]> => {
	const res = await fetch(`${process.env.API_URL}/products`);
	return await res.json();
};

export default async function Page() {
	const products: ProductApiResponse[] = await fetchProducts();

	return (
		<div className="container">
			<div className="py-5">
				<ProductCards products={products} />
			</div>
		</div>
	);
}
