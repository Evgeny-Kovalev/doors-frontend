import { PhoneNumbersList, WorkingHoursList, Logo } from '@/shared/components';
import Link from 'next/link';
import { MAIN_CATEGORIES, SHOP_INFO } from '@/shared/constants';
import { MapPin } from 'lucide-react';

export const Footer = () => {
	return (
		<>
			<div className="container">
				<div className="grid auto-rows-auto grid-cols-6 gap-3 py-10">
					<div className="col-span-6 mb-3 lg:col-span-2">
						<Logo className="text-gray-200" />
					</div>
					<div className="col-span-6 sm:col-span-3 md:col-span-2 lg:col-span-2 xl:col-span-1 xl:col-start-4">
						<h5 className="mb-2 text-sm font-bold tracking-wider">Телефон</h5>
						<PhoneNumbersList />
					</div>
					<div className="col-span-6 sm:col-span-3 md:col-span-2 lg:col-span-2 xl:col-span-1">
						<h5 className="mb-2 text-sm font-bold tracking-wider">График работы</h5>
						<WorkingHoursList />
					</div>
					<div className="hidden xl:col-span-1 xl:block">
						<h5 className="mb-2 text-sm font-bold tracking-wider">Каталог</h5>
						<ul className="ml-4 list-disc">
							{Object.values(MAIN_CATEGORIES).map(({ slug, label }) => (
								<li className="mb-2 last:mb-0" key={slug}>
									<Link
										className="hover:text-primary-accent"
										href={`/categories/${slug}`}
									>
										{label}
									</Link>
								</li>
							))}
						</ul>
					</div>
					<div className="col-span-6 lg:col-span-4 lg:col-start-3 xl:col-start-4">
						<h5 className="mb-2 text-sm font-bold tracking-wider">Адрес</h5>
						<div className="flex items-center">
							<MapPin className="mr-3 h-full max-h-4 w-full max-w-4 self-center " />
							<span>{SHOP_INFO.adress}</span>
						</div>
					</div>
				</div>
			</div>
			<div className="border-t border-gray-700">
				<p className="container py-2 text-center">
					Сайт не является интернет-магазином. Оплата за товар производится у
					продавца. ИП Ковалев И.П. УНП 490767291
				</p>
			</div>
		</>
	);
};
