import SearchBox from '@/widgets/Header/components/SearchBox';
import { Phone } from 'lucide-react';

interface SubHeaderProps {}

export default function SubHeader({}: SubHeaderProps) {
	return (
		<div className="container mb-3 flex max-w-full items-center justify-between">
			<SearchBox />
			<ul className="flex flex-col flex-wrap gap-1 text-nowrap text-sm">
				<li className="inline-flex items-center">
					<Phone height={15} />
					<a href="tel:+375293211718">+375 (29) 321-17-18</a>
				</li>
				<li className="inline-flex items-center">
					<Phone height={15} />
					<a href="tel:+375255433456">+375 (25) 543-34-56</a>
				</li>
			</ul>
		</div>
	);
}
