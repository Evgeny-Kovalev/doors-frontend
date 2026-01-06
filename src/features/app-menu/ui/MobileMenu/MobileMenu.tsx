'use client';

import { useEffect } from 'react';
import { Menu } from 'lucide-react';

import { Drawer, DrawerContent, DrawerDescription, DrawerTitle } from '@/shared/ui';
import { CategoryApiResponse } from '@/shared/types';

import { useMobileMenuStore } from '../../hooks/useMobileMenuStore';
import MobileMenuHeader from './MobileMenuHeader';
import MobileMenuSubHeader from './SubHeader';
import CategoryMobileNav from './CategoryMobileNav';
import { mapCategoriesToMenuItems } from '../../model';
import { IMenuItem } from '../../types';

interface MobileMenuProps {
	categories: CategoryApiResponse[];
}

export const MobileMenu = ({ categories }: MobileMenuProps) => {
	const { isMobileMenuOpen, toggleMobileMenu } = useMobileMenuStore();

	const menuItems: IMenuItem[] = [
		...mapCategoriesToMenuItems(categories),
		{
			label: 'Конструктор дверей',
			link: '/product-constructor',
			slug: 'product-constructor',
		},
		{
			label: 'Контакты',
			link: '/contacts',
			slug: 'contacts',
		},
	];

	useEffect(() => {
		isMobileMenuOpen
			? (document.body.style.overflow = 'hidden')
			: (document.body.style.overflow = 'auto');
	}, [isMobileMenuOpen]);

	return (
		<Drawer
			direction="right"
			repositionInputs={false}
			open={isMobileMenuOpen}
			onOpenChange={toggleMobileMenu}
		>
			<DrawerContent className="!w-full border-none">
				<DrawerTitle className="sr-only">Меню</DrawerTitle>
				<DrawerDescription className="sr-only">
					Для мобильных устройств
				</DrawerDescription>
				<div className="pb-safe overflow-x-hidden">
					<MobileMenuHeader />
					<MobileMenuSubHeader />
					<div className="container flex max-w-full bg-primary py-3 font-bold text-white">
						<Menu className="mr-2" />
						Каталог
					</div>
					<CategoryMobileNav items={menuItems} />
				</div>
			</DrawerContent>
		</Drawer>
	);
};
