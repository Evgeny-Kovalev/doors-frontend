import { Clock, Phone } from 'lucide-react';
import { Suspense } from 'react';

import { DesktopMenu, MobileMenu, MobileMenuToggleButton } from '@/features/app-menu';
import { CallBackButton, CallBackDialog } from '@/features/callback';
import { SearchBox } from '@/features/search';
import { fetchCategories } from '@/entities/category';
import { Logo } from '@/shared/components/Logo';
import PhoneNumbersList from '@/shared/components/PhoneNumbersList';
import { Button, Skeleton } from '@/shared/ui';

export const Header = async () => {
	const categories = await fetchCategories();

	return (
		<>
			<div className="border-b border-b-gray-200 py-3 lg:border-none">
				<div className="container flex items-center justify-between gap-3 ">
					<Logo />
					<Suspense
						fallback={
							<Skeleton className="hidden h-10 w-1/3 flex-shrink lg:block" />
						}
					>
						<SearchBox className="hidden w-1/3 flex-shrink lg:flex" />
					</Suspense>
					<ul className="hidden shrink-0 text-sm md:block">
						<li className="mb-1 flex items-center">
							<Clock className="mr-2 h-full max-h-4 w-full max-w-4 self-center " />
							<span>Вт-Пт: 11:00 - 18:00</span>
						</li>
						<li className="flex items-center">
							<Clock className="mr-2 h-full max-h-4 w-full max-w-4 self-center " />
							<span>Сб-Вс: 11:00 - 17:00</span>
						</li>
					</ul>
					<PhoneNumbersList className="hidden text-nowrap text-sm md:block" />
					<div className="flex gap-3">
						<CallBackDialog>
							<div>
								<CallBackButton className="hidden items-center xl:flex" />
								<Button className="hidden h-10 w-10 rounded-full p-1 sm:inline-flex xl:hidden">
									<Phone width={18} height={18} color="white" />
								</Button>
							</div>
						</CallBackDialog>
						<MobileMenuToggleButton className="h-10 w-10 p-3 lg:hidden" />
					</div>
				</div>
			</div>
			{categories && (
				<>
					<DesktopMenu categories={categories} />
					<MobileMenu categories={categories} />
				</>
			)}
		</>
	);
};
