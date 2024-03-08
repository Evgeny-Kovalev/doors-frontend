import { ProductApiResponse } from '@/shared/types';
import ProductCard from './ProductCard';
import Link from 'next/link';

interface ProductListProps {
	products: ProductApiResponse[];
}

export default function ProductCards({ products }: ProductListProps) {
	return (
		<ul className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
			{products.map((product) => {
				return (
					<li
						key={product.id}
						className="transition-transform duration-500 hover:-translate-y-2"
					>
						<Link href={'/products/' + product.id}>
							<ProductCard className="hover:shadow-md" product={product} />
						</Link>
					</li>
				);
			})}
		</ul>
	);
}
