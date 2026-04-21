import { TagKeys, type ProductApiResponse } from '@/shared/types';

export const createProduct = (
	overrides: Partial<ProductApiResponse> = {},
): ProductApiResponse => ({
	id: 1,
	slug: 'product-1',
	name: 'Product 1',
	imgUrl: '/product.jpg',
	description: 'Test product description',
	isVisible: true,
	productType: 'doorOnlySample',
	category: {
		id: 10,
		name: 'Test category',
		slug: 'test-category',
		imgUrl: '/test-category.jpg',
		description: 'Category description',
		isVisible: true,
		parentCategoryId: 0,
		order: 1,
		categoryType: 'interiorDoors',
		...overrides.category,
	},
	variants: [
		{
			id: 101,
			imgUrl: '/variant.jpg',
			attributes: [],
			tags: [
				{
					id: 1,
					key: TagKeys.bestseller,
					label: 'Хит',
				},
			],
		},
	],
	params: [],
	...overrides,
});
