import CategoryList from '@/features/categories/components/CategoryList';
import { fetchCategories } from '@/shared/api';
import PageContainer from '@/shared/components/layout/PageContainer';

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
