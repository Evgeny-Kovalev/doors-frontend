import Link from 'next/link';
import Image from 'next/image';

import { Badge, Box } from '@/shared/ui';
import { NewsPreviewApiResponse } from '@/shared/types';

interface NewsCardProps {
	newsItem: NewsPreviewApiResponse;
}

const formatDate = (dateString: string) => {
	const date = new Date(dateString);
	return new Intl.DateTimeFormat('ru-RU', {
		day: '2-digit',
		month: 'long',
		year: 'numeric',
	}).format(date);
};

export const NewsCard = ({ newsItem }: NewsCardProps) => {
	return (
		<Link href={`/news/${newsItem.slug}`} className="block h-full">
			<Box className="flex h-full flex-col gap-2 p-3 transition-transform duration-300 hover:-translate-y-1 hover:shadow-md md:p-4">
				<Image
					src={newsItem.coverImageUrl}
					alt={newsItem.title}
					width={560}
					height={315}
					placeholder="blur"
					blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mN8+vx1PQAIqAM4jZDFJQAAAABJRU5ErkJggg=="
					className="h-auto w-full rounded-md object-cover"
				/>
				<div className="flex items-center justify-between gap-3">
					<Badge>{newsItem.type === 'promotion' ? 'Акция' : 'Новость'}</Badge>
					<time className="text-muted-foreground text-sm">
						{formatDate(newsItem.publishedAt)}
					</time>
				</div>
				<h2 className="text-xl font-bold">{newsItem.title}</h2>
			</Box>
		</Link>
	);
};
