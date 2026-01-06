type MillingTypeKey = 'type-2' | 'type-1' | 'type-4' | 'type-5' | 'type-7' | 'type-6';
type FilmTypeKey = '2' | '6' | '5' | '3' | '7';

export type OutputDataItem = {
	title?: string;
	imageUrl?: string;
};

export type ProductConstructorResponse = {
	millings: Record<
		MillingTypeKey,
		{
			keyLabel: string;
			items: OutputDataItem[];
		}
	>;
	films: Record<
		FilmTypeKey,
		{
			keyLabel: string;
			items: OutputDataItem[];
		}
	>;
	colors: {
		keyLabel: string;
		items: OutputDataItem[];
	};
	plywoods: {
		keyLabel: string;
		items: OutputDataItem[];
	};
};

export const MILLING_TYPE_TITLE_MAP = {
	'type-2': 'Простые',
	'type-1': 'Премиум',
	'type-4': 'ХФ',
	'type-5': 'Комби',
	'type-7': 'Молдинг',
	'type-6': '3D',
} as const;

export const FILM_TYPE_TITLE_MAP = {
	'2': 'ПВХ',
	'6': 'Люкс',
	'5': 'Премиум',
	'3': 'Винорит',
	'7': 'Элит',
} as const;
