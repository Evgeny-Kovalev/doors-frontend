import { ProductApiResponse } from '@/shared/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui/card';

type Props = {
	product: ProductApiResponse;
};
export default function ProductDescription({ product }: Props) {
	return (
		<Card className="border-none px-0">
			<CardHeader className="px-0">
				<CardTitle>Описание</CardTitle>
			</CardHeader>
			<CardContent className="px-0">
				<p>{product.description}</p>
			</CardContent>
		</Card>
	);
}
