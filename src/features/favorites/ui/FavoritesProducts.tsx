'use client';

import { useState, useMemo, useEffect } from 'react';
import Link from 'next/link';

import { CategoryType } from '@/shared/types';
import { MAIN_CATEGORIES } from '@/shared/constants';
import { Button, Tabs, TabsContent, TabsList, TabsTrigger } from '@/shared/ui';

import { ProductCardsGrid } from '@/entities/product';
import { useFavoritesStore } from '../model/useFavoritesStore';

export const FavoritesProducts = () => {
	const [activeTab, setActiveTab] = useState<CategoryType>('exteriorDoors');
	const products = useFavoritesStore((state) => state.products);

	const exteriorProducts = useMemo(
		() => products.filter((p) => p.category?.categoryType === 'exteriorDoors'),
		[products],
	);
	const interiorProducts = useMemo(
		() => products.filter((p) => p.category?.categoryType === 'interiorDoors'),
		[products],
	);
	const hasExterior = exteriorProducts.length > 0;
	const hasInterior = interiorProducts.length > 0;
	const shouldShowTabs = hasExterior && hasInterior;

	useEffect(() => {
		if (!hasExterior && hasInterior) {
			setActiveTab('interiorDoors');
			return;
		}

		if (!hasInterior && hasExterior) {
			setActiveTab('exteriorDoors');
		}
	}, [hasExterior, hasInterior]);

	if (products.length === 0)
		return (
			<div className="py-8 text-center">
				<div className="text-lg font-semibold">Избранное пустое</div>
				<div className="mt-2 text-sm text-muted-foreground">
					Добавляйте товары в избранное, чтобы быстро возвращаться к ним.
				</div>
				<div className="mt-5 flex flex-wrap items-center justify-center gap-2">
					<Button variant="secondary" asChild>
						<Link href={`/categories/${MAIN_CATEGORIES.exterior.slug}`}>
							Входные двери
						</Link>
					</Button>
					<Button variant="secondary" asChild>
						<Link href={`/categories/${MAIN_CATEGORIES.interior.slug}`}>
							Межкомнатные двери
						</Link>
					</Button>
				</div>
			</div>
		);

	return shouldShowTabs ? (
		<Tabs
			value={activeTab}
			onValueChange={(value) => setActiveTab(value as CategoryType)}
		>
			<TabsList className="mb-4 h-auto flex-wrap">
				<TabsTrigger value="exteriorDoors">
					Входные ({exteriorProducts.length})
				</TabsTrigger>
				<TabsTrigger value="interiorDoors">
					Межкомнатные ({interiorProducts.length})
				</TabsTrigger>
			</TabsList>
			<TabsContent value="exteriorDoors">
				<ProductCardsGrid products={exteriorProducts} />
			</TabsContent>
			<TabsContent value="interiorDoors">
				<ProductCardsGrid products={interiorProducts} />
			</TabsContent>
		</Tabs>
	) : (
		<ProductCardsGrid products={hasExterior ? exteriorProducts : interiorProducts} />
	);
};
