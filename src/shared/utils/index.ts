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

export function findNodeById<Node, IdType>(
	trees: TreeNode<Node & { id: IdType }>[],
	id: IdType,
): TreeNode<Node> | null {
	let result: TreeNode<Node> | null = null;

	for (const tree of trees) {
		if (tree.id === id) {
			return tree;
		}

		if (tree.children && tree.children.length > 0) {
			tree.children.some((node) => {
				result = findNodeById(tree.children, id);
				return result;
			});
		}
	}
	return result;
}
