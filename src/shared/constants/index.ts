import { CategoryType } from '../types';

export const MAIN_CATEGORIES = {
	interior: {
		id: 1,
		slug: 'dveri-mezhkomnatnye',
		label: 'Двери межкомнатные',
		type: CategoryType.interiorDoors,
	},
	exterior: {
		id: 2,
		slug: 'dveri-vhodnye',
		label: 'Двери входные',
		type: CategoryType.exteriorDoors,
	},
};

export const SHOP_INFO = {
	phones: [
		{ tel: '+375293278958', label: ' +375 (29) 327-89-58' },
		{ tel: '+375256727768', label: ' +375 (25) 672-77-68' },
	],
	adress: 'г. Гомель, пр-кт Космонавтов 61а, ТЦ "КосмоСтар", 2 этаж павильон 4',
};

export const MAIN_PAGE = {
	banner: {
		slides: [
			{
				urlTo: `/categories/${MAIN_CATEGORIES.interior.slug}`,
				imgUrl: `${process.env.NEXT_PUBLIC_IMAGES_URL}/banner_large_1.webp`,
			},
			{
				urlTo: `/categories/${MAIN_CATEGORIES.exterior.slug}`,
				imgUrl: `${process.env.NEXT_PUBLIC_IMAGES_URL}/banner_large_2.webp`,
			},
			{
				urlTo: null,
				imgUrl: `${process.env.NEXT_PUBLIC_IMAGES_URL}/banner_large_3.webp`,
			},
		],
		items: [
			{
				urlTo: null,
				imgUrl: `${process.env.NEXT_PUBLIC_IMAGES_URL}/banner_small_1.webp`,
			},
			{
				urlTo: null,
				imgUrl: `${process.env.NEXT_PUBLIC_IMAGES_URL}/banner_small_2.webp`,
			},
		],
	},
};

export const MAIN_NAV = {
	categoriesIds: [MAIN_CATEGORIES.exterior.id, MAIN_CATEGORIES.interior.id],
};

export const PRODUCT_PER_PAGE = 20;
export const DESCRIPTION_MAX_LEN = 200;
