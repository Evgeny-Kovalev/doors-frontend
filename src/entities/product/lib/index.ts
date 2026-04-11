import { ProductApiResponse, VariantApiResponse } from '@/shared/types';
import { SHOP_CURRENCY } from '@/shared/constants';

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

export const getPriceText = (product: ProductApiResponse) => {
	const price = getProductPrice(product);

	if (!price) return 'Цену уточняйте';

	const { min, max } = price;

	if (min === max) return `${min} ${SHOP_CURRENCY.mainTitle}`;

	return `${min} - ${max} ${SHOP_CURRENCY.mainTitle}`;
};

export const getPriceTextByVariant = (variant: VariantApiResponse) => {
	if (!variant.discountPrice && !variant.price) return 'Цену уточняйте';
	return `${variant.discountPrice || variant.price} ${SHOP_CURRENCY.mainTitle}`;
};
