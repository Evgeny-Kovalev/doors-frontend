'use client';

import Link from 'next/link';

import { ProductApiResponse } from '@/shared/types';
import { Card, CardContent, CardFooter, CardHeader } from '@/shared/ui/card';
import { MAIN_CATEGORIES } from '@/shared/constants';
import { cn } from '@/shared/ui/utils';

import { getPriceLabel, getPriceLabelByVariant } from '@/entities/product';

import { AttributeList } from './AttributeList';
import { PriceDetails } from './PriceDetails';
import { useProductStore } from '../model';

type Props = {
	product: ProductApiResponse;
};
export const ProductSummary = ({ product }: Props) => {
	const isInteriorType = product.category.categoryType === MAIN_CATEGORIES.interior.type;

	const priceDescription = isInteriorType ? `Цена за\xa0комплект` : 'Цена';

	const { activeVariant } = useProductStore();

	const priceLabel = activeVariant
		? getPriceLabelByVariant(activeVariant)
		: getPriceLabel(product);

	return (
		<Card>
			<CardHeader>
				<h1 className="text-2xl  sm:text-3xl">{product.name}</h1>
			</CardHeader>
			<CardContent>
				<AttributeList variants={product.variants} />
				<div
					className={cn('mt-5 flex flex-col gap-5 rounded-lg border p-5', {
						'w-full': !isInteriorType,
					})}
				>
					<div className="flex items-center sm:items-end">
						<div className="mr-3 text-foreground">{priceDescription}:</div>
						<div className="text-3xl font-bold leading-none text-primary-accent">
							{priceLabel}
						</div>
					</div>
					{isInteriorType && <PriceDetails />}
				</div>
			</CardContent>
			<CardFooter className="whitespace-break-spaces">
				<span className="font-bold">Категория: </span>
				<Link
					className="hover:text-primary-accent"
					href={`/categories/${product.category.slug}`}
				>
					{product.category.name}
				</Link>
			</CardFooter>
		</Card>
	);
};
