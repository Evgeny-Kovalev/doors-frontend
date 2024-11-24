'use client';

import { X, Menu } from 'lucide-react';

import { Button } from '@/shared/ui/button';
import { cn } from '@/shared/ui/utils';

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
