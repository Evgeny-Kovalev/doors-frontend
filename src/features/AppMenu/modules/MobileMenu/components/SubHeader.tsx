import PhoneNumbersList from '@/shared/components/PhoneNumbersList';
import { Clock } from 'lucide-react';

interface SubHeaderProps {}

export default function SubHeader({}: SubHeaderProps) {
	return (
		<div className="container mb-3 flex max-w-full items-center justify-between">
			{/* <SearchBox /> */}
			<ul className="text-sm md:block">
				<li className="mb-1 flex items-center">
					<Clock className="mr-3 h-full max-h-4 w-full max-w-4 self-center " />
					<span>Вт-Пт: 11:00 - 18:00</span>
				</li>
				<li className="flex items-center">
					<Clock className="mr-3 h-full max-h-4 w-full max-w-4 self-center " />
					<span>Сб-Вс: 11:00 - 17:00</span>
				</li>
				{/* <li className="">Пн: выходной</li> */}
			</ul>
			<PhoneNumbersList className="text-nowrap text-sm" />
		</div>
	);
}
