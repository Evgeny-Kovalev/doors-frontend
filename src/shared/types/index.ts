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
	price: number;
	discountPrice?: number;
	attributes: AttributeApiResponse[];
};

export type ProductApiResponse = {
	id: number;
	name: string;
	imgUrl: string;
	description: string;
	isVisible: boolean;
	variants: VariantApiResponse[];
	params: AttributeApiResponse[];
};
export type CategoryApiResponse = {
	id: number;
	name: string;
	imgUrl: string;
	description: string;
	isVisible: boolean;
	parentCategoryId: number;
};
