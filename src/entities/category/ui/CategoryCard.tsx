import Image from 'next/image';
import Link from 'next/link';

import { CategoryApiResponse } from '@/shared/types';
import { Badge, Box, CardTitle } from '@/shared/ui';

import { isCredit4ByCategorySlug } from '../model';

interface CategoryCardProps {
	category: CategoryApiResponse;
	orientation: 'horizontal' | 'vertical';
}

export const CategoryCard = ({ category, orientation }: CategoryCardProps) => {
	const isCredit4 = isCredit4ByCategorySlug(category.slug);

	return (
		<Link href={`/categories/${category.slug}`}>
			{orientation === 'vertical' ? (
				<Box className="group relative p-2 pb-3 lg:px-4">
					<Image
						className="mb-2 h-auto w-full"
						src={category.imgUrl}
						sizes="400px"
						width={300}
						height={150}
						alt="Category image"
						priority
					/>
					{isCredit4 && (
						<Badge className="absolute top-2 right-2 bg-red-600 hover:bg-red-600">
							Кредит&nbsp;4%&nbsp;до&nbsp;24&nbsp;мес.
						</Badge>
					)}
					<CardTitle className="group-hover:text-primary-accent mx-auto text-center text-lg leading-none transition-colors sm:text-xl">
						{category.name}
					</CardTitle>
				</Box>
			) : (
				<Box className="group flex min-h-20 items-center gap-4 p-4 transition-transform duration-500 hover:-translate-y-1 hover:shadow-md md:p-3">
					<div className="relative w-1/3">
						<Image
							src={category.imgUrl}
							alt="Category image"
							width={200}
							height={100}
						/>
						{isCredit4 && (
							<Badge className="absolute -bottom-2.5 left-1/2 -translate-x-1/2 animate-bounce bg-red-600 hover:bg-red-600">
								Кредит&nbsp;4%
							</Badge>
						)}
					</div>

					<CardTitle className="group-hover:text-primary-accent w-2/3 text-xl transition-colors">
						{category.name}
					</CardTitle>
				</Box>
			)}
		</Link>
	);
};
