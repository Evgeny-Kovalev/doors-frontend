import { ProductApiResponse } from '@/shared/types';
import AttributeList from '@/features/singleProduct/components/AttributeList';
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
} from '@/shared/ui/card';

type Props = {
	product: ProductApiResponse;
};
export default function ProductSummary({ product }: Props) {
	return (
		<Card>
			<CardHeader>
				<h1 className="text-2xl font-bold">{product.name}</h1>
				<CardDescription className="font-bold text-primary">
					Цена указана за комплект (полотно + коробка 2.5шт. + наличник 5шт.)
				</CardDescription>
			</CardHeader>
			<CardContent>
				<AttributeList variants={product.variants} />
			</CardContent>
			<CardFooter>
				Категории: ProfilDoors серия U Модерн, Двери межкомнатные, Экошпон
			</CardFooter>
		</Card>
	);
}
