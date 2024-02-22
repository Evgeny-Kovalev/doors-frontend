import { Input } from '@/shared/ui/input';
import { cn } from '@/shared/ui/utils';
import { Search } from 'lucide-react';
import React from 'react';

interface Props extends React.HTMLAttributes<HTMLDivElement> {}

export default function SearchBox({ className, ...props }: Props) {
	return (
		<div className={cn('relative', className)} {...props}>
			<Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
			<Input placeholder="Search" className="pl-8" />
		</div>
		// <input
		// 	className="block w-full rounded-full border-2 border-primary px-5 py-1"
		// 	placeholder="Search..."
		// />
	);
}
