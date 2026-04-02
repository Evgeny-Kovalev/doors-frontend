import { cn } from '@/shared/ui';
import React from 'react';

const Box = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
	({ className, ...props }, ref) => (
		<div
			ref={ref}
			className={cn(
				'bg-card text-card-foreground rounded-lg border p-6 shadow-xs',
				className,
			)}
			{...props}
		/>
	),
);

Box.displayName = 'Box';

export { Box };
