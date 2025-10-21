import Link from 'next/link';
import { CategoryApiResponse, ProductApiResponse } from '@/shared/types';
import { Box, cn } from '@/shared/ui';
import { AttributeList } from './AttributeList';
import { PriceDetails } from './PriceDetails';
import { Fragment } from 'react';
import { CallBackButton, CallBackDialog } from '@/features/callback';

type Props = {
	product: ProductApiResponse;
	categories?: CategoryApiResponse[] | null;
};

export const ProductSummary = ({ product, categories }: Props) => {
	const categoriesArray = categories || [product.category];

	return (
		<Box className="flex flex-col gap-5">
			<h1 className="text-2xl  sm:text-3xl">{product.name}</h1>
			<AttributeList variants={product.variants} />
			<PriceDetails product={product} />
			<CallBackDialog>
				<CallBackButton
					className="w-full justify-self-center"
					title="Заказать обратный звонок"
				/>
			</CallBackDialog>
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
