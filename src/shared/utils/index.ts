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
	const stack: TreeNode<Node & { id: IdType }>[] = [...trees];

	while (stack.length > 0) {
		const item = stack[0];
		if (item.id === id) return item;
		stack.shift();
		stack.push(...item.children);
	}
	return null;
}
