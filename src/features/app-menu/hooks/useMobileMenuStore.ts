import { create } from 'zustand';

interface MobileMenuState {
	isMobileMenuOpen: boolean;
	toggleMobileMenu: () => void;
}

export const useMobileMenuStore = create<MobileMenuState>()((set) => ({
	isMobileMenuOpen: false,
	toggleMobileMenu: () =>
		set(({ isMobileMenuOpen }) => ({ isMobileMenuOpen: !isMobileMenuOpen })),
}));
