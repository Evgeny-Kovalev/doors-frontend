import { Logo } from '@/shared/components/Logo';
import { ToggleButton } from './ToggleButton';

interface HeaderProps {}

export default function MobileMenuHeader({}: HeaderProps) {
	return (
		<div className="container mb-3 flex max-w-full items-center border-b border-b-gray-200 py-3">
			<Logo />
			<ToggleButton className="ml-auto h-10 w-10 p-3" />
		</div>
	);
}
