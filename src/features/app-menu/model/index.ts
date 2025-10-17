import { CategoryApiResponse } from '@/shared/types';
import { IMenuItem } from '../types';
import { buildCategoryTree, mapCategoryTree } from '@/entities/category';

export const mapCategoriesToMenuItems = (
	categories: CategoryApiResponse[],
): IMenuItem[] => {
	const tree = buildCategoryTree(categories);
	return mapCategoryTree<IMenuItem>(tree, (node, children) => ({
		slug: node.slug,
		label: node.name,
		link: `/categories/${node.slug}`,
		...(children.length > 0 ? { children } : {}),
	}));
};
