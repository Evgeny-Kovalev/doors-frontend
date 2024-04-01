'use client';

import { useEffect, useState } from 'react';
import { ChevronUp } from 'lucide-react';
import { cn } from '@/shared/ui/utils';
import { Button } from '@/shared/ui/button';
import { Portal } from '../Portal';

export const ScrollToTopButton = () => {
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

	const scrollToTop = () => {
		isVisible &&
			window.scrollTo({
				top: 0,
				behavior: 'smooth',
			});
	};

	return (
		<Portal>
			<Button
				className={cn(
					'fixed bottom-5 right-5 z-10 h-12 w-12 rounded-full p-1 shadow-lg outline-none transition-opacity duration-200',
					{
						'opacity-100': isVisible,
						'opacity-0': !isVisible,
					},
				)}
				onClick={scrollToTop}
			>
				<ChevronUp />
			</Button>
		</Portal>
	);
};
