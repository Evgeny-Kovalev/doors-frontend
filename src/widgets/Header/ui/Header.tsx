import { Phone } from 'lucide-react';
import { Suspense } from 'react';

import { DesktopMenu, MobileMenu, MobileMenuToggleButton } from '@/features/app-menu';
import { CallBackButton, CallBackDialog } from '@/features/callback';
import { SearchBox } from '@/features/search';
import { fetchCategories } from '@/entities/category';
import { Logo, PhoneNumbersList, WorkingHoursList } from '@/shared/components';
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
					<WorkingHoursList className="hidden shrink-0 text-sm md:block" />
					<PhoneNumbersList className="hidden text-nowrap text-sm md:block" />
					<div className="flex gap-3">
						<CallBackDialog>
							<CallBackButton className="hidden items-center xl:flex" />
							<Button className="hidden h-10 w-10 rounded-full p-1 min-[374px]:inline-flex xl:hidden">
								<Phone width={18} height={18} color="white" />
							</Button>
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
