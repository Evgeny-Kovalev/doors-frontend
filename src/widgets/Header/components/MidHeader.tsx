import { Heart, Phone } from 'lucide-react';
import Logo from './Logo';
import SearchBox from './SearchBox';
import { Button } from '@/shared/ui/button';

export default function MidHeader() {
	return (
		<div className="container flex items-center justify-between gap-3 py-3 ">
			<Logo />
			<SearchBox className="hidden w-1/2 flex-shrink md:flex" />
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
			<Button className="h-10 w-10 rounded-full p-3">
				<Heart width={20} height={20} color="white" />
			</Button>
		</div>
	);
}
