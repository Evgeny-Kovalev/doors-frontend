'use client';

import PhoneNumbersList from '@/shared/components/PhoneNumbersList';
import SearchBox from '@/widgets/Header/components/SearchBox';
import { Clock } from 'lucide-react';
import { useMobileMenuStore } from '../store';
import { Suspense } from 'react';
import { Skeleton } from '@/shared/ui/skeleton';

interface SubHeaderProps {}

export default function SubHeader({}: SubHeaderProps) {
	const { toggleMobileMenu } = useMobileMenuStore();

	return (
		<div className="container">
			<div className="mb-3 flex max-w-full items-center justify-between">
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
			<Suspense fallback={<Skeleton className="mb-3 h-10" />}>
				<SearchBox onSearchButtonClick={toggleMobileMenu} className="mb-3" />
			</Suspense>
		</div>
	);
}
