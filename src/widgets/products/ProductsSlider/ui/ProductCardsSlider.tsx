'use client';

import { useState, useEffect, useRef } from 'react';
import { Swiper, SwiperClass, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';

import { ProductApiResponse } from '@/shared/types';

import { ProductCard } from '@/entities/product';
import { ProductsCardsSkeleton } from '../../ProductCards/ui/ProductsCardsSkeleton';
import { ButtonNext, ButtonPrev } from './NavButtons';

interface ProductCardsSliderProps {
	products: ProductApiResponse[];
}

export const ProductCardsSlider = ({ products }: ProductCardsSliderProps) => {
	const [isLoaded, setIsLoaded] = useState(false);

	useEffect(() => {
		setIsLoaded(true);
	}, []);

	const swiperRef = useRef<SwiperClass>();

	if (!isLoaded) return <ProductsCardsSkeleton />;

	return (
		<div className="relative">
			<ButtonPrev
				onClick={() => swiperRef.current?.slidePrev()}
				className="absolute left-0 top-1/2 hidden -translate-x-1/3 -translate-y-1/2 md:inline-flex"
			/>
			<Swiper
				onSwiper={(swiper) => (swiperRef.current = swiper)}
				breakpoints={{
					640: { slidesPerView: 3 },
					1024: { slidesPerView: 4 },
					1280: { slidesPerView: 5 },
					1536: { slidesPerView: 6 },
				}}
				autoplay={{
					delay: 2000,
					disableOnInteraction: false,
				}}
				modules={[Autoplay]}
				slidesPerView={2}
				spaceBetween={25}
				loop
			>
				{products.map((p) => (
					<SwiperSlide key={p.id}>
						<ProductCard product={p} />
					</SwiperSlide>
				))}
			</Swiper>
			<ButtonNext
				onClick={() => swiperRef.current?.slideNext()}
				className="absolute right-0 top-1/2 hidden -translate-y-1/2 translate-x-1/3 md:inline-flex"
			/>
		</div>
	);
};
