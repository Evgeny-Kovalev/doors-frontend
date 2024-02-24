import { type MenuItem } from '@/features/MobileMenu';

export const addBackItem = (items: MenuItem[]) => {
	const res: MenuItem[] = items.map((i) => {
		if (i.items && i.items.length > 0) {
			return {
				...i,
				items: [{ id: -1, label: 'back' }, ...addBackItem(i.items)],
			};
		}
		return i;
	});
	return res;
};
