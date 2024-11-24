import { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { fetchCategories } from '@/shared/api';
import PageContainer from '@/shared/components/layout/PageContainer';
import { openGraph } from '../shared-metadata';

import { CategoryList } from '@/widgets/categories';

export const metadata: Metadata = {
	title: 'Контакты',
	openGraph: {
		...openGraph,
		url: `${process.env.NEXT_PUBLIC_BASE_URL}/shop`,
	},
};

interface PageProps {}

export default async function Page({}: PageProps) {
	const categories = await fetchCategories();

	if (!categories) return notFound();

	return (
		<PageContainer>
			<CategoryList
				categories={categories.filter((cat) => cat.parentCategoryId === null)}
			/>
		</PageContainer>
	);
}
