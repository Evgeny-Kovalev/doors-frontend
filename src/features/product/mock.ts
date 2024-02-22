import {
	AttributeApiResponse,
	ProductApiResponse,
	VariantApiResponse,
} from '../../shared/types/index';

const ATTRIBUTES: AttributeApiResponse[] = [
	{ id: 1, name: 'Color', value: 'White' },
	{ id: 0, name: 'Color', value: 'Black' },
	{ id: 2, name: 'Size', value: 'sm' },
	{ id: 3, name: 'Size', value: 'md' },
	{ id: 4, name: 'Type', value: 'Ok' },
	{ id: 5, name: 'Type', value: 'Not' },
];

export const VARIANTS: VariantApiResponse[] = [
	{
		id: 1,
		imgPath: process.env.TEST_IMG_PATH + 'da50be69e2df1c32e05be9d0c929ae2d.jpeg',
		price: 1,
		attributes: [ATTRIBUTES[0], ATTRIBUTES[3], ATTRIBUTES[5]],
	},
	{
		id: 2,
		imgPath: process.env.TEST_IMG_PATH + '64fa0c0706e6ffd02744af16f40dc5bf.jpeg',
		price: 2,
		attributes: [ATTRIBUTES[1], ATTRIBUTES[3], ATTRIBUTES[5]],
	},
	{
		id: 3,
		imgPath: process.env.TEST_IMG_PATH + '88387fbe3e05caa05f77f9c9708bf2ae.jpeg',
		price: 3,
		attributes: [ATTRIBUTES[0], ATTRIBUTES[2], ATTRIBUTES[5]],
	},
	{
		id: 4,
		imgPath: process.env.TEST_IMG_PATH + 'c3da4a2a3c93f0b32447aa07fac0e178.jpeg',
		price: 4,
		attributes: [ATTRIBUTES[1], ATTRIBUTES[2], ATTRIBUTES[5]],
	},
	// {
	// 	id: 5,
	// 	imgPath: 'img 5',
	// 	price: 5,
	// 	attributes: [ats[0], ats[3], ats[4]], //black md ok
	// },
	{
		id: 6,
		imgPath: process.env.TEST_IMG_PATH + '77e236c7d5e44e8888106608fc3fac12.jpeg',
		price: 6,
		attributes: [ATTRIBUTES[1], ATTRIBUTES[3], ATTRIBUTES[4]],
	},
	// {
	// 	id: 7,
	// 	imgPath: 'img 7',
	// 	price: 7,
	// 	attributes: [ATTRIBUTES[0], ATTRIBUTES[2], ATTRIBUTES[4]],
	// },
	// {
	// 	id: 8,
	// 	imgPath: 'img 8',
	// 	price: 8,
	// 	attributes: [ATTRIBUTES[1], ATTRIBUTES[2], ATTRIBUTES[4]],
	// },
];

export const PRODUCT: ProductApiResponse = {
	id: 1,
	description: `
		Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
		tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
		quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
		consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
		cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
		proident, sunt in culpa qui officia deserunt mollit anim id est laborum.Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
		tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
		quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
		consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
		cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
		proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
	`,
	imgPath: process.env.TEST_IMG_PATH + '8758543410f8f3b2663b74eaf9ab7741.jpeg',
	isVisible: true,
	name: 'DOOR TITLE 1',
	variants: VARIANTS,
};
