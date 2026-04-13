'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import Image from 'next/image';
import { WheelGesturesPlugin } from 'embla-carousel-wheel-gestures';

import { ProductApiResponse } from '@/shared/types';
import {
	Card,
	CardContent,
	CardFooter,
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
	cn,
	type CarouselApi,
} from '@/shared/ui';

import { useProductStore } from '../../model';

type Props = {
	product: ProductApiResponse;
};

export const ProductGallery = ({ product }: Props) => {
	const { activeVariant, setActiveVariant } = useProductStore();

	const [emblaMainApi, setEmblaMainApi] = useState<CarouselApi>();
	const [emblaThumbsApi, setEmblaThumbsApi] = useState<CarouselApi>();

	const mainVariantIndex = product.variants.findIndex(
		(v) => v.imgUrl === product.imgUrl,
	);

	const sortedVariants = useMemo(
		() => [
			...product.variants.slice(mainVariantIndex),
			...product.variants.slice(0, mainVariantIndex),
		],
		[product.variants, mainVariantIndex],
	);

	const onSelect = useCallback(() => {
		if (!emblaMainApi || !emblaThumbsApi) return;
		const selectedIndex = emblaMainApi.selectedScrollSnap();
		setActiveVariant(sortedVariants[selectedIndex]);
		emblaThumbsApi.scrollTo(selectedIndex);
	}, [emblaMainApi, emblaThumbsApi, sortedVariants, setActiveVariant]);

	useEffect(() => {
		if (!emblaMainApi) return;

		onSelect();
		emblaMainApi.on('select', onSelect);
		emblaMainApi.on('reInit', onSelect);

		return () => {
			emblaMainApi.off('select', onSelect);
			emblaMainApi.off('reInit', onSelect);
		};
	}, [emblaMainApi, onSelect]);

	useEffect(() => {
		if (!emblaMainApi || !activeVariant) return;

		const index = sortedVariants.findIndex((v) => activeVariant.id === v.id);
		emblaMainApi.scrollTo(index === -1 ? 0 : index);
	}, [activeVariant, sortedVariants, emblaMainApi]);

	const wheelGesturesPlugin = useMemo(() => WheelGesturesPlugin(), []);

	return (
		<Card className="flex flex-col pt-6">
			<CardContent>
				<Carousel
					plugins={[wheelGesturesPlugin]}
					setApi={setEmblaMainApi}
					opts={{ loop: true, axis: 'x' }}
				>
					<CarouselContent className="-mx-2">
						{sortedVariants.map((v) => (
							<CarouselItem
								key={v.id}
								className="max-h-[50vh] p-0 md:max-h-[70vh] 2xl:max-h-[60vh]"
							>
								<Image
									className="h-full w-full object-contain px-2"
									src={v.imgUrl}
									width={800}
									height={800}
									fetchPriority="high"
									priority
									alt="Product image"
									placeholder="blur"
									blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mN8+vx1PQAIqAM4jZDFJQAAAABJRU5ErkJggg=="
								/>
							</CarouselItem>
						))}
					</CarouselContent>
					<CarouselPrevious
						variant="default"
						className="top-1/2 left-0 -translate-x-1/2"
					/>
					<CarouselNext
						variant="default"
						className="top-1/2 right-0 translate-x-1/2"
					/>
				</Carousel>
			</CardContent>
			<CardFooter>
				<Carousel
					setApi={setEmblaThumbsApi}
					opts={{
						containScroll: 'keepSnaps',
						dragFree: true,
						axis: 'x',
					}}
					plugins={[wheelGesturesPlugin]}
					className="w-full"
				>
					<CarouselContent>
						{sortedVariants.map((v, i) => (
							<CarouselItem key={v.id} className="basis-1/4 sm:basis-1/6">
								<div
									key={v.id}
									className={cn(
										'cursor-pointer rounded-md border-2 border-transparent bg-gray-100 opacity-80 transition-opacity hover:opacity-100',
										(activeVariant?.id === v.id ||
											(activeVariant === null && i === 0)) &&
											'border-primary',
									)}
									onClick={() => setActiveVariant(v)}
								>
									<Image
										src={v.imgUrl}
										width={100}
										height={100}
										className="mx-auto size-18 object-contain"
										alt="Variant image"
									/>
								</div>
							</CarouselItem>
						))}
					</CarouselContent>
				</Carousel>
			</CardFooter>
		</Card>
	);
};
