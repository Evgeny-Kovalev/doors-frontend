import { Fragment } from 'react';
import Link from 'next/link';
import { DoorClosed } from 'lucide-react';

import { CategoryApiResponse, ProductApiResponse } from '@/shared/types';
import { Badge, Box, Button, cn } from '@/shared/ui';

import { ProductBadge } from '@/entities/product';
import { isCredit4ByCategorySlug } from '@/entities/category';
import { CallBackButton, CallBackDialog } from '@/features/callback';
import { InteriorProductViewDialog } from '@/features/product';

import { PriceDetails } from './PriceDetails';
import { AttributeList } from './AttributeList';

type Props = {
	product: ProductApiResponse;
	categories?: CategoryApiResponse[] | null;
};

export const ProductSummary = ({ product, categories }: Props) => {
	const categoriesArray = categories || [product.category];

	const isInteriorDoor = product.category.categoryType === 'interiorDoors';
	const isCredit4 = isCredit4ByCategorySlug(product.category.slug);

	return (
		<Box className="flex flex-col gap-5">
			<h1 className="text-2xl sm:text-3xl">{product.name}</h1>
			<h2 className="sr-only">
				Дверь{' '}
				{product.category.categoryType === 'exteriorDoors'
					? 'входная'
					: 'межкомнатная'}
			</h2>
			<AttributeList variants={product.variants} />
			<PriceDetails product={product} />
			<div
				className={cn(
					'grid gap-2',
					isInteriorDoor ? 'grid-cols-1 xl:grid-cols-2' : 'grid-cols-1',
					!isInteriorDoor && isCredit4 && 'grid-cols-1 items-center xl:grid-cols-2',
				)}
			>
				{isInteriorDoor && (
					<InteriorProductViewDialog product={product}>
						<Button
							variant="outline"
							className="border-primary-accent text-primary-accent hover:bg-primary-accent hover:text-primary-foreground w-full"
						>
							<DoorClosed size={20} className="mr-2" />
							Посмотреть в интерьере
							<Badge className="ml-2" variant="destructive">
								NEW
							</Badge>
						</Button>
					</InteriorProductViewDialog>
				)}
				{isCredit4 && <ProductBadge />}
				<CallBackDialog>
					<CallBackButton
						className="w-full justify-self-center"
						title="Заказать обратный звонок"
					/>
				</CallBackDialog>
			</div>
			<div>
				<span className="font-bold">
					{categoriesArray.length > 1 ? 'Категории: ' : 'Категория: '}
				</span>
				{categoriesArray.map((category, index, array) => (
					<Fragment key={category.id}>
						<Link
							key={category.id}
							className={cn(
								'hover:text-primary-accent',
								index === array.length - 1 && array.length > 1 && 'font-bold',
							)}
							href={`/categories/${category.slug}`}
						>
							{category.name}
						</Link>
						{index < array.length - 1 && ', '}
					</Fragment>
				))}
			</div>
		</Box>
	);
};
