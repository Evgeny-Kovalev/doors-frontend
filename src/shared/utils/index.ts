export type TreeNode<Node> = Node & { children: TreeNode<Node>[] };

export const arrayToTree = <T extends { id: number }>(
	items: T[],
	parentId: number | null = null,
	parentKey: keyof T,
): TreeNode<T>[] => {
	return items
		.filter((item) => item[parentKey] === parentId)
		.map((item) => ({
			...item,
			children: arrayToTree(items, item.id, parentKey),
		}));
};
