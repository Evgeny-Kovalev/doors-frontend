'use client';

import { X, Menu } from 'lucide-react';

import { Button, cn } from '@/shared/ui';

import { useMobileMenuStore } from '../../model';

interface ToggleButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

export const ToggleButton = ({ className, ...props }: ToggleButtonProps) => {
	const { isMobileMenuOpen, toggleMobileMenu } = useMobileMenuStore();
	return (
		<Button className={cn(className)} {...props} onClick={toggleMobileMenu}>
			{isMobileMenuOpen ? <X /> : <Menu />}
		</Button>
	);
};
