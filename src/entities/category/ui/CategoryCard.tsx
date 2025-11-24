import Image from 'next/image';
import Link from 'next/link';

import { CategoryApiResponse } from '@/shared/types';
import { Box, CardTitle } from '@/shared/ui';

interface CategoryCardProps {
	category: CategoryApiResponse;
}

export const CategoryCard = ({ category }: CategoryCardProps) => {
	return (
		<Link href={`/categories/${category.slug}`}>
			<Box className="group flex min-h-20 items-center gap-4 p-4 transition-transform duration-500 hover:-translate-y-1 hover:shadow-md md:p-3">
				<Image
					className="w-1/3"
					src={category.imgUrl}
					alt="Category image"
					width={200}
					height={100}
				/>
				<CardTitle className="w-2/3 text-xl transition-colors group-hover:text-primary-accent">
					{category.name}
				</CardTitle>
			</Box>
		</Link>
	);
};
