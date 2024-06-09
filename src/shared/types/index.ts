export type AttributeApiResponse = {
	id: number;
	key: {
		id: number;
		value: string;
		label: string;
		imgUrl: string | null;
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

export type VariantApiResponse = {
	id: number;
	imgUrl: string;
	price?: number;
	discountPrice?: number;
	attributes: AttributeApiResponse[];
};

export type ProductApiResponse = {
	id: number;
	slug: string;
	name: string;
	imgUrl: string;
	description: string;
	isVisible: boolean;

	category: CategoryApiResponse;

	variants: VariantApiResponse[];
	params: AttributeApiResponse[];
};

export enum CategoryType {
	interiorDoors = 'interiorDoors',
	exteriorDoors = 'exteriorDoors',
}

export interface Category {
	id: number;
	name: string;
	slug: string;
	imgUrl: string;
	description: string;
	isVisible: boolean;
	parentCategoryId: number;

	categoryType: CategoryType;
}

export interface CategoryApiResponse extends Category {
	children: CategoryApiResponse[];
}

export type CollectionApiResponse = {
	id: number;
	title: string;

	categories: CategoryApiResponse[];
	products: ProductApiResponse[];
};
