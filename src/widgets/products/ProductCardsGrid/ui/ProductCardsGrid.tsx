import { ProductCard } from '@/entities/product';
import { ProductApiResponse } from '@/shared/types';
import styles from './ProductCardsGrid.module.css';

type ProductCardsGridProps = {
	products: ProductApiResponse[];
	onlyOneRow?: boolean;
	className?: string;
};

export const ProductCardsGrid = ({
	products,
	onlyOneRow = false,
	className = '',
}: ProductCardsGridProps) => {
	const baseGrid =
		'grid grid-cols-2 gap-5 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6';
	const oneRowClass = onlyOneRow ? styles.oneRowGrid : '';

	return (
		<ul className={`${baseGrid} ${oneRowClass} ${className}`.trim()}>
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
