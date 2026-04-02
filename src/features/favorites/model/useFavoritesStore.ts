import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

import type { ProductApiResponse } from '@/shared/types';

type FavoritesState = {
	products: ProductApiResponse[];
	isFavorite: (slug: string) => boolean;
	add: (product: ProductApiResponse) => void;
	remove: (slug: string) => void;
	toggle: (product: ProductApiResponse) => void;
	clear: () => void;
};

export const useFavoritesStore = create<FavoritesState>()(
	persist(
		(set, get) => ({
			products: [],
			isFavorite: (slug) => get().products.some((p) => p.slug === slug),
			add: (product) =>
				set((state) => {
					if (state.products.some((p) => p.slug === product.slug)) return state;
					return { products: [product, ...state.products] };
				}),
			remove: (slug) =>
				set((state) => ({
					products: state.products.filter((p) => p.slug !== slug),
				})),
			toggle: (product) => {
				const { isFavorite, add, remove } = get();
				if (isFavorite(product.slug)) remove(product.slug);
				else add(product);
			},
			clear: () => set({ products: [] }),
		}),
		{
			name: 'favorites-v1',
			storage: createJSONStorage(() => localStorage),
			partialize: (state) => ({ products: state.products }),
		},
	),
);
