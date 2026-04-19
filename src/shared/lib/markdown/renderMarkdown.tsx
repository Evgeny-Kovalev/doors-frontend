import Image from 'next/image';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import rehypeSanitize, { defaultSchema } from 'rehype-sanitize';
import remarkGfm from 'remark-gfm';

import { cn } from '@/shared/ui';

const mdHeading = 'mt-5 mb-2 font-extrabold leading-[1.2]';

interface MarkdownContentProps {
	content: string;
	baseUrl?: string;
	className?: string;
}

const sanitizeSchema = {
	...defaultSchema,
	tagNames: [
		...(defaultSchema.tagNames ?? []),
		'img',
		'h1',
		'h2',
		'h3',
		'h4',
		'h5',
		'h6',
	],
	attributes: {
		...defaultSchema.attributes,
		a: [...(defaultSchema.attributes?.a ?? []), 'target', 'rel'],
		img: ['src', 'alt', 'title', 'width', 'height', 'loading'],
		code: [...(defaultSchema.attributes?.code ?? []), 'className'],
	},
	protocols: {
		...defaultSchema.protocols,
		src: ['http', 'https', 'data'],
		href: ['http', 'https', 'mailto', 'tel'],
	},
};

export const MarkdownContent = ({ content, className }: MarkdownContentProps) => {
	return (
		<div
			className={cn(
				'max-w-none text-base leading-7 [&>*:first-child]:mt-0 [&>*:last-child]:mb-0',
				className,
			)}
		>
			<ReactMarkdown
				remarkPlugins={[remarkGfm]}
				rehypePlugins={[rehypeRaw, [rehypeSanitize, sanitizeSchema]]}
				components={{
					h1: ({ className, ...props }) => (
						<h1 className={cn(mdHeading, 'text-[1.75rem]', className)} {...props} />
					),
					h2: ({ className, ...props }) => (
						<h2 className={cn(mdHeading, 'text-2xl', className)} {...props} />
					),
					h3: ({ className, ...props }) => (
						<h3 className={cn(mdHeading, 'text-xl', className)} {...props} />
					),
					h4: ({ className, ...props }) => (
						<h4 className={cn(mdHeading, className)} {...props} />
					),
					h5: ({ className, ...props }) => (
						<h5 className={cn(mdHeading, className)} {...props} />
					),
					h6: ({ className, ...props }) => (
						<h6 className={cn(mdHeading, className)} {...props} />
					),
					p: ({ className, ...props }) => (
						<p className={cn('my-3', className)} {...props} />
					),
					ul: ({ className, ...props }) => (
						<ul className={cn('my-2 list-disc pl-5', className)} {...props} />
					),
					ol: ({ className, ...props }) => (
						<ol className={cn('my-2 list-decimal pl-5', className)} {...props} />
					),
					blockquote: ({ className, ...props }) => (
						<blockquote
							className={cn(
								'border-border text-muted-foreground my-3 border-l-2 pl-3',
								className,
							)}
							{...props}
						/>
					),
					a: ({ href, ...props }) => {
						const isExternal =
							href?.startsWith('https://') &&
							process.env.NEXT_PUBLIC_BASE_URL &&
							!href.startsWith(process.env.NEXT_PUBLIC_BASE_URL);

						return (
							<a
								{...props}
								href={href}
								target={isExternal ? '_blank' : undefined}
								rel={isExternal ? 'noopener noreferrer nofollow' : undefined}
								className={cn(
									'text-primary decoration-primary/50 hover:decoration-primary underline underline-offset-3',
									props.className,
								)}
							/>
						);
					},
					img: ({ src, alt, title, className }) => {
						if (typeof src === 'string') {
							return (
								<Image
									src={src}
									alt={alt ?? 'News image'}
									title={title}
									width={1000}
									height={1000}
									loading="lazy"
									className={cn(
										'mx-auto my-4 block h-auto max-h-[70vh] max-w-full rounded-lg object-contain',
										className,
									)}
								/>
							);
						} else return null;
					},
				}}
			>
				{content}
			</ReactMarkdown>
		</div>
	);
};
