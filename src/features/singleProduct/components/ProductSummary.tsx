import { ProductApiResponse } from '@/shared/types';
import AttributeList from '@/features/singleProduct/components/AttributeList';
import { Card, CardContent, CardFooter, CardHeader } from '@/shared/ui/card';
import { MAIN_CATEGORIES } from '@/shared/constants';
import { cn } from '@/shared/ui/utils';
import { PriceDetails } from './PriceDetails';

type Props = {
	product: ProductApiResponse;
};
export default function ProductSummary({ product }: Props) {
	const isInteriorType = product.category.categoryType === MAIN_CATEGORIES.interior.type;

	const priceLabel = isInteriorType ? `Цена за\xa0комплект` : 'Цена';

	return (
		<Card>
			<CardHeader>
				<h1 className="text-2xl  sm:text-3xl">{product.name}</h1>
			</CardHeader>
			<CardContent>
				<AttributeList variants={product.variants} />
				<div
					className={cn('mt-5 flex flex-col gap-5 rounded-lg border p-5', {
						'w-full md:w-1/2': !isInteriorType,
					})}
				>
					<div className="flex items-end">
						<div className="mr-3 text-foreground">{priceLabel}:</div>
						<div className="text-3xl font-bold leading-none">352 руб</div>
					</div>
					{isInteriorType && <PriceDetails />}
				</div>
			</CardContent>
			<CardFooter>
				Категории: ProfilDoors серия U Модерн, Двери межкомнатные, Экошпон
			</CardFooter>
		</Card>
	);
}
