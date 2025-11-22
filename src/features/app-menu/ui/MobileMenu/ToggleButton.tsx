'use client';

import { X, Menu } from 'lucide-react';

import { Button, cn } from '@/shared/ui';

import { useMobileMenuStore } from '../../hooks/useMobileMenuStore';

interface ToggleButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

export const ToggleButton = ({ className, ...props }: ToggleButtonProps) => {
	const { isMobileMenuOpen, toggleMobileMenu } = useMobileMenuStore();
	return (
		<Button
			aria-label={`${isMobileMenuOpen ? 'Закрыть' : 'Открыть'} меню`}
			className={cn(className)}
			{...props}
			onClick={toggleMobileMenu}
		>
			{isMobileMenuOpen ? <X /> : <Menu />}
		</Button>
	);
};
