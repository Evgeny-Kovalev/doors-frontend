import { Metadata } from 'next';
import Image from 'next/image';
import { notFound } from 'next/navigation';

import { openGraph } from '@/app/shared-metadata';

import { PageContainer } from '@/shared/components';
import { Badge } from '@/shared/ui';
import { limitMetadataDescription } from '@/shared/utils';
import { fetchMarkdownByUrl, MarkdownContent } from '@/shared/lib/markdown';

import { fetchNewsBySlug } from '@/entities/news';

interface PageProps {
	params: Promise<{
		slug: string;
	}>;
}

const formatDate = (dateString: string) => {
	const date = new Date(dateString);
	return new Intl.DateTimeFormat('ru-RU', {
		day: '2-digit',
		month: 'long',
		year: 'numeric',
	}).format(date);
};

export async function generateMetadata(props: PageProps): Promise<Metadata | null> {
	const params = await props.params;
	const newsItem = await fetchNewsBySlug(params.slug);
	if (!newsItem) return null;

	return {
		title: newsItem.title,
		description: limitMetadataDescription(newsItem.description),
		openGraph: {
			...openGraph,
			url: `${process.env.NEXT_PUBLIC_BASE_URL}/news/${newsItem.slug}`,
			tags: ['новости', 'акции', newsItem.title],
		},
	};
}

export default async function Page(props: PageProps) {
	const params = await props.params;
	const newsItem = await fetchNewsBySlug(params.slug);

	if (!newsItem) return notFound();

	const content = await fetchMarkdownByUrl(newsItem.markdownUrl);
	if (!content) return notFound();

	const breadcrumbsItems = [
		{ label: 'Главная', href: '/' },
		{ label: 'Акции и новости', href: '/news' },
		{ label: newsItem.title, href: `/news/${newsItem.slug}` },
	];

	return (
		<PageContainer
			className="space-y-6"
			boxClassName="py-6 md:py-8"
			breadcrumbsItems={breadcrumbsItems}
		>
			<div className="mx-auto max-w-4xl space-y-8">
				<header className="space-y-3">
					<div className="text-muted-foreground flex flex-wrap items-center gap-x-2 gap-y-1 text-xs font-medium tracking-wide uppercase">
						<Badge className="font-normal normal-case">
							{newsItem.type === 'promotion' ? 'Акция' : 'Новость'}
						</Badge>
						<span aria-hidden className="text-border">
							·
						</span>
						<time dateTime={newsItem.publishedAt}>
							{formatDate(newsItem.publishedAt)}
						</time>
					</div>
					<h1 className="text-3xl font-bold tracking-tight md:text-4xl lg:text-[2.5rem] lg:leading-tight">
						{newsItem.title}
					</h1>
					<Image
						src={newsItem.coverImageUrl}
						width={1200}
						height={675}
						alt="Cover image"
						className="rounded-lg"
						placeholder="blur"
						blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mN8+vx1PQAIqAM4jZDFJQAAAABJRU5ErkJggg=="
					/>
				</header>
				<div className="px-2 sm:px-5 md:px-8">
					<MarkdownContent content={content} />
				</div>
			</div>
		</PageContainer>
	);
}
