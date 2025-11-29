export type AttributeApiResponse = {
	id: number;
	key: {
		id: number;
		value: string;
		label: string;
	};
	value: {
		id: number;
		value: string;
		imgUrl: string | null;
	};
};

export interface Paginated<T> {
	data: T[];
	meta: {
		page: number;
		limit: number;
		itemCount: number;
		pageCount: number;
		hasPreviousPage: boolean;
		hasNextPage: boolean;
	};
}

export type ProductType = 'full' | 'fullSample' | 'doorOnlySample';

export type VariantApiResponse = {
	id: number;
	imgUrl: string;
	price?: number;
	discountPrice?: number;
	attributes: AttributeApiResponse[];
	tags: TagApiResponse[];
};

export type ProductApiResponse = {
	id: number;
	slug: string;
	name: string;
	imgUrl: string;
	description: string;
	isVisible: boolean;
	productType: ProductType;

	category: CategoryApiResponse;

	variants: VariantApiResponse[];
	params: AttributeApiResponse[];
};

export type CategoryType = 'interiorDoors' | 'exteriorDoors';

export interface CategoryApiResponse {
	id: number;
	name: string;
	slug: string;
	imgUrl: string;
	description: string;
	isVisible: boolean;
	parentCategoryId: number;

	order: number | null;

	categoryType: CategoryType;
}

export type CollectionApiResponse = {
	id: number;
	title: string;

	categories: CategoryApiResponse[];
	products: ProductApiResponse[];
};

export enum TagKeys {
	'bestseller' = 'bestseller',
	'new' = 'new',
	'sample' = 'sample',
}

export type TagApiResponse = {
	id: number;
	key: TagKeys;
	label: string;
};
