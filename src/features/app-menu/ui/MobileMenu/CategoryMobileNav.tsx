import { useState } from 'react';
import Link from 'next/link';
import { MoveLeft, ChevronRight } from 'lucide-react';

import { Badge } from '@/shared/ui';

import { isCredit4ByCategorySlug } from '@/entities/category';

import { useMobileMenuStore } from '../../hooks/useMobileMenuStore';
import { IMenuItem } from '../../types';

interface MobileCategoryNavProps {
	items: IMenuItem[];
}

export default function CategoryMobileNav({ items }: MobileCategoryNavProps) {
	const { toggleMobileMenu } = useMobileMenuStore();

	const [level, setLevel] = useState(1);
	const [currentMenu, setCurrentMenu] = useState<IMenuItem[][]>([items]);

	const [selectedItemPrev, setSelectedItemPrev] = useState<IMenuItem | null>(null);
	const [selectedItem, setSelectedItem] = useState<IMenuItem | null>(null);

	const selectLevel = (level: number, item: IMenuItem, menu?: IMenuItem[]) => {
		setSelectedItem((prev) => {
			setSelectedItemPrev(prev);
			return item;
		});

		if (!menu) return;
		setLevel(level);
		setCurrentMenu((l) => {
			l[level] = menu;
			return l;
		});
	};

	const backLevel = () => {
		setSelectedItem(selectedItemPrev);
		setLevel(level - 1);
		setCurrentMenu((l) => {
			l[level] = [];
			return l;
		});
	};

	return (
		<>
			{level > 1 && (
				<button
					className="flex w-full items-center border-b-2 border-gray-100 px-4 py-3"
					onClick={backLevel}
				>
					<MoveLeft className="mr-3" />
					Назад
				</button>
			)}
			<nav
				role="navigation"
				className="flex transition-transform will-change-transform"
				style={{
					transform: `translateX(calc(-100% * ${level - 1}))`,
				}}
			>
				{currentMenu.map((item, i) => (
					<ul className="min-w-full" key={i}>
						{level > 1 && selectedItem && (
							<li>
								<Link
									href={selectedItem.link}
									onClick={toggleMobileMenu}
									className="text-primary block border-b px-4 py-3"
								>
									Посмотреть все товары
								</Link>
							</li>
						)}
						{item.map((m) => {
							const isCredit4 = isCredit4ByCategorySlug(m.slug);
							return m.children ? (
								<li className="border-b" key={m.label}>
									<button
										className="flex w-full cursor-pointer items-center justify-between px-4 py-3"
										onClick={() => selectLevel(level + 1, m, m.children)}
									>
										<div className="flex items-center gap-2">
											<span>{m.label}</span>
											{isCredit4 && <Badge variant="red">4%</Badge>}
										</div>
										<ChevronRight height={20} className="text-gray-400" />
									</button>
								</li>
							) : (
								<li className="border-b" key={m.label}>
									<Link
										className="flex items-center gap-2 px-4 py-3"
										onClick={toggleMobileMenu}
										href={m.link}
									>
										<span>{m.label}</span>
										{isCredit4 && <Badge variant="red">4%</Badge>}
									</Link>
								</li>
							);
						})}
					</ul>
				))}
			</nav>
		</>
	);
}
