import CategoryList from '@/features/categories/components/CategoryList';
import PageContainer from '@/shared/components/layout/PageContainer';
import { CategoryApiResponse } from '@/shared/types';

const fetchCategories = async (): Promise<CategoryApiResponse[]> => {
	const res = await fetch(`${process.env.API_URL}/categories`);
	const categories: CategoryApiResponse[] = await res.json();
	return categories;
};

interface PageProps {}

export default async function Page({}: PageProps) {
	const categories = await fetchCategories();

	return (
		<PageContainer>
			<CategoryList
				categories={categories.filter((cat) => cat.parentCategoryId === null)}
			/>
		</PageContainer>
	);
}
