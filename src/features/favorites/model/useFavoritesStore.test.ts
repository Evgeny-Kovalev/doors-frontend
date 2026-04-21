import { createProduct } from '@/shared/test/factories/product';
import { useFavoritesStore } from './useFavoritesStore';

describe('useFavoritesStore', () => {
	beforeEach(() => {
		localStorage.clear();
		useFavoritesStore.setState({ products: [] });
	});

	it('adds product only once', () => {
		const product = createProduct({ slug: 'product-a', name: 'Product product-a' });

		useFavoritesStore.getState().add(product);
		useFavoritesStore.getState().add(product);

		expect(useFavoritesStore.getState().products).toHaveLength(1);
		expect(useFavoritesStore.getState().products[0].slug).toBe('product-a');
	});

	it('removes product by slug', () => {
		const productA = createProduct({ slug: 'product-a', name: 'Product product-a' });
		const productB = createProduct({
			slug: 'product-b',
			name: 'Product product-b',
			id: 2,
		});

		useFavoritesStore.getState().add(productA);
		useFavoritesStore.getState().add(productB);
		useFavoritesStore.getState().remove('product-a');

		expect(useFavoritesStore.getState().products).toHaveLength(1);
		expect(useFavoritesStore.getState().products[0].slug).toBe('product-b');
	});

	it('toggles favorite state', () => {
		const product = createProduct({ slug: 'product-a', name: 'Product product-a' });

		useFavoritesStore.getState().toggle(product);
		expect(useFavoritesStore.getState().isFavorite('product-a')).toBe(true);

		useFavoritesStore.getState().toggle(product);
		expect(useFavoritesStore.getState().isFavorite('product-a')).toBe(false);
	});

	it('clears all favorites', () => {
		useFavoritesStore
			.getState()
			.add(createProduct({ slug: 'product-a', name: 'Product product-a' }));
		useFavoritesStore
			.getState()
			.add(createProduct({ slug: 'product-b', name: 'Product product-b', id: 2 }));

		useFavoritesStore.getState().clear();

		expect(useFavoritesStore.getState().products).toEqual([]);
	});
});
