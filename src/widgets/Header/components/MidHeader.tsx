import { Heart, Phone } from 'lucide-react';
import Logo from './Logo';
import SearchBox from './SearchBox';
import { Button } from '@/shared/ui/button';
import { MobileMenuToggleButton } from '@/features/MobileMenu';

export default function MidHeader() {
	return (
		<div className="border-b border-b-gray-200 py-3 md:border-none">
			<div className="container flex items-center justify-between gap-3 ">
				<Logo />
				<SearchBox className="hidden w-1/3 flex-shrink md:flex" />
				<ul className="hidden flex-col flex-wrap gap-1 text-nowrap text-sm sm:flex">
					<li className="inline-flex items-center">
						<Phone height={15} />
						<a href="tel:+375293211718">+375 (29) 321-17-18</a>
					</li>
					<li className="inline-flex items-center">
						<Phone height={15} />
						<a href="tel:+375255433456">+375 (25) 543-34-56</a>
					</li>
				</ul>
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
