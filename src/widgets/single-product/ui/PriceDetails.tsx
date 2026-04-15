'use client';

import { ReactElement } from 'react';
import Image from 'next/image';

import { CategoryType, ProductType, ProductApiResponse } from '@/shared/types';
import { cn } from '@/shared/ui';
import { DoorCasingIcon, DoorFrameIcon, DoorIcon } from '@/shared/icons';
import { MOGILEV_DOORS_SLUG } from '@/shared/constants';

import { getPriceTextByVariant, getPriceText } from '@/entities/product';

import { useProductStore } from '../model';

interface PriceDetailsProps {
	product: ProductApiResponse;
}

const PRICE_DESCRIPTION: {
	[key in CategoryType]: {
		[key in ProductType]: string | ReactElement;
	};
} = {
	exteriorDoors: {
		full: 'Цена',
		fullSample: 'Цена',
		doorOnlySample: 'Цена',
	},
	interiorDoors: {
		full: 'Цена за\xa0комплект',
		fullSample: 'Цена за\xa0комплект',
		doorOnlySample: (
			<>
				Цена за&nbsp;<b>полотно</b>
			</>
		),
	},
};

export const PriceDetails = ({ product }: PriceDetailsProps) => {
	const isInteriorType = product.category.categoryType === 'interiorDoors';

	const { activeVariant } = useProductStore();

	const priceText = activeVariant
		? getPriceTextByVariant(activeVariant)
		: getPriceText(product);

	return (
		<div
			className={cn('flex flex-col gap-5 rounded-lg border p-5', {
				'w-full': !isInteriorType,
			})}
		>
			<div className="relative flex items-center sm:items-end">
				<div className="text-foreground mr-3">
					{PRICE_DESCRIPTION[product.category.categoryType][product.productType]}:
				</div>
				<div className="text-primary-accent text-3xl leading-none font-bold">
					{priceText}
				</div>
				{product.category.slug === MOGILEV_DOORS_SLUG && (
					<Image
						className="absolute top-1/2 -right-3.5 -translate-y-1/2"
						src="/sales/credit4.png"
						width={100}
						height={80}
						alt="Ctedit 4%"
					/>
				)}
			</div>
			{isInteriorType &&
				(product.productType === 'full' || product.productType === 'fullSample') && (
					<div className="text-muted-foreground flex flex-wrap items-center justify-between gap-2">
						<figure className="flex items-center">
							<DoorIcon className="text-primary mr-2 h-10 w-10" />
							<figcaption>Полотно</figcaption>
						</figure>
						<figure className="flex items-center">
							<DoorFrameIcon className="text-primary mr-2 h-10 w-10" />
							<figcaption>Коробка (2.5шт)</figcaption>
						</figure>
						<figure className="flex items-center">
							<DoorCasingIcon className="text-primary mr-2 h-10 w-10" />
							<figcaption>
								Наличник ({product.productType === 'full' ? 5 : 2.5}шт)
							</figcaption>
						</figure>
					</div>
				)}
		</div>
	);
};
