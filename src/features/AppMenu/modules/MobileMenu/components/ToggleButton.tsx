'use client';

import { Button } from '@/shared/ui/button';
import { cn } from '@/shared/ui/utils';
import { X, Menu } from 'lucide-react';
import { useMobileMenuStore } from '../store';

interface ToggleButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

export default function ToggleButton({ className, ...props }: ToggleButtonProps) {
	const { isMobileMenuOpen, toggleMobileMenu } = useMobileMenuStore();
	return (
		<Button className={cn(className)} {...props} onClick={toggleMobileMenu}>
			{isMobileMenuOpen ? <X /> : <Menu />}
		</Button>
	);
}
