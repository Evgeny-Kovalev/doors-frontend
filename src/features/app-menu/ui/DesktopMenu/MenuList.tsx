import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

import { cn } from '@/shared/ui';

import { IMenuItem } from '../../types';

export const MenuList = ({
	items,
	className,
	depthLevel = 0,
}: {
	items: IMenuItem[];
	className?: string;
	depthLevel?: number;
}) => {
	const level = depthLevel + 1;
	return (
		<ul className={cn(className)}>
			{items.map((item) => (
				<MenuItem key={item.link} item={item} depthLevel={level} />
			))}
		</ul>
	);
};

const MenuItem = ({ item, depthLevel }: { item: IMenuItem; depthLevel: number }) => {
	return (
		<li
			className={cn('relative focus-within:[&>ul]:block hover:[&>ul]:block', {
				'min-w-60 border-b last:border-none': depthLevel > 1,
			})}
		>
			<Link
				className={cn('flex items-center justify-between p-3 transition-colors', {
					'relative border-none py-3 text-white transition hover:text-yellow-400':
						depthLevel === 1,
					'hover:bg-primary-accent py-3 pr-2 pl-5 hover:text-white': depthLevel > 1,
				})}
				href={item.link}
			>
				{item.label}
				{depthLevel > 1 && item.children && (
					<ChevronRight className="text-gray-400" />
				)}
			</Link>

			{item.children && (
				<MenuList
					className={cn(
						'absolute top-0 left-full z-50 hidden w-auto bg-white shadow-lg',
						{ 'top-full left-0': depthLevel === 1 },
					)}
					items={item.children}
					depthLevel={depthLevel}
				/>
			)}
		</li>
	);
};
