import { ProductApiResponse } from '@/shared/types';
import { Card, CardHeader, CardContent, CardTitle } from '@/shared/ui/card';

type Props = {
	product: ProductApiResponse;
};
export default function ProductDetails({ product }: Props) {
	return (
		<Card className="mt-5">
			<CardHeader>
				<CardTitle>Product Details</CardTitle>
			</CardHeader>
			<CardContent>
				<div>ProductDetails</div>
			</CardContent>
		</Card>
	);
}
