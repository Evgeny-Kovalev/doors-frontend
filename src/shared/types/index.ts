export type AttributeApiResponse = {
	id: number;
	name: string;
	value: string;
};

export type VariantApiResponse = {
	id: number;
	imgPath: string;
	price: number;
	discountPrice?: number;
	attributes: AttributeApiResponse[];
};

export type ProductApiResponse = {
	id: number;
	name: string;
	imgPath: string;
	description: string;
	isVisible: boolean;
	variants: VariantApiResponse[];
};
export type CategoryApiResponse = {
	id: number;
	name: string;
	imgUrl: string;
	description: string;
	isVisible: boolean;
	parentCategoryId: number;
};
