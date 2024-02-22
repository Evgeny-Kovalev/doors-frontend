import { Attribute } from '../types';
import { ProductApiResponse, VariantApiResponse } from './../../../shared/types/index';
import { create } from 'zustand';

interface ProductState {
	product: ProductApiResponse | null;
	setProduct: (product: ProductApiResponse) => void;

	activeVariant: VariantApiResponse | null;
	setActiveVariant: (variant: VariantApiResponse | null) => void;

	selectedAttributes: Attribute[];
	setSelectedAttributes: (attributes: Attribute[]) => void;
}

export const useProductStore = create<ProductState>()((set) => ({
	product: null,
	setProduct: (product) => set({ product }),

	activeVariant: null,
	setActiveVariant: (variant) => set({ activeVariant: variant }),

	selectedAttributes: [],
	setSelectedAttributes: (attributes) => set({ selectedAttributes: attributes }),
}));
