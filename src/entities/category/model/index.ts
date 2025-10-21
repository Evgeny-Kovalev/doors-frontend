import { CategoryApiResponse } from '@/shared/types';

export type CategoryTreeNode = CategoryApiResponse & { children: CategoryTreeNode[] };

export const buildCategoryTree = (
	categories: CategoryApiResponse[],
): CategoryTreeNode[] => {
	if (categories.length === 0) return [];

	const childrenByParentId = new Map<number | null, CategoryApiResponse[]>();
	for (const category of categories) {
		const parentId = (category.parentCategoryId ?? null) as number | null;
		const list = childrenByParentId.get(parentId) ?? [];
		list.push(category);
		childrenByParentId.set(parentId, list);
	}

	const buildNodes = (parentId: number | null): CategoryTreeNode[] => {
		const children = childrenByParentId.get(parentId) ?? [];
		return children
			.sort((a, b) => a.name.localeCompare(b.name))
			.map((cat) => ({
				...cat,
				children: buildNodes(cat.id),
			}));
	};

	return buildNodes(null);
};

export const mapCategoryTree = <T>(
	nodes: CategoryTreeNode[],
	mapFn: (node: CategoryTreeNode, mappedChildren: T[]) => T,
): T[] => {
	return nodes.map((node) => mapFn(node, mapCategoryTree(node.children, mapFn)));
};
