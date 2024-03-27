import { cn } from '@/shared/ui/utils';
import { ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { IMenuItem } from '../../../types';
import { MenuList } from './MenuList';

import styles from './styles.module.css';

export const MenuItem = ({
	item,
	depthLevel,
}: {
	item: IMenuItem;
	depthLevel: number;
}) => {
	return (
		<li
			className={cn('relative', {
				'min-w-60 border-b last:border-none': depthLevel > 1,
			})}
		>
			<Link
				className={cn(
					'flex items-center justify-between p-3 transition-colors',
					{
						'relative border-none  py-3 text-white transition hover:text-yellow-400':
							depthLevel === 1,
					},
					{
						'hover:bg-primary-accent py-3 pl-5 pr-2 hover:text-white':
							depthLevel > 1,
					},
				)}
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
						styles.submenu,
						'absolute left-full top-0 z-50 hidden w-auto bg-white',
						{ 'left-0 top-full': depthLevel === 1 },
					)}
					items={item.children}
					depthLevel={depthLevel}
				/>
			)}
		</li>
	);
};
