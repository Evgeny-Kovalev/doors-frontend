import { NewsPreviewApiResponse } from '@/shared/types';

export const fetchNewsList = async (): Promise<NewsPreviewApiResponse[] | null> => {
	const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/news`);
	if (!res.ok) return null;
	const newsList: NewsPreviewApiResponse[] = await res.json();
	return newsList;
};

export const fetchNewsBySlug = async (
	slug: string,
): Promise<NewsPreviewApiResponse | null> => {
	const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/news/${slug}`);
	if (!res.ok) return null;
	const newsItem: NewsPreviewApiResponse = await res.json();
	return newsItem;
};
