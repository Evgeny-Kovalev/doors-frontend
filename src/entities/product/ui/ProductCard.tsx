import Image from 'next/image';
import Link from 'next/link';

import { ProductApiResponse, TagApiResponse, TagKeys } from '@/shared/types';
import { Button, cn, Card, CardContent, CardFooter, CardTitle, Badge } from '@/shared/ui';

import { getPriceText } from '../lib';

interface ProductCardProps extends React.HTMLAttributes<HTMLDivElement> {
	product: ProductApiResponse;
}

export const ProductCard = ({ product, className, ...props }: ProductCardProps) => {
	const priceText = getPriceText(product);

	const tags = product.variants.reduce<TagApiResponse[]>((acc, v) => {
		acc.push(...v.tags);
		return acc;
	}, []);

	return (
		<Link href={'/products/' + product.slug}>
			<Card className={cn('rounded-t-none', className)} {...props}>
				<CardContent className="relative p-0 ">
					<div className="absolute left-1 top-2 flex flex-col gap-1">
						{tags.map((t) => (
							<Badge
								key={t.id}
								className={cn('w-fit', {
									'bg-red-500': t.key === TagKeys.bestseller,
									'bg-green-500 ': t.key === TagKeys.new,
									'bg-amber-500': t.key === TagKeys.sample,
								})}
							>
								{t.label}
							</Badge>
						))}
					</div>
					<Image
						src={product.imgUrl}
						className="h-auto w-full"
						sizes="100vw"
						width={600}
						height={product.category.categoryType === 'interiorDoors' ? 1200 : 600}
						alt="Product image"
						placeholder="blur"
						blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mN8+vx1PQAIqAM4jZDFJQAAAABJRU5ErkJggg=="
						priority
					/>
				</CardContent>
				<CardFooter className="p-2 ">
					<div className="mx-auto flex w-full flex-col items-center text-center">
						<CardTitle className="text-sm hover:text-primary-accent sm:text-base">
							{product.name}
						</CardTitle>
						<div className="text-sm font-bold text-primary-accent sm:text-base">
							{priceText}
						</div>
						{product.category.categoryType === 'interiorDoors' && (
							<div className="text-sm font-bold sm:text-base">
								{product.productType === 'doorOnlySample'
									? 'полотно'
									: 'за комплект'}
							</div>
						)}
						<Button className="mt-2 w-full" size="sm">
							Подробнее
						</Button>
					</div>
				</CardFooter>
			</Card>
		</Link>
	);
};
