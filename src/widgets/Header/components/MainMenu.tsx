import { MobileMenu } from '@/features/MobileMenu';
import { type MenuItem } from '@/features/MobileMenu';
import DesktopMenu from './DesktopMenu';
import { addBackItem } from '../helpers';
import { CategoryApiResponse } from '@/shared/types';
import { TreeNode, arrayToTree } from '@/shared/utils';

const getMenuItems = async (): Promise<MenuItem[]> => {
	const res = await fetch(`${process.env.API_URL}/categories`);
	const categories: CategoryApiResponse[] = await res.json();

	const categoriesTree: TreeNode<CategoryApiResponse>[] =
		arrayToTree<CategoryApiResponse>(categories, null, 'parentCategoryId');

	const treeToMenuItems = (items: TreeNode<CategoryApiResponse>[]): MenuItem[] => {
		return items.map((item) => ({
			id: item.id,
			label: item.name,
			items: item.children.length ? treeToMenuItems(item.children) : [],
		}));
	};

	return treeToMenuItems(categoriesTree);
};

interface MainMenuProps {}

export default async function MainMenu({}: MainMenuProps) {
	const items = await getMenuItems();

	return (
		<>
			<DesktopMenu />

			<MobileMenu items={addBackItem(items)} />
		</>
	);
}
