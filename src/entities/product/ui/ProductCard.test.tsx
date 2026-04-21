import { render, screen } from '@testing-library/react';
import { createProduct } from '@/shared/test/factories/product';
import { nextImageMock } from '@/shared/test/mocks';

import { ProductCard } from './ProductCard';

jest.mock('next/image', () => nextImageMock);

jest.mock('@/features/favorites', () => ({
	FavoriteToggleButton: () => <button>favorite</button>,
}));

jest.mock('./ProductBadge', () => ({
	ProductBadge: () => <span>Credit badge</span>,
}));

jest.mock('@/entities/category', () => ({
	isCredit4ByCategorySlug: jest.fn(() => true),
}));

describe('ProductCard', () => {
	it('renders product name, price-related text and product link', () => {
		render(<ProductCard product={createProduct()} />);

		expect(screen.getByText('Product 1')).toBeInTheDocument();
		expect(screen.getByText('полотно')).toBeInTheDocument();
		expect(screen.getByRole('button', { name: 'Подробнее' })).toBeInTheDocument();

		const link = screen.getByRole('link', { name: 'Подробнее о товаре Product 1' });
		expect(link).toHaveAttribute('href', '/products/product-1');
	});

	it('renders image with static alt and credit badge', () => {
		render(<ProductCard product={createProduct()} />);

		const image = screen.getByRole('img', { name: 'Product image' });
		expect(image).toBeInTheDocument();
	});
});
