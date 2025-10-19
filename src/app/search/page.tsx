import { Suspense } from 'react';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';

import { BoxContainer, PageTitle } from '@/shared/components';
import { PRODUCT_PER_PAGE } from '@/shared/constants';

import { ProductSearchResults } from '@/widgets/products/ProductSearchResults';
import { ProductsCardsSkeleton } from '@/widgets/products/ProductCards';

type PageProps = {
	searchParams: Promise<{ [key: string]: string | undefined }>;
};

export const metadata: Metadata = {
	robots: {
		index: false,
		follow: false,
	},
};

export default async function Page(props: PageProps) {
	const searchParams = await props.searchParams;
	const currentPage = Number(searchParams['page'] ?? '1');
	const limit = Number(searchParams['limit'] ?? PRODUCT_PER_PAGE);

	if (!searchParams['q']) return notFound();

	return (
		<BoxContainer>
			<PageTitle>Результаты по запросу: {searchParams['q']}</PageTitle>
			<Suspense
				key={searchParams['q'] + currentPage}
				fallback={<ProductsCardsSkeleton />}
			>
				<ProductSearchResults
					q={searchParams['q']}
					currentPage={currentPage}
					limit={limit}
				/>
			</Suspense>
		</BoxContainer>
	);
}
