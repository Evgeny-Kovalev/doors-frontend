import { CollectionApiResponse } from '@/shared/types';

export const fetchCollection = async (
	collectionId: number,
): Promise<CollectionApiResponse | null> => {
	const res = await fetch(
		`${process.env.NEXT_PUBLIC_API_URL}/collections/${collectionId}`,
	);
	if (!res.ok) return null;
	const collection: CollectionApiResponse = await res.json();
	return collection;
};
