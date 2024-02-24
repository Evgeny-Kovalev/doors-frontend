import { MobileMenu } from '@/features/MobileMenu';
import { type MenuItem } from '@/features/MobileMenu';
import DesktopMenu from './DesktopMenu';
import { addBackItem } from '../helpers';

interface MainMenuProps {
	data: MenuItem[];
}

export default function MainMenu({ data }: MainMenuProps) {
	return (
		<>
			<DesktopMenu />

			<MobileMenu data={addBackItem(data)} />
		</>
	);
}
