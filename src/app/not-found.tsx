import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
	title: 'Страница не найдена',
	description: 'Страница не найдена',
};

export default function NotFound() {
	return (
		<div className="min-w-screen flex min-h-screen items-center justify-center">
			<div className="text-center">
				<h2>404</h2>
				<p>Страница не найдена</p>
				<Link className="text-primary" href="/">
					На главную
				</Link>
			</div>
		</div>
	);
}
