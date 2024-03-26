export const MAIN_CATEGORIES = {
	interior: {
		id: 1,
		label: 'Двери межкомнатные',
	},
	exterior: {
		id: 2,
		label: 'Двери входные',
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
			{ urlTo: `/categories/${MAIN_CATEGORIES.exterior.id}`, imgName: 'slide-3.jpg' },
			{ urlTo: `/categories/${MAIN_CATEGORIES.interior.id}`, imgName: 'slide-2.jpg' },
		],
		items: [
			{
				urlTo: `/categories/${MAIN_CATEGORIES.exterior.id}`,
				imgName: 'banner-small-1.jpg',
			},
			{ urlTo: null, imgName: 'banner-small-1.jpg' },
		],
	},
};

export const MAIN_NAV = {
	categoriesIds: [MAIN_CATEGORIES.exterior.id, MAIN_CATEGORIES.interior.id],
};

export const PRODUCT_PER_PAGE = 20;
