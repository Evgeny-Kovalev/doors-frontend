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

	const wheelGesturesPlugin = useMemo(WheelGesturesPlugin, []);

	return (
		<Card className="flex flex-col pt-6">
			<CardContent>
				<Carousel
					plugins={[wheelGesturesPlugin]}
					setApi={setEmblaMainApi}
					opts={{ loop: true, axis: 'x' }}
				>
					<CarouselContent>
						{sortedVariants.map((v) => (
							<CarouselItem
								key={v.id}
								className="relative flex h-[50vh] items-center justify-center md:h-[70vh]"
							>
								<Image
									className="object-contain"
									src={v.imgUrl}
									sizes="70vh"
									fill
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
						className="left-[10px] top-1/2 -translate-x-1/2 md:left-0"
					/>
					<CarouselNext
						variant="default"
						className="right-[10px] top-1/2 translate-x-1/2  md:right-0"
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
										'h-20 cursor-pointer rounded-md border-2 border-transparent bg-gray-100 opacity-80 transition-opacity hover:opacity-100',
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
										className="mx-auto h-full w-auto object-contain"
										alt={'Variant image'}
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
