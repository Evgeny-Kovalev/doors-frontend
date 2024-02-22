import { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Contacts',
	description: 'Contacts',
};

export default async function Page() {
	return <div>Contacts Page</div>;
}
