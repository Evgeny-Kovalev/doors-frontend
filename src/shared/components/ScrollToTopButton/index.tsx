'use client';

import { useEffect, useState } from 'react';
import { ChevronUp } from 'lucide-react';
import { cn, Button, ButtonProps } from '@/shared/ui';

interface ScrollToTopButtonProps extends ButtonProps {}

export const ScrollToTopButton = ({
	className,
	onClick,
	...props
}: ScrollToTopButtonProps) => {
	const [isVisible, setIsVisible] = useState(false);

	useEffect(() => {
		const toggleVisibility = () => {
			window.scrollY > 500 ? setIsVisible(true) : setIsVisible(false);
		};
		window.addEventListener('scroll', toggleVisibility);

		return () => {
			window.removeEventListener('scroll', toggleVisibility);
		};
	}, []);

	const scrollToTop: React.MouseEventHandler<HTMLButtonElement> = (e) => {
		isVisible &&
			window.scrollTo({
				top: 0,
				behavior: 'smooth',
			});
		onClick?.(e);
	};

	return (
		<Button
			aria-label="Прокрутитить страницу вверх"
			className={cn(
				'size-12 rounded-full p-1 shadow-lg outline-none transition-opacity duration-200',
				className,
				isVisible ? 'opacity-100' : 'opacity-0',
			)}
			onClick={scrollToTop}
			{...props}
		>
			<ChevronUp />
		</Button>
	);
};
