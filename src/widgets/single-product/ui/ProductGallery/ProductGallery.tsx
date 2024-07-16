'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { Swiper, SwiperSlide, SwiperClass } from 'swiper/react';
import { Navigation, Thumbs } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';

import { cn } from '@/shared/ui/utils';
import { ProductApiResponse } from '@/shared/types';
import { Card, CardContent, CardFooter } from '@/shared/ui/card';

import { useProductStore } from '../../model';
import { ProductGallerySkeleton } from './ProductGallerySkeleton';

type Props = {
	product: ProductApiResponse;
};

export const ProductGallery = ({ product }: Props) => {
	const [isLoaded, setIsLoaded] = useState(false);

	useEffect(() => {
		setIsLoaded(true);
	}, []);

	const { activeVariant, setActiveVariant } = useProductStore();

	let swiperRef = useRef<SwiperClass | null>(null);

	useEffect(() => {
		if (!activeVariant) return;

		swiperRef.current?.slideTo(
			product.variants.findIndex((v) => activeVariant.id === v.id),
		);
	}, [activeVariant, product.variants]);

	const [thumbsSwiper, setThumbsSwiper] = useState<SwiperClass | null>(null);

	if (!isLoaded) return <ProductGallerySkeleton />;

	return (
		<Card className="flex flex-col pt-6">
			<CardContent>
				<Swiper
					onSwiper={(swiper) => (swiperRef.current = swiper)}
					spaceBetween={10}
					navigation={true}
					thumbs={{
						swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null,
					}}
					modules={[Navigation, Thumbs]}
					className="w-full"
				>
					{product.variants.map((v, i) => (
						<SwiperSlide key={v.id}>
							<div className="relative flex h-[50vh] items-center justify-center md:h-[70vh]">
								<Image
									className="object-contain"
									src={v.imgUrl}
									sizes="70vh"
									fill
									priority
									alt="Product image"
									placeholder="blur"
									blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mN8+vx1PQAIqAM4jZDFJQAAAABJRU5ErkJggg=="
								/>
							</div>
						</SwiperSlide>
					))}
				</Swiper>
			</CardContent>
			<CardFooter>
				<Swiper
					onSwiper={setThumbsSwiper}
					spaceBetween={10}
					breakpoints={{
						640: { slidesPerView: 4 },
						768: { slidesPerView: 5 },
						1024: { slidesPerView: 5 },
						1280: { slidesPerView: 6 },
					}}
					slidesPerView={3}
					modules={[Navigation, Thumbs]}
					navigation
					className="w-full"
				>
					{product.variants.map((v, i) => (
						<SwiperSlide key={v.id}>
							<div
								key={i}
								className={cn(
									'h-20 cursor-pointer rounded-md bg-gray-200 opacity-80 transition-opacity hover:opacity-100',
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
						</SwiperSlide>
					))}
				</Swiper>
			</CardFooter>
		</Card>
	);
};
