import {
	CategoryApiResponse,
	CollectionApiResponse,
	Paginated,
	ProductApiResponse,
} from '../types';

export const fetchCategories = async (): Promise<CategoryApiResponse[] | null> => {
	const res = await fetch(`${process.env.API_URL}/categories`);
	if (!res.ok) return null;
	const categories: CategoryApiResponse[] = await res.json();
	return categories;
};

export const fetchCategory = async (
	slug: string,
): Promise<CategoryApiResponse | null> => {
	const res = await fetch(`${process.env.API_URL}/categories/${slug}`);
	if (!res.ok) return null;
	const category: CategoryApiResponse = await res.json();
	return category;
};

export const fetchProducts = async (args?: {
	categorySlug?: string;
	q?: string;
	page?: number;
	limit?: number;
}): Promise<Paginated<ProductApiResponse> | null> => {
	const params = new URLSearchParams();

	args?.q && params.set('q', args.q);
	args?.categorySlug && params.set('categorySlug', args.categorySlug);
	args?.page && params.set('page', args.page.toString());
	args?.limit && params.set('limit', args.limit.toString());

	const res = await fetch(`${process.env.API_URL}/products?` + params);
	if (!res.ok) return null;
	const products: Paginated<ProductApiResponse> = await res.json();
	return products;
};

export const fetchProduct = async (slug: string): Promise<ProductApiResponse | null> => {
	const res = await fetch(`${process.env.API_URL}/products/${slug}`);
	if (!res.ok) return null;
	const product = await res.json();
	return product;
};

export const fetchCollection = async (
	collectionId: number,
): Promise<CollectionApiResponse | null> => {
	const res = await fetch(`${process.env.API_URL}/collections/${collectionId}`);
	if (!res.ok) return null;
	const collection: CollectionApiResponse = await res.json();
	return collection;
};
