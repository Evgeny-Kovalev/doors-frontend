'use client';

import { useEffect } from 'react';
import { Menu } from 'lucide-react';

import { cn } from '@/shared/ui/utils';
import { CategoryApiResponse } from '@/shared/types';

import { useMobileMenuStore } from '../../model';
import MobileMenuHeader from './MobileMenuHeader';
import MobileMenuSubHeader from './SubHeader';
import CategoryMobileNav from './CategoryMobileNav';
import { mapCategoriesToMenuItems } from '../../lib';
import { IMenuItem } from '../../types';

interface MobileMenuProps {
	categories: CategoryApiResponse[];
}

export const MobileMenu = ({ categories }: MobileMenuProps) => {
	const { isMobileMenuOpen } = useMobileMenuStore();

	const menuItems: IMenuItem[] = [
		...mapCategoriesToMenuItems(categories),
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
};
