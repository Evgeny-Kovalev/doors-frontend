import { VariantApiResponse } from '@/shared/types';

type ParamsObject = {
	[key: string]: {
		key: {
			label: string;
			value: string;
		};
		values: {
			imgUrl: string | null;
			value: string;
		}[];
	};
};

export const getParamsObjectFromVariants = (
	variants: VariantApiResponse[],
): ParamsObject => {
	const res: ParamsObject = {};

	variants.forEach((v) => {
		v.attributes.forEach((a) => {
			const key = a.key.value;

			if (res[key]) {
				const newValues: {
					imgUrl: string | null;
					value: string;
				}[] = [...res[key].values, { imgUrl: a.value.imgUrl, value: a.value.value }];

				res[key].values = [...new Map(newValues.map((v) => [v.value, v])).values()];
			} else {
				res[key] = {
					key: { label: a.key.label, value: key },
					values: [{ imgUrl: a.value.imgUrl, value: a.value.value }],
				};
			}
		});
	});

	return res;
};

export const getVariantAttributesAsObject = (variant: VariantApiResponse) => {
	return variant.attributes.reduce(
		(acc, a) => {
			acc[a.key.value] = a.value.value;
			return acc;
		},
		{} as { [key: string]: string },
	);
};

export const filterVariants = (
	allVariants: VariantApiResponse[],
	selectedItems: { [key: string]: string },
) => {
	if (Object.keys(selectedItems).length <= 0) return allVariants;
	const res: VariantApiResponse[] = [];

	allVariants.forEach((v) => {
		v.attributes.forEach((a) => {
			const key = a.key.value;
			const value = a.value.value;
			if (selectedItems[key] && selectedItems[key] == value) {
				res.push(v);
			}
		});
	});

	return res;
};

export const getVariantByAttributes = (
	allVariants: VariantApiResponse[],
	selectedItems: { [key: string]: string },
) => {
	return allVariants.find((v) => {
		return v.attributes.every((a) => {
			const key = a.key.value;
			const value = a.value.value;
			return selectedItems[key] && selectedItems[key] == value;
		});
	});
};
