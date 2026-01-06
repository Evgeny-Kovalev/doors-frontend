'use client';

import { useState } from 'react';
import Image from 'next/image';
import {
	Tabs,
	TabsList,
	TabsTrigger,
	TabsContent,
	Box,
	Carousel,
	CarouselItem,
	CarouselContent,
	CarouselNext,
	CarouselPrevious,
} from '@/shared/ui';
import { cn } from '@/shared/ui/utils';
import {
	ProductConstructorResponse,
	OutputDataItem,
} from '@/entities/product-constructor';

const ACCESSORIES_IMAGE_URL =
	'https://xn--80akudsge.xn--90ais/images/constructor/accessories.png?v690637cd43884';

export const ProductConstructor = ({ data }: { data: ProductConstructorResponse }) => {
	const DEFAULT_COLOR = data.films[2].items[0];
	const DEFAULT_MILLING = data.millings['type-2'].items[0];

	const [selectedColor, setSelectedColor] = useState<OutputDataItem>(DEFAULT_COLOR);
	const [selectedMilling, setSelectedMilling] =
		useState<OutputDataItem>(DEFAULT_MILLING);

	return (
		<div className="grid grid-cols-1 gap-3 md:grid-cols-[auto_1fr]">
			<div className="mx-auto flex w-[300px] flex-col gap-3">
				<div className="relative mx-auto h-[300px] w-[150px] lg:h-[500px] lg:w-[235px] ">
					<Image
						className="absolute left-0 top-0 h-full w-full object-contain"
						src={selectedColor.imageUrl ?? ''}
						alt="Door"
						width={235}
						height={500}
					/>
					<Image
						className="absolute left-0 top-0 h-full w-full object-contain p-5 pb-3"
						src={selectedMilling.imageUrl ?? ''}
						alt="Milling"
						width={235}
						height={500}
					/>
					<Image
						className="absolute left-0 top-0 h-full w-full object-contain"
						src={ACCESSORIES_IMAGE_URL}
						alt="Accessories"
						width={235}
						height={500}
					/>
				</div>
				<Box className="hidden w-full md:block">
					<h3 className="text-xl font-bold">Выбранные аттрибуты:</h3>
					<div>Материал - {selectedColor.title}</div>
					<div>Фрезеровка - {selectedMilling.title}</div>
				</Box>
			</div>
			<div className="flex flex-col gap-3">
				<div>
					<h3 className="text-lg font-bold">Материал</h3>
					<Tabs defaultValue="films">
						<TabsList>
							<TabsTrigger value="films">Плёнки</TabsTrigger>
							<TabsTrigger value="colors">{data.colors.keyLabel}</TabsTrigger>
							<TabsTrigger value="plywoods">{data.plywoods.keyLabel}</TabsTrigger>
						</TabsList>
						<TabsContent value="films">
							<Tabs defaultValue={Object.keys(data.films)[0]}>
								<div className="overflow-x-auto">
									<TabsList className="min-w-max">
										{Object.entries(data.films).map(([key, value]) => (
											<TabsTrigger key={key} value={key}>
												{value.keyLabel}
											</TabsTrigger>
										))}
									</TabsList>
								</div>
								{Object.entries(data.films).map(([key, value]) => (
									<TabsContent key={key} value={key}>
										<ItemsCarousel
											items={value.items}
											selectedItem={selectedColor}
											onItemClick={setSelectedColor}
										/>
									</TabsContent>
								))}
							</Tabs>
						</TabsContent>
						<TabsContent value="colors">
							<ItemsCarousel
								items={data.colors.items}
								selectedItem={selectedColor}
								onItemClick={setSelectedColor}
							/>
						</TabsContent>
						<TabsContent value="plywoods">
							<ItemsCarousel
								items={data.plywoods.items}
								selectedItem={selectedColor}
								onItemClick={setSelectedColor}
							/>
						</TabsContent>
					</Tabs>
				</div>
				<div>
					<h3 className="text-lg font-bold">Фрезеровка</h3>
					<div>
						<Tabs defaultValue={Object.keys(data.millings)[0]}>
							<TabsList className="h-full flex-wrap">
								{Object.entries(data.millings).map(([key, value]) => (
									<TabsTrigger key={key} value={key}>
										{value.keyLabel}
									</TabsTrigger>
								))}
							</TabsList>
							{Object.entries(data.millings).map(([key, value]) => (
								<TabsContent key={key} value={key}>
									<ItemsCarousel
										items={value.items}
										selectedItem={selectedMilling}
										onItemClick={setSelectedMilling}
									/>
								</TabsContent>
							))}
						</Tabs>
					</div>
				</div>
			</div>
			<div className="md:hidden">
				<h3 className="text-xl font-bold">Выбранные аттрибуты:</h3>
				<div>Материал - {selectedColor.title}</div>
				<div>Фрезеровка - {selectedMilling.title}</div>
			</div>
		</div>
	);
};

const ItemsCarousel = ({
	items,
	onItemClick,
	selectedItem,
}: {
	items: OutputDataItem[];
	onItemClick?: (item: OutputDataItem) => void;
	selectedItem?: OutputDataItem;
}) => {
	return (
		<Carousel
			opts={{
				align: 'start',
				dragFree: true,
			}}
			className="grid"
		>
			<CarouselPrevious variant="default" className="-left-4 z-10 " />
			<CarouselNext variant="default" className="-right-4 z-10 " />
			<CarouselContent>
				{items.map((item, index) => (
					<CarouselItem key={index} className="basis-auto pl-2 first:pl-4">
						{item.imageUrl && (
							<Image
								onClick={() => onItemClick?.(item)}
								className={cn(
									'h-[120px] w-[60px] cursor-pointer border border-gray-200 lg:h-[170px] lg:w-[85px]',
									selectedItem?.imageUrl === item.imageUrl &&
										'border-2 border-primary',
								)}
								src={item.imageUrl}
								alt="Product variant"
								width={85}
								height={170}
							/>
						)}
					</CarouselItem>
				))}
			</CarouselContent>
		</Carousel>
	);
};
