import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
	title: 'Not found',
	description: 'Not found',
};

export default function NotFound() {
	return (
		<div className="min-w-screen flex min-h-screen items-center justify-center">
			<div className="text-center">
				<h2>Not Found</h2>
				<p>Could not find requested resource</p>
				<Link href="/">Return Home</Link>
			</div>
		</div>
	);
}
