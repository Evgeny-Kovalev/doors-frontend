'use client';

import {
	Button,
	cn,
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
	Drawer,
	DrawerContent,
	DrawerDescription,
	DrawerHeader,
	DrawerTitle,
	DrawerTrigger,
	DrawerClose,
	Separator,
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
	CarouselProps,
} from '@/shared/ui';
import { ProductApiResponse, VariantApiResponse } from '@/shared/types';
import { CSSProperties, PropsWithChildren, useEffect, useRef, useState } from 'react';
import Image, { ImageProps } from 'next/image';
import { useMediaQuery } from '@/shared/hooks';
import { X } from 'lucide-react';
import { useProductStore } from '@/widgets/single-product/model';

const BACKGROUND_NATURAL = { width: 1920, height: 1280 } as const;

type BackgroundItem = {
	align: 'left' | 'right' | 'center';
	imgUrl: string;
	productPosition: { bottom: number; horizontal: number; width: number }; // in %
};

const BG_ITEMS: BackgroundItem[] = [
	{
		align: 'left',
		imgUrl: '/interiors/2.jpg',
		productPosition: {
			bottom: 10,
			horizontal: 21,
			width: 15,
		},
	},
	{
		align: 'center',
		imgUrl: '/interiors/1.jpg',
		productPosition: {
			bottom: 21,
			horizontal: 33.5,
			width: 11,
		},
	},
	{
		align: 'right',
		imgUrl: '/interiors/3.png',
		productPosition: {
			bottom: 11.65,
			horizontal: 70.5,
			width: 17,
		},
	},
	{
		align: 'center',
		imgUrl: '/interiors/4.jpg',
		productPosition: {
			bottom: 16.8,
			horizontal: 30.5,
			width: 14,
		},
	},
];

type InteriorProductViewDialogProps = PropsWithChildren<{
	product: ProductApiResponse;
	bgAlign?: 'left' | 'right' | 'center';
	initialActiveVariant?: VariantApiResponse | null;
}>;

export const InteriorProductViewDialog = ({
	children,
	product,
}: InteriorProductViewDialogProps) => {
	const isDesktop = useMediaQuery('(min-width: 768px)');

	const { activeVariant, setActiveVariant } = useProductStore((state) => state);

	const [activeBgItem, setActiveBgItem] = useState<BackgroundItem>(BG_ITEMS[0]);

	const [computedLeftPx, setComputedLeftPx] = useState<number>(0);
	const [computedBottomPx, setComputedBottomPx] = useState<number>(0);
	const [computedWidthPx, setComputedWidthPx] = useState<number>(0);

	const productImageStyleProps: CSSProperties = {
		left: `${computedLeftPx}px`,
		bottom: `${computedBottomPx}px`,
		width: `${computedWidthPx}px`,
	};

	const containerRef = useRef<HTMLDivElement | null>(null);
	const bgNaturalRef = useRef<{ width: number; height: number }>({
		width: BACKGROUND_NATURAL.width,
		height: BACKGROUND_NATURAL.height,
	});
	const [bgLoadedTick, setBgLoadedTick] = useState<number>(0);

	useEffect(() => {
		if (!containerRef.current) return;

		const el = containerRef.current;

		const recalc = () => {
			let containerWidth = el.clientWidth;
			let containerHeight = el.clientHeight;
			if (!containerWidth || !containerHeight) {
				const parent = el.parentElement;
				containerWidth = parent?.clientWidth || window.innerWidth;
				containerHeight = parent?.clientHeight || window.innerHeight;
			}

			const naturalW = bgNaturalRef.current.width || BACKGROUND_NATURAL.width;
			const naturalH = bgNaturalRef.current.height || BACKGROUND_NATURAL.height;
			const scale = Math.max(containerWidth / naturalW, containerHeight / naturalH);
			const displayedWidth = naturalW * scale;
			const displayedHeight = naturalH * scale;

			// horizontal offset: always measure from image's LEFT edge
			const xFromImageLeft =
				(activeBgItem.productPosition.horizontal / 100) * displayedWidth;
			// calc image left offset inside container based on object-position
			const imageLeftOffset =
				activeBgItem.align === 'left'
					? 0
					: activeBgItem.align === 'right'
						? containerWidth - displayedWidth
						: (containerWidth - displayedWidth) / 2; // center
			const leftPx = imageLeftOffset + xFromImageLeft;
			const bottomPx = (activeBgItem.productPosition.bottom / 100) * displayedHeight;
			const widthPx = (activeBgItem.productPosition.width / 100) * displayedWidth;

			setComputedLeftPx(leftPx);
			setComputedBottomPx(bottomPx);
			setComputedWidthPx(widthPx);
		};

		recalc();
		const rafId = requestAnimationFrame(recalc);
		const ro = new ResizeObserver(() => recalc());
		ro.observe(el);
		window.addEventListener('resize', recalc);
		return () => {
			ro.disconnect();
			window.removeEventListener('resize', recalc);
			cancelAnimationFrame(rafId);
		};
	}, [activeBgItem.productPosition, bgLoadedTick, activeBgItem.align]);

	const onInteriorImageLoad = (img: HTMLImageElement) => {
		if (img.naturalWidth && img.naturalHeight) {
			bgNaturalRef.current = {
				width: img.naturalWidth,
				height: img.naturalHeight,
			};
			setBgLoadedTick((v) => v + 1);
		}
	};

	// Desktop
	if (isDesktop)
		return (
			<Dialog>
				<DialogTrigger asChild>
					<div>{children}</div>
				</DialogTrigger>
				<DialogContent className="left-0 top-0 h-dvh w-dvw max-w-none translate-x-0 translate-y-0 transform-none border-0 p-0">
					<DialogClose asChild>
						<Button
							className="absolute right-4 top-4 z-10"
							variant="outline"
							size="iconSm"
						>
							<X className="size-4" />
						</Button>
					</DialogClose>
					<div className="h-dvh">
						<DialogHeader className="sr-only">
							<DialogTitle className="sr-only">Посмотреть в интерьере</DialogTitle>
							<DialogDescription className="sr-only">
								Посмотреть в интерьере
							</DialogDescription>
						</DialogHeader>
						<div ref={containerRef} className="relative h-full">
							<InteriorImage
								activeBgItem={activeBgItem}
								onLoad={(e) => onInteriorImageLoad(e.currentTarget)}
							/>
							<ProductImage
								className="duration-500"
								src={activeVariant?.imgUrl || product.imgUrl}
								style={productImageStyleProps}
							/>
						</div>
					</div>
					<ProductVariantsCarousel
						activeVariant={activeVariant}
						variants={product.variants}
						onVariantClick={(v) => setActiveVariant(v)}
						className="absolute bottom-4 right-12 z-20 rounded-lg bg-white px-4 py-2"
					/>
					<BackgroundsCarousel
						items={BG_ITEMS}
						onItemClick={(i) => setActiveBgItem(i)}
						activeItem={activeBgItem}
						className="absolute left-4 top-1/2 z-20 w-fit -translate-y-1/2 rounded-lg bg-white p-2"
						itemClassName="basis-auto pt-2"
						orientation="vertical"
						contentClassName="h-[352px] -mt-2"
					/>
				</DialogContent>
			</Dialog>
		);

	// Mobile
	return (
		<Drawer>
			<DrawerTrigger asChild>
				<div>{children}</div>
			</DrawerTrigger>
			<DrawerContent hideGrabber className="h-full min-h-dvh border-none">
				<DrawerClose asChild>
					<Button
						className="absolute right-4 top-4 z-10"
						variant="outline"
						size="iconSm"
					>
						<X className="size-4" />
					</Button>
				</DrawerClose>
				<div className="h-[60%] border-0 p-0">
					<DrawerHeader className="sr-only">
						<DrawerTitle className="sr-only">Посмотреть в интерьере</DrawerTitle>
						<DrawerDescription className="sr-only">
							Посмотреть в интерьере
						</DrawerDescription>
					</DrawerHeader>
					<div ref={containerRef} className="relative h-full">
						<InteriorImage
							activeBgItem={activeBgItem}
							onLoad={(e) => onInteriorImageLoad(e.currentTarget)}
						/>
						<ProductImage
							src={activeVariant?.imgUrl || product.imgUrl}
							style={productImageStyleProps}
						/>
					</div>
				</div>
				<div className="pointer-events-auto fixed inset-x-0 bottom-0 z-[60] flex h-[45%] flex-col justify-evenly rounded-t-xl bg-white px-4 pb-[env(safe-area-inset-bottom)] md:hidden">
					<ProductVariantsCarousel
						activeVariant={activeVariant}
						variants={product.variants}
						onVariantClick={(v) => setActiveVariant(v)}
					/>
					<Separator />
					<BackgroundsCarousel
						items={BG_ITEMS}
						activeItem={activeBgItem}
						onItemClick={(i) => setActiveBgItem(i)}
					/>
				</div>
			</DrawerContent>
		</Drawer>
	);
};

const BackgroundsCarousel = ({
	items,
	activeItem,
	onItemClick,
	className,
	itemClassName,
	orientation = 'horizontal',
	contentClassName,
}: {
	items: BackgroundItem[];
	activeItem: BackgroundItem;
	onItemClick: (item: BackgroundItem) => void;
	className?: string;
	itemClassName?: string;
	orientation?: 'horizontal' | 'vertical';
	contentClassName?: string;
} & CarouselProps) => {
	return (
		<Carousel
			opts={{
				align: 'start',
				dragFree: true,
			}}
			className={cn('relative mx-auto w-full max-w-sm', className)}
			orientation={orientation}
		>
			<CarouselPrevious
				className={cn('z-20', {
					'-left-3 [@media(min-width:480px)]:-left-10': orientation === 'horizontal',
				})}
			/>
			<CarouselContent className={contentClassName}>
				{items.map((item, index) => (
					<CarouselItem
						key={item.imgUrl}
						className={cn('basis-auto', itemClassName)}
					>
						<Image
							className={cn(
								'size-20 cursor-pointer p-1 transition-all duration-100',
								item.imgUrl === activeItem.imgUrl &&
									'rounded-lg border-[2px] border-primary',
							)}
							onClick={() => onItemClick(item)}
							src={item.imgUrl}
							alt="Interior"
							width={80}
							height={80}
						/>
					</CarouselItem>
				))}
			</CarouselContent>
			<CarouselNext
				className={cn('z-20', {
					'-right-3 [@media(min-width:480px)]:-right-10':
						orientation === 'horizontal',
				})}
			/>
		</Carousel>
	);
};

const ProductVariantsCarousel = ({
	variants,
	activeVariant,
	onVariantClick,
	className,
}: {
	variants: VariantApiResponse[];
	activeVariant?: VariantApiResponse | null;
	onVariantClick?: (variant: VariantApiResponse) => void;
	className?: string;
}) => {
	return (
		<Carousel
			opts={{
				align: 'start',
				dragFree: true,
			}}
			className={cn('mx-auto w-full max-w-sm', className)}
		>
			<CarouselPrevious className="-left-3 z-10 [@media(min-width:480px)]:-left-10" />
			<CarouselContent>
				{variants.map((v, index) => (
					<CarouselItem key={index} className="basis-auto ">
						<div
							className={cn(
								'relative inline-block cursor-pointer pb-2 after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[3px] after:rounded-md after:bg-transparent after:transition-colors after:duration-200 after:content-[""]',
								v.imgUrl === activeVariant?.imgUrl && 'after:bg-primary',
							)}
							onClick={() => onVariantClick?.(v)}
						>
							<Image
								className="block"
								src={v.imgUrl}
								alt="Product variant"
								width={50}
								height={120}
							/>
						</div>
					</CarouselItem>
				))}
			</CarouselContent>
			<CarouselNext className="-right-3 z-10 [@media(min-width:480px)]:-right-10" />
		</Carousel>
	);
};

const ProductImage = ({ className, ...props }: Omit<ImageProps, 'alt'>) => {
	return (
		<Image
			className={cn('absolute z-10 h-auto transition-all duration-300', className)}
			alt="Product"
			{...props}
			width={500}
			height={500}
		/>
	);
};

const InteriorImage = ({
	activeBgItem,
	...props
}: { activeBgItem: BackgroundItem } & Omit<ImageProps, 'alt' | 'src'>) => {
	return (
		<Image
			src={activeBgItem.imgUrl}
			alt="Interior"
			width={1920}
			height={1080}
			className={cn(
				'h-full w-full object-cover transition-all !duration-300',
				activeBgItem.align === 'left'
					? 'object-left-bottom'
					: activeBgItem.align === 'right'
						? 'object-right-bottom'
						: 'object-[bottom_center]',
			)}
			{...props}
		/>
	);
};
