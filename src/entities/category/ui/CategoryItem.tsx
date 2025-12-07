import Image from 'next/image';
import Link from 'next/link';
import { CategoryApiResponse } from '@/shared/types';
import { CardTitle, Box } from '@/shared/ui';

interface CategoryItemProps {
	category: CategoryApiResponse;
}

export default function CategoryItem({ category }: CategoryItemProps) {
	return (
		<Box className="p-2 pb-3 transition-[transform,shadow] duration-300 hover:-translate-y-1 lg:px-4">
			<Link href={`/categories/${category.slug}`}>
				<Image
					className="mb-2 h-auto w-full"
					src={category.imgUrl}
					sizes="400px"
					width={500}
					height={500}
					alt="Category image"
					priority
				/>
				<CardTitle className="mx-auto text-center text-lg leading-none transition-colors hover:text-primary-accent sm:text-xl">
					{category.name}
				</CardTitle>
			</Link>
		</Box>
	);
}
