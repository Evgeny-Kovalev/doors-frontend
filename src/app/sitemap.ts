import { fetchCategories } from '@/entities/category';
import { MetadataRoute } from 'next';
import { fetchNewsList } from '../entities/news';

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
		sitemap.push(
			...categories.map((cat) => ({
				url: `${process.env.NEXT_PUBLIC_BASE_URL}/categories/${cat.slug}`,
				priority: 0.9,
			})),
		);
	}

	const news = await fetchNewsList();

	if (news && news.length > 0) {
		sitemap.push(
			...news.map((n) => ({
				url: `${process.env.NEXT_PUBLIC_BASE_URL}/news/${n.slug}`,
				priority: 0.8,
			})),
		);
	}

	return sitemap;
}
