'use client';

import React, { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Search } from 'lucide-react';

import { Button } from '@/shared/ui/button';
import { Input } from '@/shared/ui/input';
import { cn } from '@/shared/ui/utils';

interface Props extends React.HTMLAttributes<HTMLDivElement> {
	onSearchButtonClick?: () => void;
}

export const SearchBox = ({ className, onSearchButtonClick, ...props }: Props) => {
	const searchParams = useSearchParams();
	const router = useRouter();

	const [value, setValue] = useState<string>(searchParams.get('q') ?? '');

	const updateSearchParams = () => {
		if (!value) return;

		const params = new URLSearchParams(searchParams.toString());
		params.set('page', '1');
		params.set('q', value);
		onSearchButtonClick && onSearchButtonClick();
		return router.push(`/search?${params.toString()}`);
	};

	const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === 'Enter') updateSearchParams();
	};

	return (
		<div className={cn('relative flex', className)} {...props}>
			<Input
				value={value}
				onChange={(e) => setValue(e.target.value)}
				onKeyDown={handleKeyDown}
				placeholder="Поиск дверей"
				className="rounded-r-none border-r-0"
			/>
			<Button onClick={updateSearchParams} className="rounded-l-none">
				<Search className="h-5 w-5" />
			</Button>
		</div>
	);
};
