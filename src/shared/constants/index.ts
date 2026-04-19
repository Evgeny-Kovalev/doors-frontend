export const MAIN_CATEGORIES = {
	interior: {
		id: 1,
		slug: 'dveri-mezhkomnatnye',
		label: 'Двери межкомнатные',
		type: 'interiorDoors',
	},
	exterior: {
		id: 2,
		slug: 'dveri-vhodnye',
		label: 'Двери входные',
		type: 'exteriorDoors',
	},
} as const;

export const MOGILEV_DOORS_SLUG = 'dveri-vhodnye-rb-mogilyov';

export const SHOP_INFO = {
	phones: [
		{ tel: '+375293278958', label: ' +375 (29) 327-89-58' },
		{ tel: '+375256727768', label: ' +375 (25) 672-77-68' },
	],
	adress: 'г. Гомель, пр-кт Космонавтов 61а, ТЦ "КосмоСтар", 2 этаж павильон 4',
};

export const SHOP_CURRENCY = {
	mainTitle: 'BYN',
} as const;

export const MAIN_PAGE = {
	banner: {
		slides: [
			{
				imgUrl: `${process.env.NEXT_PUBLIC_IMAGES_URL}/banners/4.webp`,
			},
			{
				urlTo: `/categories/${MAIN_CATEGORIES.interior.slug}`,
				imgUrl: `${process.env.NEXT_PUBLIC_IMAGES_URL}/banners/1.webp`,
				title: 'Двери\nмежкомнатные',
			},
			{
				urlTo: `/categories/${MAIN_CATEGORIES.exterior.slug}`,
				imgUrl: `${process.env.NEXT_PUBLIC_IMAGES_URL}/banners/2.webp`,
				title: 'Двери входные',
			},
			{
				urlTo: null,
				imgUrl: `${process.env.NEXT_PUBLIC_IMAGES_URL}/banners/3.webp`,
			},
		],
		items: [
			{
				urlTo: null,
				imgUrl: `${process.env.NEXT_PUBLIC_IMAGES_URL}/banners/sm1.webp`,
			},
			{
				urlTo: null,
				imgUrl: `${process.env.NEXT_PUBLIC_IMAGES_URL}/banners/sm2.webp`,
			},
		],
	},
};

export const MAIN_NAV: { hiddenCategoriesSlugs: string[] } = {
	hiddenCategoriesSlugs: [],
};

export const PRODUCT_PER_PAGE = 24;
export const DESCRIPTION_MAX_LEN = 200;
