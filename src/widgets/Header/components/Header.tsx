import { Heart } from 'lucide-react';
import Logo from './Logo';
import SearchBox from './SearchBox';
import { Button } from '@/shared/ui/button';
import { MobileMenuToggleButton } from '@/features/AppMenu/modules/MobileMenu';
import PhoneNumbersList from '@/shared/components/PhoneNumbersList';
import AppMenu from '@/features/AppMenu/AppMenu';

export default function Header() {
	return (
		<>
			<div className="border-b border-b-gray-200 py-3 lg:border-none">
				<div className="container flex items-center justify-between gap-3 ">
					<Logo />
					<SearchBox className="hidden w-1/3 flex-shrink lg:flex" />
					<PhoneNumbersList className="hidden text-nowrap text-sm md:block" />
					<div className="flex gap-3">
						<Button className="hidden h-10 w-10 rounded-full p-3 sm:inline-flex">
							<Heart width={20} height={20} color="white" />
						</Button>
						<MobileMenuToggleButton className="h-10 w-10 p-3 lg:hidden" />
					</div>
				</div>
			</div>
			<AppMenu />
		</>
	);
}
