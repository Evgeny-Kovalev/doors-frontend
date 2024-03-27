import { getPriceLabel } from '@/features/singleProduct/helpers/price';
import { MAIN_CATEGORIES } from '@/shared/constants';
import { ProductApiResponse } from '@/shared/types';
import { Button } from '@/shared/ui/button';
import { Card, CardContent, CardFooter, CardTitle } from '@/shared/ui/card';
import { cn } from '@/shared/ui/utils';
import Image from 'next/image';

interface ProductCardProps extends React.HTMLAttributes<HTMLDivElement> {
	product: ProductApiResponse;
}

export default function ProductCard({ product, className, ...props }: ProductCardProps) {
	const priceLabel = getPriceLabel(product);

	return (
		<>
			<Card className={cn(className)} {...props}>
				<CardContent className="relative px-0 pb-3">
					<Image
						src={product.imgUrl}
						className="h-auto w-full"
						sizes="100vw"
						width={0}
						height={0}
						alt="Product image"
						priority
					/>
				</CardContent>
				<CardFooter>
					<div className="mx-auto w-full text-center">
						<CardTitle className="mb-2 text-sm hover:text-primary-accent sm:text-base">
							{product.name}
						</CardTitle>
						<div className="mb-2 text-sm font-bold text-primary-accent sm:text-base">
							{priceLabel}
						</div>
						{product.category.categoryType === MAIN_CATEGORIES.interior.type && (
							<div className="mb-3 text-sm font-bold sm:text-base">
								(за комплект)
							</div>
						)}
						<Button className="w-full text-sm sm:text-base" size={'sm'}>
							Подробнее
						</Button>
					</div>
				</CardFooter>
			</Card>
		</>
	);
}
