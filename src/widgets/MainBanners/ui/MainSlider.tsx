'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import WheelGesturesPlugin from 'embla-carousel-wheel-gestures';
import Autoplay from 'embla-carousel-autoplay';

import { MAIN_PAGE } from '@/shared/constants';
import {
	Button,
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
} from '@/shared/ui';

interface MainSliderProps {}

export default function MainSlider({}: MainSliderProps) {
	return (
		<Carousel
			opts={{
				align: 'start',
				loop: true,
			}}
			plugins={[Autoplay({ delay: 3000 }), WheelGesturesPlugin()]}
			className="h-full"
		>
			<CarouselContent className="h-full">
				{MAIN_PAGE.banner.slides.map(({ imgUrl, title, urlTo }) => (
					<CarouselItem key={imgUrl}>
						<div className="relative h-full">
							<Image
								src={imgUrl}
								className="h-full w-full object-cover"
								alt="Slider item"
								width={1400}
								height={700}
								fetchPriority="high"
								priority
							/>
							{title && (
								<div className="absolute bottom-0 left-1/2 top-1/2 flex w-full -translate-x-1/2 items-end justify-between gap-2 bg-gradient-to-t from-black/90 to-transparent p-4 min-[510px]:p-5 xl:p-8">
									<span className="-mb-1 whitespace-pre-line text-2xl font-bold uppercase text-white min-[510px]:text-4xl md:text-4xl xl:text-5xl">
										{title}
									</span>
									{urlTo && (
										<Button
											asChild
											className="h-6 rounded-lg px-3 text-xs min-[510px]:px-5 min-[510px]:py-4 min-[510px]:text-base xl:px-6 xl:py-5 xl:text-lg "
										>
											<Link href={urlTo}>
												Выбрать
												<ArrowRight className="ml-1 size-3 min-[510px]:size-4 xl:size-[18px]" />
											</Link>
										</Button>
									)}
								</div>
							)}
						</div>
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
	);
}
