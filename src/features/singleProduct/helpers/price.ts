import { ProductApiResponse, VariantApiResponse } from '@/shared/types';

const getProductPrice = (product: ProductApiResponse) => {
	const prices = product.variants
		.map((variant) => variant.discountPrice || variant.price)
		.filter<number>((price): price is number => typeof price === 'number');

	if (prices.length === 0) {
		return null;
	}
	return {
		min: Math.min(...prices),
		max: Math.max(...prices),
	};
};

export const getPriceLabel = (product: ProductApiResponse) => {
	const price = getProductPrice(product);

	if (!price) return 'Цену уточняйте';

	const { min, max } = price;

	if (min === max) return `${min}руб`;

	return `${min}руб - ${max}руб`;
};

export const getPriceLabelByVariant = (variant: VariantApiResponse) => {
	if (!variant.price) return 'Цену уточняйте';
	return `${variant.price}руб`;
};
