import { ProductCard } from '@/entities/product';
import { ProductApiResponse } from '@/shared/types';
import { cn } from '@/shared/ui';

type ProductCardsGridProps = {
	products: ProductApiResponse[];
	className?: string;
};

export const ProductCardsGrid = ({ products, className = '' }: ProductCardsGridProps) => {
	return (
		<ul
			className={cn(
				'grid grid-cols-2 gap-5 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6',
				className,
			)}
		>
			{products.map((product) => (
				<li
					key={product.id}
					className="transition-transform duration-500 hover:-translate-y-2"
				>
					<ProductCard className="hover:shadow-md" product={product} />
				</li>
			))}
		</ul>
	);
};
