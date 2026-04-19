import Image from 'next/image';
import Link from 'next/link';

import { ProductApiResponse, TagApiResponse, TagKeys } from '@/shared/types';
import { Button, cn, Card, CardContent, CardFooter, CardTitle, Badge } from '@/shared/ui';

import { FavoriteToggleButton } from '@/features/favorites';

import { getPriceText } from '../lib';
import { ProductBadge } from './ProductBadge';
import { isCredit4ByCategorySlug } from '@/entities/category';

interface ProductCardProps extends React.HTMLAttributes<HTMLDivElement> {
	product: ProductApiResponse;
}

export const ProductCard = ({ product, className, ...props }: ProductCardProps) => {
	const priceText = getPriceText(product);

	const tags = product.variants.reduce<TagApiResponse[]>((acc, v) => {
		acc.push(...v.tags);
		return acc;
	}, []);

	const isCredit4 = isCredit4ByCategorySlug(product.category.slug);

	return (
		<div className="relative">
			<FavoriteToggleButton
				className="absolute top-2 right-2 z-10"
				product={product}
			/>
			<Card className={cn('relative rounded-t-none', className)} {...props}>
				<Link
					href={'/products/' + product.slug}
					aria-label={`Подробнее о товаре ${product.name}`}
					className="absolute inset-0 z-10"
				/>
				<CardContent className="relative p-0">
					{isCredit4 && (
						<ProductBadge className="absolute bottom-1.5 left-1.5 z-20" size="sm" />
					)}
					<div className="absolute top-2 left-1 flex flex-col gap-1">
						{tags.map((t) => (
							<Badge
								key={t.id}
								className={cn('w-fit', {
									'bg-red-500 hover:bg-red-500': t.key === TagKeys.bestseller,
									'bg-green-500 hover:bg-green-500': t.key === TagKeys.new,
									'bg-amber-500 hover:bg-amber-500': t.key === TagKeys.sample,
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
						width={product.category.categoryType === 'interiorDoors' ? 250 : 300}
						height={product.category.categoryType === 'interiorDoors' ? 550 : 350}
						alt="Product image"
						placeholder="blur"
						blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mN8+vx1PQAIqAM4jZDFJQAAAABJRU5ErkJggg=="
						priority
					/>
				</CardContent>
				<CardFooter className="p-2">
					<div className="mx-auto flex w-full flex-col items-center text-center">
						<CardTitle className="hover:text-primary-accent text-sm sm:text-base">
							{product.name}
						</CardTitle>
						<div className="text-primary-accent text-sm font-bold sm:text-base">
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
		</div>
	);
};
