'use client';

import { Heart } from 'lucide-react';
import type { MouseEventHandler } from 'react';

import type { ProductApiResponse } from '@/shared/types';
import { Button, cn } from '@/shared/ui';

import { useFavoritesStore } from '../model/useFavoritesStore';
import toast from 'react-hot-toast';

type Props = {
	product: ProductApiResponse;
	className?: string;
	size?: 'default' | 'sm' | 'lg' | 'iconXs' | 'iconSm' | 'icon';
	variant?: 'ghost' | 'secondary' | 'outline' | 'default';
	withText?: boolean;
	iconClassName?: string;
};

export function FavoriteToggleButton({
	product,
	className,
	size = 'iconSm',
	variant = 'secondary',
	withText = false,
	iconClassName,
}: Props) {
	const isFavorite = useFavoritesStore((s) => s.isFavorite(product.slug));
	const toggle = useFavoritesStore((s) => s.toggle);

	const onClick: MouseEventHandler<HTMLButtonElement> = (e) => {
		e.preventDefault();
		e.stopPropagation();

		toggle(product);
		!isFavorite && toast.success('Добавлено в избранное');
	};

	return (
		<Button
			type="button"
			aria-label={isFavorite ? 'Убрать из избранного' : 'Добавить в избранное'}
			variant={variant}
			size={size}
			className={cn(
				'shrink-0 bg-white shadow-[0_2px_30px_0_rgba(0,0,0,0.1)] transition-[filter,background-color] hover:opacity-100 hover:brightness-95',
				variant === 'secondary' && 'hover:bg-secondary',
				variant === 'default' && 'hover:bg-primary',
				withText ? 'rounded-md' : 'rounded-full',
				className,
			)}
			onClick={onClick}
		>
			<Heart
				className={cn(
					'size-4 fill-transparent transition-colors duration-300',
					isFavorite && 'fill-red-500 text-red-500',
					iconClassName,
				)}
			/>
			{withText && (
				<span className="ml-2">
					{isFavorite ? 'Убрать из избранного' : 'Добавить в избранное'}
				</span>
			)}
		</Button>
	);
}
