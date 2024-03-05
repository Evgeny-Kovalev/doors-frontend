'use client';

import { ProductApiResponse } from '@/shared/types';
import { Card, CardContent, CardFooter } from '@/shared/ui/card';
import Image from 'next/image';
import { useProductStore } from '../store';
import { cn } from '@/shared/ui/utils';
import { useEffect, useState } from 'react';

type Props = {
	product: ProductApiResponse;
};

export default function ProductGallery({ product }: Props) {
	const { activeVariant } = useProductStore();

	const [selectedImgPath, setSelectedImgPath] = useState<string | null>(null);

	useEffect(() => setSelectedImgPath(activeVariant?.imgPath ?? null), [activeVariant]);

	return (
		<Card className="flex flex-col pt-6">
			<CardContent>
				<div className="relative flex h-[70vh] items-center justify-center">
					<Image
						className="object-contain"
						src={selectedImgPath ?? product.imgPath}
						sizes="500px"
						fill
						priority
						alt="Product image"
					/>
				</div>
			</CardContent>
			<CardFooter>
				<ul className="flex flex-wrap justify-center gap-3">
					{product.variants.map((v, i) => (
						<li
							key={v.id}
							onClick={() => {
								console.log('set', v);
								setSelectedImgPath(v.imgPath);
							}}
							className={cn(
								'relative flex h-20 w-20 cursor-pointer items-center justify-center bg-gray-300 opacity-50 transition-opacity hover:opacity-100',
								// { 'bg-primary opacity-100': activeVariant?.id === v.id },
							)}
						>
							<Image
								src={v.imgPath}
								width={100}
								height={100}
								className="h-full w-auto object-contain"
								alt={'Variant image'}
							/>
						</li>
					))}
				</ul>
			</CardFooter>
		</Card>
	);
}
