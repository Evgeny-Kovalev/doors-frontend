import { Metadata } from 'next';

import { PageContainer, PageTitle } from '@/shared/components';

import { FavoritesProducts } from '@/features/favorites';
import { openGraph } from '../shared-metadata';

export const metadata: Metadata = {
	title: 'Избранное',
	openGraph: {
		...openGraph,
		url: `${process.env.NEXT_PUBLIC_BASE_URL}/favorites`,
	},
};

export default function Page() {
	return (
		<PageContainer
			title="Список избранного"
			breadcrumbsItems={[
				{ label: 'Главная', href: '/' },
				{ label: 'Избранное', href: '/favorites' },
			]}
		>
			<PageTitle>Список избранного</PageTitle>
			<FavoritesProducts />
		</PageContainer>
	);
}
