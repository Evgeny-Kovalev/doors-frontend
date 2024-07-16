import { create } from 'zustand';
import { ProductApiResponse, VariantApiResponse } from '../../../shared/types/index';

interface ProductState {
	product: ProductApiResponse | null;
	setProduct: (product: ProductApiResponse) => void;

	activeVariant: VariantApiResponse | null;
	setActiveVariant: (variant: VariantApiResponse | null) => void;
}

export const useProductStore = create<ProductState>()((set) => ({
	product: null,
	setProduct: (product) => set({ product }),

	activeVariant: null,
	setActiveVariant: (variant) => set({ activeVariant: variant }),
}));
