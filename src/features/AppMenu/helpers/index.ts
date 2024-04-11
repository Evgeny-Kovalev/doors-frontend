import { CategoryApiResponse } from '@/shared/types';
import { IMenuItem } from '../types';

export const categoriesToMenuItems = (categories: CategoryApiResponse[]): IMenuItem[] => {
	return categories.map((item) => ({
		id: item.id,
		link: `/categories/${item.id}`,
		label: item.name,
		children: item.children.length ? categoriesToMenuItems(item.children) : undefined,
	}));
};
