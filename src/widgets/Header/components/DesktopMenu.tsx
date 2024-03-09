import { MAIN_CATEGORIES } from '@/shared/constants';
import Link from 'next/link';

export default function DesktopMenu() {
	const links: { to: string; title: string }[] = [
		{ to: '/', title: 'Главная' },
		{ to: '/shop', title: 'Каталог' },
		{
			to: `/categories/${MAIN_CATEGORIES.exterior.id}`,
			title: MAIN_CATEGORIES.exterior.label,
		},
		{
			to: `/categories/${MAIN_CATEGORIES.interior.id}`,
			title: MAIN_CATEGORIES.interior.label,
		},
		{ to: '/contacts', title: 'Контакты' },
	];

	return (
		<div className="hidden bg-primary text-white md:block">
			<div className="container">
				<ul className="-mx-5 flex">
					{links.map(({ title, to }) => (
						<li key={title}>
							<Link
								href={to}
								className="block px-5 py-3 transition hover:text-yellow-400"
							>
								{title}
							</Link>
						</li>
					))}
				</ul>
			</div>
		</div>
	);
}
