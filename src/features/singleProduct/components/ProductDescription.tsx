import { ProductApiResponse } from '@/shared/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui/card';

type Props = {
	product: ProductApiResponse;
};
export default function ProductDescription({ product }: Props) {
	return (
		<Card className="mt-5">
			<CardHeader>
				<CardTitle>Product Description</CardTitle>
			</CardHeader>
			<CardContent>
				<p>{product.description}</p>
			</CardContent>
		</Card>
	);
}
