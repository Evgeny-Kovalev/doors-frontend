import Image from 'next/image';
import Link from 'next/link';

import { CategoryApiResponse } from '@/shared/types';
import { Box } from '@/shared/ui/box';
import { CardTitle } from '@/shared/ui/card';

interface CategoryCardProps {
	category: CategoryApiResponse;
}

export const CategoryCard = ({ category }: CategoryCardProps) => {
	return (
		<Link href={`/categories/${category.slug}`}>
			<Box className="group flex items-center gap-4 transition-transform duration-500 hover:-translate-y-2 hover:shadow-md">
				<Image
					className="w-1/3"
					src={category.imgUrl}
					alt={category.name}
					width={200}
					height={100}
				/>
				<CardTitle className="w-2/3 text-xl transition-colors group-hover:text-primary-accent md:text-2xl">
					{category.name}
				</CardTitle>
			</Box>
		</Link>
	);
};
