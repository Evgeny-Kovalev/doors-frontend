'use client';

import Autoplay from 'embla-carousel-autoplay';
import { ProductApiResponse } from '@/shared/types';
import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
	cn,
} from '@/shared/ui';

import { ProductCard } from '@/entities/product';

interface ProductCardsSliderProps {
	products: ProductApiResponse[];
}

export const ProductCardsSlider = ({ products }: ProductCardsSliderProps) => {
	return (
		<Carousel
			opts={{
				align: 'start',
				loop: true,
			}}
			plugins={[Autoplay({ delay: 3000 })]}
		>
			<CarouselContent>
				{products.map((p) => (
					<CarouselItem
						key={p.id}
						className={cn(
							'basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/5 xl:basis-1/6',
						)}
					>
						<ProductCard product={p} />
					</CarouselItem>
				))}
			</CarouselContent>
			<CarouselPrevious
				variant="default"
				className="left-[10px] top-[40%] -translate-x-1/2 md:left-0"
			/>
			<CarouselNext
				variant="default"
				className="right-[10px] top-[40%] translate-x-1/2  md:right-0"
			/>
		</Carousel>
	);
};
