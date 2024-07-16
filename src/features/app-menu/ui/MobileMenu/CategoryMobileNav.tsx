import { useState } from 'react';
import { MoveLeft, ChevronRight } from 'lucide-react';

import { useMobileMenuStore } from '../../model';
import Link from 'next/link';
import { IMenuItem } from '../../types';

interface MobileCategoryNavProps {
	items: IMenuItem[];
}

export default function CategoryMobileNav({ items }: MobileCategoryNavProps) {
	const { toggleMobileMenu } = useMobileMenuStore();

	const [level, setLevel] = useState(1);
	const [currnetMenu, setCurrnetMenu] = useState<IMenuItem[][]>([items]);

	const [selectedItemPrev, setSelectedItemPrev] = useState<IMenuItem | null>(null);
	const [selectedItem, setSelectedItem] = useState<IMenuItem | null>(null);

	const selectLevel = (level: number, item: IMenuItem, menu?: IMenuItem[]) => {
		setSelectedItem((prev) => {
			setSelectedItemPrev(prev);
			return item;
		});

		if (!menu) return;
		setLevel(level);
		setCurrnetMenu((l) => {
			l[level] = menu;
			return l;
		});
	};

	const backLevel = () => {
		setSelectedItem(selectedItemPrev);
		setLevel(level - 1);
		setCurrnetMenu((l) => {
			l[level] = [];
			return l;
		});
	};

	return (
		<>
			{level > 1 && (
				<button
					className="ITEM flex w-full items-center border-b-2 border-gray-300 px-5 py-4 "
					onClick={backLevel}
				>
					<MoveLeft className="mr-3" />
					Назад
				</button>
			)}
			<nav
				role="navigation"
				className="flex transition-transform"
				style={{
					transform: `translateX(calc(-100% * ${level - 1} ) )`,
				}}
			>
				{currnetMenu.map((item, i) => (
					<ul className="min-w-full" key={i}>
						{level > 1 && selectedItem && (
							<li>
								<Link
									href={selectedItem.link}
									onClick={toggleMobileMenu}
									className="block border-b px-5 py-4 text-primary"
								>
									Посмотреть все товары
								</Link>
							</li>
						)}
						{item.map((m) => {
							return m.children ? (
								<li
									className="flex cursor-pointer items-center justify-between border-b px-5 py-4"
									key={m.label}
									onClick={() => selectLevel(level + 1, m, m.children)}
								>
									{m.label}
									<ChevronRight height={20} className="text-gray-400" />
								</li>
							) : (
								<li className="border-b" key={m.label}>
									<Link
										className="block px-5 py-4"
										onClick={toggleMobileMenu}
										href={m.link}
									>
										{m.label}
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
