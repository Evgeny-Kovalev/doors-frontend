import { cn } from '@/shared/ui';

interface ProductBadgeProps extends React.HTMLAttributes<HTMLDivElement> {
	size?: 'sm';
}

export const ProductBadge = ({ className, size, ...props }: ProductBadgeProps) => {
	const isSm = size === 'sm';

	return (
		<div
			className={cn(
				'flex flex-col gap-0 rounded-2xl bg-red-600 px-4 py-1 text-center text-white shadow',
				{ 'rounded-lg px-1 py-0': isSm },
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
		</div>
	);
};
