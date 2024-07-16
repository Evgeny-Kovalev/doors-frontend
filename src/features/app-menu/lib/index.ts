import { CategoryApiResponse } from '@/shared/types';
import { IMenuItem } from '../types';

export const mapCategoriesToMenuItems = (
	categories: CategoryApiResponse[],
): IMenuItem[] => {
	return categories.map((item) => ({
		id: item.id,
		link: `/categories/${item.slug}`,
		label: item.name,
		children: item.children.length
			? mapCategoriesToMenuItems(item.children)
			: undefined,
	}));
};
