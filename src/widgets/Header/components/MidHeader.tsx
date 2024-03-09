import { Heart } from 'lucide-react';
import Logo from './Logo';
import SearchBox from './SearchBox';
import { Button } from '@/shared/ui/button';
import { MobileMenuToggleButton } from '@/features/MobileMenu';
import PhoneNumbersList from '@/shared/components/PhoneNumbersList';

export default function MidHeader() {
	return (
		<div className="border-b border-b-gray-200 py-3 md:border-none">
			<div className="container flex items-center justify-between gap-3 ">
				<Logo />
				<SearchBox className="hidden w-1/3 flex-shrink md:flex" />
				<PhoneNumbersList className="hidden text-nowrap text-sm sm:block" />
				<div className="flex gap-3">
					<Button className="h-10 w-10 rounded-full p-3">
						<Heart width={20} height={20} color="white" />
					</Button>
					<MobileMenuToggleButton className="h-10 w-10 p-3" />
				</div>
			</div>
		</div>
	);
}
