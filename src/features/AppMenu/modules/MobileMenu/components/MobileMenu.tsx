'use client';

import { useMobileMenuStore } from '../store';
import { cn } from '@/shared/ui/utils';
import MobileMenuHeader from './MobileMenuHeader';
import MobileMenuSubHeader from './SubHeader';
import { Menu } from 'lucide-react';
import CategoryMobileNav from './CategoryMobileNav';
import { CategoryApiResponse } from '@/shared/types';
import { categoriesToMenuItems } from '../../../helpers';
import { IMenuItem } from '@/features/AppMenu/types';
import { useEffect } from 'react';

interface MobileMenuProps {
	categories: CategoryApiResponse[];
}

export default function MobileMenu({ categories }: MobileMenuProps) {
	const { isMobileMenuOpen } = useMobileMenuStore();

	const menuItems: IMenuItem[] = [
		...categoriesToMenuItems(categories),
		{
			label: 'Контакты',
			link: '/contacts',
		},
	];

	useEffect(() => {
		isMobileMenuOpen
			? (document.body.style.overflow = 'hidden')
			: (document.body.style.overflow = 'auto');
	}, [isMobileMenuOpen]);

	return (
		<div
			className={cn(
				'fixed -left-full top-0 z-20 h-full w-full overflow-x-hidden bg-white duration-300 lg:hidden',
				{
					'visible left-0': isMobileMenuOpen,
					invisible: !isMobileMenuOpen,
				},
			)}
		>
			<MobileMenuHeader />
			<MobileMenuSubHeader />
			<div className="container flex max-w-full bg-primary py-3 font-bold text-white">
				<Menu className="mr-2" />
				Каталог
			</div>
			<CategoryMobileNav items={menuItems} />
		</div>
	);
}
