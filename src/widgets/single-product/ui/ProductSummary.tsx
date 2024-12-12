import Link from 'next/link';
import { ProductApiResponse } from '@/shared/types';
import { Card, CardContent, CardFooter, CardHeader } from '@/shared/ui/card';
import { AttributeList } from './AttributeList';
import { PriceDetails } from './PriceDetails';

type Props = {
	product: ProductApiResponse;
};

export const ProductSummary = ({ product }: Props) => {
	return (
		<Card>
			<CardHeader>
				<h1 className="text-2xl  sm:text-3xl">{product.name}</h1>
			</CardHeader>
			<CardContent>
				<AttributeList variants={product.variants} />
				<PriceDetails product={product} />
			</CardContent>
			<CardFooter className="whitespace-break-spaces">
				<span className="font-bold">Категория: </span>
				<Link
					className="hover:text-primary-accent"
					href={`/categories/${product.category.slug}`}
				>
					{product.category.name}
				</Link>
			</CardFooter>
		</Card>
	);
};
