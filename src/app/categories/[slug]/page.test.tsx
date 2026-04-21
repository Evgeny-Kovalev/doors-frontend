import { render, screen } from '@testing-library/react';

import CategoryPage from './page';

const mockFetchCategory = jest.fn();
const mockFetchCategories = jest.fn();
const mockFetchCategoryHierarchy = jest.fn();
const mockFetchProducts = jest.fn();
const mockNotFound = jest.fn(() => {
	throw new Error('NOT_FOUND');
});

jest.mock('next/navigation', () => ({
	notFound: () => mockNotFound(),
}));

jest.mock('@/entities/category', () => ({
	fetchCategory: (...args: unknown[]) => mockFetchCategory(...args),
	fetchCategories: (...args: unknown[]) => mockFetchCategories(...args),
	fetchCategoryHierarchy: (...args: unknown[]) => mockFetchCategoryHierarchy(...args),
	CategoriesSlider: ({ categories }: { categories: Array<{ name: string }> }) => (
		<div>CategoriesSlider: {categories.map((c) => c.name).join(', ')}</div>
	),
}));

jest.mock('@/entities/product', () => ({
	fetchProducts: (...args: unknown[]) => mockFetchProducts(...args),
	ProductCardsGrid: ({ products }: { products: Array<{ name: string }> }) => (
		<div>ProductCardsGrid: {products.map((p) => p.name).join(', ')}</div>
	),
}));

jest.mock('@/shared/components', () => ({
	PageContainer: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
	PageTitle: ({ children }: { children: React.ReactNode }) => <h1>{children}</h1>,
	PaginationControls: ({
		currentPage,
		totalPages,
	}: {
		currentPage: number;
		totalPages: number;
	}) => (
		<div>
			Pagination: {currentPage}/{totalPages}
		</div>
	),
}));

describe('Category page', () => {
	beforeEach(() => {
		jest.resetAllMocks();
		mockFetchCategory.mockResolvedValue({
			slug: 'test-category',
			name: 'Test category',
		});
		mockFetchCategories.mockResolvedValue([]);
		mockFetchCategoryHierarchy.mockResolvedValue([]);
	});

	it('renders product grid and pagination', async () => {
		mockFetchProducts.mockResolvedValue({
			data: [{ slug: 'product-1', name: 'Product 1' }],
			meta: {
				pageCount: 2,
				hasNextPage: true,
				hasPreviousPage: false,
			},
		});

		const ui = await CategoryPage({
			params: Promise.resolve({ slug: 'test-category' }),
			searchParams: Promise.resolve({ page: '1', limit: '12' }),
		});
		render(ui);

		expect(screen.getByRole('heading', { name: 'Test category' })).toBeInTheDocument();
		expect(screen.getByText('ProductCardsGrid: Product 1')).toBeInTheDocument();
		expect(screen.getByText('Pagination: 1/2')).toBeInTheDocument();
	});

	it('renders empty state when product list is empty', async () => {
		mockFetchProducts.mockResolvedValue({
			data: [],
			meta: {
				pageCount: 1,
				hasNextPage: false,
				hasPreviousPage: false,
			},
		});

		const ui = await CategoryPage({
			params: Promise.resolve({ slug: 'test-category' }),
			searchParams: Promise.resolve({}),
		});
		render(ui);

		expect(screen.getByText('Здесь еще нет товаров')).toBeInTheDocument();
	});

	it('calls notFound when category does not exist', async () => {
		mockFetchCategory.mockResolvedValue(null);

		await CategoryPage({
			params: Promise.resolve({ slug: 'missing' }),
			searchParams: Promise.resolve({}),
		});

		expect(mockNotFound).toHaveBeenCalled();
	});
});
