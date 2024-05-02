import { DESCRIPTION_MAX_LEN } from '../constants';

export const limitMetadataDescription = (description: string) => {
	return description.length > DESCRIPTION_MAX_LEN
		? description.slice(0, DESCRIPTION_MAX_LEN - 3) + '...'
		: description;
};
