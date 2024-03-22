import { ProductApiResponse } from '@/shared/types';
import { Card, CardHeader, CardContent, CardTitle } from '@/shared/ui/card';
import ProductParamsTable from './ProductParamsTable';

type Props = {
	product: ProductApiResponse;
};

export default function ProductDetails({ product }: Props) {
	return (
		<Card className="border-none px-0">
			<CardHeader className="px-0">
				<CardTitle>Характеристики</CardTitle>
			</CardHeader>
			<CardContent className="px-0">
				<div className="rounded-lg border xl:w-2/3">
					<ProductParamsTable params={product.params} />
				</div>
			</CardContent>
		</Card>
	);
}
