import { MAIN_NAV } from '@/shared/constants';
import { cn } from '@/shared/ui/utils';
import { MenuList } from './MenuList';
import { CategoryApiResponse } from '@/shared/types';

import styles from './styles.module.css';
import { TreeNode, arrayToTree } from '@/shared/utils';
import { treeToMenuItems } from '@/features/AppMenu/helpers';
import { IMenuItem } from '@/features/AppMenu/types';

interface DesktopMenuProps {
	categories: CategoryApiResponse[];
}

export const DesktopMenu = ({ categories }: DesktopMenuProps) => {
	const categoriesTree: TreeNode<CategoryApiResponse>[] =
		arrayToTree<CategoryApiResponse>(categories, null, 'parentCategoryId');

	const categoriesForMenu = categoriesTree
		.filter((cat) => MAIN_NAV.categoriesIds.includes(cat.id))
		.sort((a, b) => {
			return (
				MAIN_NAV.categoriesIds.indexOf(a.id) - MAIN_NAV.categoriesIds.indexOf(b.id)
			);
		});
	const categoriesMenuItems = treeToMenuItems(categoriesForMenu);

	const menuItems: IMenuItem[] = [
		{ label: 'Главная', link: '/' },
		{ label: 'Каталог', link: '/shop' },
		...categoriesMenuItems,
		{ label: 'Контакты', link: '/contacts' },
	];

	return (
		<nav className={cn(styles.nav, 'hidden bg-primary lg:block')}>
			<div className="container">
				<MenuList className="flex gap-5" items={menuItems} />
			</div>
		</nav>
	);
};
