import { Metadata } from 'next';

import { PageTitle, PageContainer } from '@/shared/components';
import { openGraph } from '../shared-metadata';
import { fetchProductConstructorData } from '@/entities/product-constructor';
import { notFound } from 'next/navigation';
import { ProductConstructor } from '@/widgets/proudct-constructor';

export const metadata: Metadata = {
	title: 'Конструктор дверей',
	openGraph: {
		...openGraph,
		url: `${process.env.NEXT_PUBLIC_BASE_URL}/product-constructor`,
	},
};

export default async function Page() {
	const data = await fetchProductConstructorData();

	if (!data) return notFound();

	return (
		<PageContainer>
			<PageTitle className="max-md:mb-5">
				Конструктор входных дверей (производство г. Могилёв)
			</PageTitle>
			<ProductConstructor data={data} />
		</PageContainer>
	);
}
