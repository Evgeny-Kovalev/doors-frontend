import {
	CategoryApiResponse,
	CollectionApiResponse,
	Paginated,
	ProductApiResponse,
} from '../types';

export const fetchCategories = async (): Promise<CategoryApiResponse[]> => {
	const res = await fetch(`${process.env.API_URL}/categories`);
	const categories: CategoryApiResponse[] = await res.json();
	return categories;
};

export const fetchCategory = async (id: string): Promise<CategoryApiResponse> => {
	const res = await fetch(`${process.env.API_URL}/categories/${id}`);
	const category: CategoryApiResponse = await res.json();
	return category;
};

export const fetchProducts = async (
	categoryId: number,
	page?: number,
	limit?: number,
): Promise<Paginated<ProductApiResponse> | null> => {
	const params = new URLSearchParams();

	params.set('categoryId', categoryId.toString());
	page && params.set('page', page.toString());
	limit && params.set('limit', limit.toString());

	const res = await fetch(`${process.env.API_URL}/products?` + params);
	if (!res.ok) return null;
	const products: Paginated<ProductApiResponse> = await res.json();
	return products;
};

export const fetchProduct = async (id: string): Promise<ProductApiResponse | null> => {
	const res = await fetch(`${process.env.API_URL}/products/${id}`);
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
