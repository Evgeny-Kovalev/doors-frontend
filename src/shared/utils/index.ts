import { DESCRIPTION_MAX_LEN } from '../constants';
import { CategoryApiResponse, Category } from '../types';

export const limitMetadataDescription = (description: string) => {
	return description.length > DESCRIPTION_MAX_LEN
		? description.slice(0, DESCRIPTION_MAX_LEN - 3) + '...'
		: description;
};

export const convertCategoriesToFlattenArray = (arr: CategoryApiResponse[]) => {
	const result: Category[] = [];
	arr.forEach((item) => {
		const { children, ...obj } = item;
		result.push(obj);
		if (item.children) result.push(...convertCategoriesToFlattenArray(item.children));
	});
	return result;
};
