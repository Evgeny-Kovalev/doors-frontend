import Link from 'next/link';

export default function DesktopMenu() {
	const links = [
		{ to: '/', title: 'Home' },
		{ to: '/products', title: 'Products' },
		{ to: '/products/1', title: 'Product 1' },
		{ to: '/products/2', title: 'Product 2' },
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
