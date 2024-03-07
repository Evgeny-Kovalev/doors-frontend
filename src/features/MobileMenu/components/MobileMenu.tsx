'use client';

import { type MenuItem } from '../types';
import { useMobileMenuStore } from '../store';
import { cn } from '@/shared/ui/utils';
import MobileMenuItems from './MenuItems';
import MobileMenuHeader from './Header';
import MobileMenuSubHeader from './SubHeader';
import { Menu } from 'lucide-react';

interface MobileMenuProps {
	items: MenuItem[];
}

export default function MobileMenu({ items }: MobileMenuProps) {
	const { isMobileMenuOpen, toggleMobileMenu } = useMobileMenuStore();

	return (
		<div
			className={cn({
				'fixed bottom-0 left-0 right-0 top-0 z-10 bg-white md:hidden':
					isMobileMenuOpen,
			})}
		>
			{isMobileMenuOpen && (
				<>
					<MobileMenuHeader />
					<MobileMenuSubHeader />
					<div className="container flex max-w-full bg-primary py-3 font-bold text-white">
						<Menu className="mr-2" />
						Каталог
					</div>
					<div className="flex-col justify-center">
						<MobileMenuItems items={items} />
					</div>
				</>
			)}
		</div>
	);
}
