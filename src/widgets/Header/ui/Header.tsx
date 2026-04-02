import { Heart, Phone } from 'lucide-react';
import { Suspense } from 'react';
import Link from 'next/link';

import { DesktopMenu, MobileMenu, MobileMenuToggleButton } from '@/features/app-menu';
import { CallBackDialog } from '@/features/callback';
import { SearchBox } from '@/features/search';
import { fetchCategories } from '@/entities/category';
import { Logo, PhoneNumbersList, WorkingHoursList } from '@/shared/components';
import { Button, Skeleton } from '@/shared/ui';

export const Header = async () => {
	const categories = await fetchCategories();

	return (
		<div>
			<div className="border-b border-b-gray-200 py-3 lg:border-none">
				<div className="container flex items-center justify-between gap-2 max-sm:px-3">
					<Logo />
					<Suspense
						fallback={<Skeleton className="hidden h-10 w-1/3 shrink lg:block" />}
					>
						<SearchBox className="hidden w-1/3 shrink lg:flex" />
					</Suspense>
					<WorkingHoursList className="hidden shrink-0 text-sm md:block" />
					<PhoneNumbersList className="hidden text-sm text-nowrap md:block" />
					<div className="flex gap-2">
						<Button
							size="icon"
							className="rounded-full p-1 max-[450px]:hidden"
							aria-label="Избранное"
							asChild
						>
							<Link href="/favorites">
								<Heart width={20} height={20} />
							</Link>
						</Button>
						<CallBackDialog>
							<Button
								aria-label="Обратный звонок"
								className="max-xl:size-10 max-xl:rounded-full max-xl:p-1 xl:rounded-md"
							>
								<Phone
									width={18}
									height={18}
									className="size-[18px] xl:mr-2 xl:size-[15px]"
									color="white"
								/>
								<span className="max-xl:hidden">Обратный звонок</span>
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
		</div>
	);
};
