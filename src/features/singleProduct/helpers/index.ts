import {
	AttributeApiResponse,
	ProductApiResponse,
	VariantApiResponse,
} from '../../../shared/types';
import { Attribute } from '../types';

export const getAttributesWithValues = (product: ProductApiResponse) => {
	return product.variants.reduce(
		(acc: { [key: string]: { name: string; values: string[] } }, v) => {
			v.attributes.forEach((attr) => {
				const key = attr.name;
				acc[key] = {
					name: attr.name,
					values: acc[key]?.values ? [...acc[key].values, attr.value] : [attr.value],
				};
			});
			return acc;
		},
		{},
	);
};

export const getGroupedAttributes = (variants: VariantApiResponse[]) => {
	return variants.reduce(
		(acc: { [key: string]: { name: string; values: string[] } }, v) => {
			v.attributes.forEach((attr) => {
				const key = attr.name;
				acc[key] = {
					name: attr.name,
					values: Array.from(
						new Set(
							acc[key]?.values ? [...acc[key].values, attr.value] : [attr.value],
						),
					),
				};
			});
			return acc;
		},
		{},
	);
};

const partitionArr = (arr: any[], condn: (n: any) => boolean) =>
	arr.reduce((acc, i) => (acc[condn(i) ? 0 : 1].push(i), acc), [[], []]);

export const getPossibleVariants = (
	variants: VariantApiResponse[],
	selectedAttributes: Attribute[],
) => {
	if (selectedAttributes.length === 0) return variants;

	// const validVariants = variants.filter((variant) => {
	// 	return selectedAttributes.every((sa) => {
	// 		return variant.attributes.some((a) => {
	// 			return a.name === sa.key && a.value === sa.value;
	// 		});
	// 	});
	// });
	const [validVariants, indvalid] = partitionArr(variants, (variant) => {
		return selectedAttributes.every((sa) => {
			return variant.attributes.some((a: AttributeApiResponse) => {
				return a.name === sa.key && a.value === sa.value;
			});
		});
	});

	// console.log('valid', validVariants);
	// console.log('indvalid', indvalid);

	return validVariants;
};
