import { cn } from '@/shared/ui';
import React from 'react';

interface PageTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {}

export function PageTitle({ children, className, ...props }: PageTitleProps) {
	return (
		<h1
			className={cn(
				'mb-10 scroll-m-20 text-3xl font-extrabold tracking-tight lg:text-4xl',
				className,
			)}
			{...props}
		>
			{children}
		</h1>
	);
}
