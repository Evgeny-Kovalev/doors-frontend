'use client';

import { useMemo } from 'react';
import WheelGesturesPlugin from 'embla-carousel-wheel-gestures';

import { CategoryApiResponse } from '@/shared/types';
import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
	cn,
} from '@/shared/ui';

import { CategoryCard } from './CategoryCard';

interface CategoriesSliderProps extends React.HTMLAttributes<HTMLDivElement> {
	categories: CategoryApiResponse[];
}

export const CategoriesSlider = ({
	categories,
	className,
	...props
}: CategoriesSliderProps) => {
	const wheelGesturesPlugin = useMemo(() => WheelGesturesPlugin(), []);

	return (
		<Carousel
			opts={{
				align: 'start',
			}}
			plugins={[wheelGesturesPlugin]}
			className={className}
			{...props}
		>
			<CarouselContent>
				{categories.map((c) => (
					<CarouselItem
						key={c.id}
						className={cn('basis-1/2 md:basis-1/3 lg:basis-1/4')}
					>
						<CategoryCard category={c} orientation="vertical" />
					</CarouselItem>
				))}
			</CarouselContent>
			<CarouselPrevious
				variant="default"
				className={cn('top-[40%] left-[10px] -translate-x-1/2 md:left-0', {
					'lg:hidden': categories.length <= 4,
					'md:hidden': categories.length <= 3,
					hidden: categories.length <= 2,
				})}
			/>
			<CarouselNext
				variant="default"
				className={cn('top-[40%] right-[10px] translate-x-1/2 md:right-0', {
					'lg:hidden': categories.length <= 4,
					'md:hidden': categories.length <= 3,
					hidden: categories.length <= 2,
				})}
			/>
		</Carousel>
	);
};
