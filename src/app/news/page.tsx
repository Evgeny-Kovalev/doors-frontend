import { Metadata } from 'next';

import { openGraph } from '@/app/shared-metadata';
import { PageContainer, PageTitle } from '@/shared/components';
import { Box } from '@/shared/ui';

import { fetchNewsList, NewsCard } from '@/entities/news';

export const metadata: Metadata = {
	title: 'Акции и новости',
	description: 'Актуальные новости и специальные предложения магазина.',
	openGraph: {
		...openGraph,
		url: `${process.env.NEXT_PUBLIC_BASE_URL}/news`,
		tags: ['новости', 'акции'],
	},
};

export default async function Page() {
	const newsList = await fetchNewsList();

	return (
		<PageContainer
			className="space-y-5"
			boxClassName="py-6"
			breadcrumbsItems={[
				{ label: 'Главная', href: '/' },
				{ label: 'Акции и новости', href: '/news' },
			]}
		>
			<div className="mb-10 space-y-3">
				<PageTitle className="mb-0">Акции и новости</PageTitle>
				<p className="text-muted-foreground max-w-2xl text-base">
					Актуальные новости и специальные предложения нашего магазина.
				</p>
			</div>
			{newsList && newsList.length > 0 ? (
				<ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
					{newsList.map((newsItem) => (
						<li key={newsItem.id}>
							<NewsCard newsItem={newsItem} />
						</li>
					))}
				</ul>
			) : (
				<Box className="text-muted-foreground px-4 py-10 text-center">
					Пока новостей и акций нет.
				</Box>
			)}
		</PageContainer>
	);
}
