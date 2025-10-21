import { Paginated, ProductApiResponse } from '@/shared/types';

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

	const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products?` + params);
	if (!res.ok) return null;
	const products: Paginated<ProductApiResponse> = await res.json();
	return products;
};

export const fetchProduct = async (slug: string): Promise<ProductApiResponse | null> => {
	const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products/${slug}`);
	if (!res.ok) return null;
	const product = await res.json();
	return product;
};

export const fetchRelatedProducts = async ({
	categorySlug,
	limit = 6,
}: {
	categorySlug: string;
	limit?: number;
}): Promise<ProductApiResponse[] | null> => {
	const queryParams = new URLSearchParams();
	queryParams.set('categorySlug', categorySlug);
	queryParams.set('limit', limit.toString());

	const res = await fetch(
		`${process.env.NEXT_PUBLIC_API_URL}/products/random?` + queryParams,
	);
	if (!res.ok) return null;
	const products = await res.json();
	return products;
};
