'use client';

import { ProductApiResponse } from '@/shared/types';
import ProductCard from '../ProductCard';
import Slider from 'react-slick';
import { ButtonNext, ButtonPrev } from './NavButtons';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

interface ProductCardsSliderProps {
	products: ProductApiResponse[];
}

export default function ProductCardsSlider({ products }: ProductCardsSliderProps) {
	const settings = {
		infinite: true,
		speed: 800,
		autoplay: true,
		autoplaySpeed: 2000,
		slidesToShow: 5,
		pauseOnHover: true,
		slidesToScroll: 1,
		swipeToSlide: true,
		nextArrow: <ButtonNext />,
		prevArrow: <ButtonPrev />,
	};

	return (
		<Slider className="-mx-3 cursor-pointer" {...settings}>
			{products.map((p) => (
				<div className="px-3" key={p.id}>
					<ProductCard product={p} />
				</div>
			))}
		</Slider>
	);
}
