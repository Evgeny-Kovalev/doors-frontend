import { CategoryApiResponse } from '@/shared/types';

export const fetchCategories = async (): Promise<CategoryApiResponse[] | null> => {
	const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/categories`);
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
