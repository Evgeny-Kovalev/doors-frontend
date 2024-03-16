'use client';

import Image from 'next/image';
import Slider, { Settings } from 'react-slick';
import { ArrowNext, ArrowPrev } from './Arrows';
import { MAIN_PAGE } from '@/shared/constants';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './Slider.styles.css';

interface MainSliderProps {}

export default function MainSlider({}: MainSliderProps) {
	const settings: Settings = {
		dots: false,
		infinite: true,
		speed: 500,
		slidesToShow: 1,
		slidesToScroll: 1,
		autoplay: true,
		autoplaySpeed: 3000,
		nextArrow: <ArrowNext />,
		prevArrow: <ArrowPrev />,
	};

	return (
		<Slider className='cursor-pointer" h-full w-full' {...settings}>
			{MAIN_PAGE.banner.slides.slice(0, 8).map((slide) => (
				<Image
					key={slide.imgName}
					width={1400}
					height={700}
					priority
					className="z-0 h-full w-full object-cover"
					src={`${process.env.NEXT_PUBLIC_IMAGES_URL}/${slide.imgName}`}
					alt="Slider item"
				/>
			))}
		</Slider>
	);
}
