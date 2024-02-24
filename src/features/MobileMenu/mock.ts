import { type MenuItem } from './types';

export const CATEGORIES: MenuItem[] = [
	{
		id: 1,
		label: 'category_1',
		items: [
			{ id: 11, label: 'category_1_1' },
			{ id: 12, label: 'category_1_2' },
		],
	},
	{
		id: 2,
		label: 'category_2',
		items: [
			{
				id: 21,
				label: 'category_2_1',
				items: [
					{
						id: 211,
						label: 'category_2_1_1',
						items: [
							{ id: 2111, label: 'cetegory_2_1_1_1' },
							{ id: 2112, label: 'cetegory_2_1_1_2' },
							{ id: 2113, label: 'cetegory_2_1_1_3' },
						],
					},
					{ id: 212, label: 'category_2_1_2' },
				],
			},
			{ id: 22, label: 'category_2_2' },
		],
	},
	{
		id: 3,
		label: 'category 3',
	},
];
