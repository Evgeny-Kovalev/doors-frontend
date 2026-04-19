import { ComponentProps } from 'react';
import Link from 'next/link';
import { Pointer } from 'lucide-react';

import { cn } from '@/shared/ui';

interface ProductBadgeProps extends Omit<ComponentProps<typeof Link>, 'href'> {
	size?: 'sm';
}

export const ProductBadge = ({ className, size, ...props }: ProductBadgeProps) => {
	const isSm = size === 'sm';

	return (
		<Link
			href="/news/credit4"
			className={cn(
				'group relative flex flex-col gap-0 rounded-2xl bg-red-600 px-4 py-1 text-center text-white shadow transition-[scale,box-shadow] hover:shadow-xl',
				{ 'rounded-lg px-1 py-0': isSm },
				isSm ? 'hover:scale-105' : 'hover:scale-[102%]',
				className,
			)}
			{...props}
		>
			<span className={cn('letter text-[10px] leading-2.5', { 'text-[8px]': isSm })}>
				до 24 мес.
			</span>
			<span
				className={cn(
					'-mx-3 border-b border-white/50 text-4xl leading-9 font-extrabold',
					{ 'mx-0 text-lg leading-4': isSm },
				)}
			>
				4%
			</span>
			<span
				className={cn('text-[10px] leading-4.5 font-bold uppercase', {
					'text-[7px] leading-3 font-normal': isSm,
				})}
			>
				На родныя товары
			</span>
			{!isSm && (
				<span className="pointer-events-none absolute top-3.5 right-3.5">
					<span className="animation-duration-[1.8s] absolute inset-0 animate-ping rounded-full bg-white/30" />
					<Pointer
						size={16}
						className="animation-duration-[1.8s] relative animate-pulse transition-transform group-hover:scale-90"
					/>
				</span>
			)}
		</Link>
	);
};
