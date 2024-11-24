import { CategoryApiResponse } from '@/shared/types';
import CategoryItem from './CategoryItem';
import { cn } from '@/shared/ui/utils';

interface CategoryListProps extends React.HTMLAttributes<HTMLUListElement> {
	categories: CategoryApiResponse[];
}

export const CategoryList = ({ categories, className, ...props }: CategoryListProps) => {
	return (
		<ul className={cn('grid grid-cols-2 gap-5 md:grid-cols-3', className)} {...props}>
			{categories.map((cat) => (
				<li key={cat.id}>
					<CategoryItem category={cat} />
				</li>
			))}
		</ul>
	);
};
