import Link from 'next/link';

export default function DesktopMenu() {
	const links = [
		{ to: '/', title: 'Home' },
		{ to: '/shop', title: 'Shop' },
		{ to: '/categories/1', title: 'Category 1' },
		{ to: '/categories/2', title: 'Category 2' },
		{ to: '/contacts', title: 'Contacts' },
	];

	return (
		<div className="hidden bg-primary text-white md:block">
			<div className="container">
				<ul className="-mx-5 flex">
					{links.map(({ title, to }) => (
						<li key={title}>
							<Link
								href={to}
								className="block px-5 py-3 transition hover:text-yellow-500"
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
