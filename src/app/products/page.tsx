import { getAttributesWithValues } from '@/features/product/helpers';
import { ProductApiResponse } from '@/shared/types';
import Link from 'next/link';

const fetchProducts = async (): Promise<ProductApiResponse[]> => {
	const res = await fetch('http://localhost:4000/api/v1/products');
	return await res.json();
};

export default async function Page() {
	const products: ProductApiResponse[] = await fetchProducts();

	return (
		<div className="container">
			{products.map((product) => {
				const attrs = getAttributesWithValues(product);
				return (
					<div key={product.id}>
						<h1>
							<Link href={`/products/${product.id}`}>{product.name}</Link>
						</h1>
						<ul className="ml-5">
							{Object.values(attrs).map((a) => {
								return (
									<div key={a.name}>
										{a.name} - {a.values.join(', ')}
									</div>
								);
							})}
						</ul>
					</div>
				);
			})}
		</div>
	);
}
