import { CategoryApiResponse } from '@/shared/types';
import { DesktopMenu } from './modules/DesktopMenu';
import { MobileMenu } from './modules/MobileMenu';

const getAllCategories = async (): Promise<CategoryApiResponse[]> => {
	const res = await fetch(`${process.env.API_URL}/categories`);
	const categories = await res.json();
	return categories;
};

interface AppMenuProps {}

export default async function AppMenu({}: AppMenuProps) {
	const categories = await getAllCategories();

	return (
		<>
			<DesktopMenu categories={categories} />
			<MobileMenu categories={categories} />
		</>
	);
}
