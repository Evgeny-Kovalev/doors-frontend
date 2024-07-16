import { ProductCard } from '@/entities/product';
import { ProductApiResponse } from '@/shared/types';

interface ProductListProps {
	products: ProductApiResponse[];
}

export const ProductCards = ({ products }: ProductListProps) => {
	return (
		<ul className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
			{products.map((product) => {
				return (
					<li
						key={product.id}
						className="transition-transform duration-500 hover:-translate-y-2"
					>
						<ProductCard className="hover:shadow-md" product={product} />
					</li>
				);
			})}
		</ul>
	);
};
