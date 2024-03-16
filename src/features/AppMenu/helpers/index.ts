import { CategoryApiResponse } from '@/shared/types';
import { TreeNode, arrayToTree } from '@/shared/utils';
import { IMenuItem } from '../types';

export const treeToMenuItems = (items: TreeNode<CategoryApiResponse>[]): IMenuItem[] => {
	return items.map((item) => ({
		id: item.id,
		link: `/categories/${item.id}`,
		label: item.name,
		children: item.children.length ? treeToMenuItems(item.children) : undefined,
	}));
};

export const categoriesToMenuItems = (categories: CategoryApiResponse[]) => {
	const categoriesTrees: TreeNode<CategoryApiResponse>[] =
		arrayToTree<CategoryApiResponse>(categories, null, 'parentCategoryId');
	return treeToMenuItems(categoriesTrees);
};
