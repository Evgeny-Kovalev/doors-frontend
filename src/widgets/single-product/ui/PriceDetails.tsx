'use client';

import { CategoryType, ProductType, ProductApiResponse } from '../../../shared/types';
import { getPriceTextByVariant, getPriceText } from '../../../entities/product';
import { cn } from '../../../shared/ui/utils';
import { useProductStore } from '../model';
import { DoorCasingIcon, DoorFrameIcon, DoorIcon } from '../../../shared/icons';
import { ReactElement } from 'react';

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
			className={cn('mt-5 flex flex-col gap-5 rounded-lg border p-5', {
				'w-full': !isInteriorType,
			})}
		>
			<div className="flex items-center sm:items-end">
				<div className="mr-3 text-foreground">
					{PRICE_DESCRIPTION[product.category.categoryType][product.productType]}:
				</div>
				<div className="text-3xl font-bold leading-none text-primary-accent">
					{priceText}
				</div>
			</div>
			{isInteriorType &&
				(product.productType === 'full' || product.productType === 'fullSample') && (
					<div className="flex flex-wrap items-center justify-between gap-2 text-muted-foreground">
						<figure className="flex items-center">
							<DoorIcon className="mr-2 h-10 w-10 text-primary" />
							<figcaption>Полотно</figcaption>
						</figure>
						<figure className="flex items-center">
							<DoorFrameIcon className="mr-2 h-10 w-10 text-primary" />
							<figcaption>Коробка (2.5шт)</figcaption>
						</figure>
						<figure className="flex items-center">
							<DoorCasingIcon className="mr-2 h-10 w-10 text-primary" />
							<figcaption>
								Наличник ({product.productType === 'full' ? 5 : 2.5}шт)
							</figcaption>
						</figure>
					</div>
				)}
		</div>
	);
};
