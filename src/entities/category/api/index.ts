import { CategoryApiResponse } from '@/shared/types';

interface FetchCategoriesQueryParams {
	parentCategorySlug?: string;
}

export const fetchCategories = async ({
	parentCategorySlug,
}: FetchCategoriesQueryParams = {}): Promise<CategoryApiResponse[] | null> => {
	const searchParams = new URLSearchParams();
	if (parentCategorySlug) {
		searchParams.set('parentCategorySlug', parentCategorySlug);
	}

	const res = await fetch(
		`${process.env.NEXT_PUBLIC_API_URL}/categories?${searchParams.toString()}`,
	);
	if (!res.ok) return null;
	const categories: CategoryApiResponse[] = await res.json();
	return categories;
};

export const fetchCategory = async (
	slug: string,
): Promise<CategoryApiResponse | null> => {
	const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/categories/${slug}`);
	if (!res.ok) return null;
	const category: CategoryApiResponse = await res.json();
	return category;
};

export const fetchCategoryHierarchy = async (
	slug: string,
): Promise<CategoryApiResponse[] | null> => {
	const res = await fetch(
		`${process.env.NEXT_PUBLIC_API_URL}/categories/${slug}/hierarchy`,
	);
	if (!res.ok) return null;
	const categories: CategoryApiResponse[] = await res.json();
	return categories;
};
