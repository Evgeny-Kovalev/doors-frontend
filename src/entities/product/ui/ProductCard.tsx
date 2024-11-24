import Image from 'next/image';
import Link from 'next/link';

import { MAIN_CATEGORIES } from '@/shared/constants';
import { ProductApiResponse } from '@/shared/types';
import { Button } from '@/shared/ui/button';
import { Card, CardContent, CardFooter, CardTitle } from '@/shared/ui/card';
import { cn } from '@/shared/ui/utils';

import { getPriceLabel } from '../lib';

interface ProductCardProps extends React.HTMLAttributes<HTMLDivElement> {
	product: ProductApiResponse;
}

export const ProductCard = ({ product, className, ...props }: ProductCardProps) => {
	const priceLabel = getPriceLabel(product);

	return (
		<Link href={'/products/' + product.slug}>
			<Card className={cn('rounded-t-none', className)} {...props}>
				<CardContent className="relative px-0 pb-3">
					<Image
						src={product.imgUrl}
						className="h-auto w-full"
						sizes="100vw"
						width={600}
						height={1200}
						alt="Product image"
						placeholder="blur"
						blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mN8+vx1PQAIqAM4jZDFJQAAAABJRU5ErkJggg=="
						priority
					/>
				</CardContent>
				<CardFooter className="p-2 sm:p-2 sm:pt-0">
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
		</Link>
	);
};
