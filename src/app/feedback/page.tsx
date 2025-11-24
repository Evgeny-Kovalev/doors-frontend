import { Metadata } from 'next';

import { PageContainer } from '@/shared/components';
import { openGraph } from '../shared-metadata';
import { FeedbackForm } from '@/features/feedback';

export const metadata: Metadata = {
	title: 'Оставить отзыв',
	openGraph: {
		...openGraph,
		url: `${process.env.NEXT_PUBLIC_BASE_URL}/feedback`,
	},
};

export default async function Page() {
	return (
		<PageContainer boxClassName="flex items-center justify-center min-h-[400px]">
			<FeedbackForm />
		</PageContainer>
	);
}
