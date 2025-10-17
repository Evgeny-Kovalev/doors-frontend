import { MAIN_NAV } from '@/shared/constants';
import { cn } from '@/shared/ui';
import { CategoryApiResponse } from '@/shared/types';

import { MenuList } from './MenuList';
import styles from './styles.module.css';
import { mapCategoriesToMenuItems } from '../../model';
import { IMenuItem } from '../../types';

interface DesktopMenuProps {
	categories: CategoryApiResponse[];
}

export const DesktopMenu = ({ categories }: DesktopMenuProps) => {
	const categoriesForMenu = categories.filter(
		(cat) => !MAIN_NAV.hiddenCategoriesSlugs.includes(cat.slug),
	);

	const categoriesMenuItems = mapCategoriesToMenuItems(categoriesForMenu);

	const menuItems: IMenuItem[] = [
		{ label: 'Главная', link: '/', slug: 'home' },
		...categoriesMenuItems,
		{ label: 'Контакты', link: '/contacts', slug: 'contacts' },
	];

	return (
		<nav
			className={cn(
				styles.nav,
				'sticky top-0 z-20 hidden bg-primary shadow-lg lg:block',
			)}
		>
			<div className="container">
				<MenuList className="flex gap-5" items={menuItems} />
			</div>
		</nav>
	);
};
