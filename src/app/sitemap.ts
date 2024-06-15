import { fetchCategories } from '@/shared/api';
import { MetadataRoute } from 'next';
import { convertCategoriesToFlattenArray } from '@/shared/utils';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
	const defaultPages = [
		{
			url: `${process.env.NEXT_PUBLIC_BASE_URL}`,
			priority: 1,
		},
		{
			url: `${process.env.NEXT_PUBLIC_BASE_URL}/contacts`,
			priority: 0.8,
		},
	];

	const categories = await fetchCategories();

	const sitemap = [...defaultPages];

	if (categories && categories.length > 0) {
		const categoriesArr = convertCategoriesToFlattenArray(categories);

		sitemap.push(
			...categoriesArr.map((cat) => ({
				url: `${process.env.NEXT_PUBLIC_BASE_URL}/categories/${cat.slug}`,
				priority: 0.9,
			})),
		);
	}

	return sitemap;
}
