import { cn } from '@/shared/ui/utils';
import React from 'react';

const Box = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
	({ className, ...props }, ref) => (
		<div
			ref={ref}
			className={cn(
				'rounded-lg border bg-card p-6 text-card-foreground shadow-sm',
				className,
			)}
			{...props}
		/>
	),
);

Box.displayName = 'Box';

export { Box };
