import type { ImageProps } from 'next/image';

export const nextImageMock = {
	__esModule: true,
	default: ({ alt }: ImageProps) => (
		<div role="img" aria-label={typeof alt === 'string' ? alt : 'image'} />
	),
};
