import { Clock } from 'lucide-react';
import Logo from './Logo';
import { MobileMenuToggleButton } from '@/features/AppMenu/modules/MobileMenu';
import PhoneNumbersList from '@/shared/components/PhoneNumbersList';
import AppMenu from '@/features/AppMenu/AppMenu';

export default function Header() {
	return (
		<>
			<div className="border-b border-b-gray-200 py-3 lg:border-none">
				<div className="container flex items-center justify-between gap-3 ">
					<Logo />
					<div className="flex items-center gap-5">
						{/* <SearchBox className="hidden w-1/3 flex-shrink lg:flex" /> */}
						<ul className="hidden text-sm md:block">
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
						<PhoneNumbersList className="hidden text-nowrap text-sm md:block" />
						{/* <div className="flex gap-3"> */}
						{/* <Button className="hidden h-10 w-10 rounded-full p-3 sm:inline-flex">
								<Heart width={20} height={20} color="white" />
							</Button> */}
						<MobileMenuToggleButton className="h-10 w-10 p-3 lg:hidden" />
						{/* </div> */}
					</div>
				</div>
			</div>
			<AppMenu />
		</>
	);
}
