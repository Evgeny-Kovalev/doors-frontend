import { CATEGORIES } from '@/features/MobileMenu/mock';
import MidHeader from './components/MidHeader';
import MainMenu from './components/MainMenu';

export default function Header() {
	return (
		<>
			<MidHeader />
			<MainMenu data={CATEGORIES} />
		</>
	);
}
