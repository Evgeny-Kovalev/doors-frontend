import Image from 'next/image';
import Link from 'next/link';
import { CategoryApiResponse } from '@/shared/types';
import { Card, CardHeader, CardFooter, CardTitle } from '@/shared/ui/card';

interface CategoryItemProps {
	category: CategoryApiResponse;
}

export default function CategoryItem({ category }: CategoryItemProps) {
	return (
		<Card className="transition-shadow duration-300 hover:shadow-lg">
			<Link href={`/categories/${category.id}`}>
				<CardHeader className="relative p-2 sm:p-3 md:p-4 lg:p-6">
					<Image
						className="h-auto w-full duration-300 hover:-translate-y-1"
						src={category.imgUrl}
						sizes="400px"
						width={0}
						height={0}
						alt="Category image"
						priority
					/>
				</CardHeader>
				<CardFooter className="p-2 !pt-0 sm:p-3 md:p-4 lg:p-6">
					<CardTitle className="hover:text-primary-accent mx-auto text-center text-lg transition-colors sm:text-xl md:text-2xl">
						{category.name}
					</CardTitle>
				</CardFooter>
			</Link>
		</Card>
	);
}
