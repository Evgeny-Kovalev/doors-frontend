import { cn } from '@/shared/ui/utils';
import { MenuItem } from './MenuItem';
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
