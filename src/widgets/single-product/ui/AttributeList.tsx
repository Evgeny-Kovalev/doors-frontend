'use client';

import { useEffect, useMemo, useState } from 'react';
import { Trash } from 'lucide-react';

import { VariantApiResponse } from '@/shared/types';
import { cn } from '@/shared/ui/utils';

import { useProductStore } from '../model';
import {
	getParamsObjectFromVariants,
	filterVariants,
	getVariantByAttributes,
} from '../lib/attributes';

interface AttributeListProps {
	variants: VariantApiResponse[];
}

export const AttributeList = ({ variants }: AttributeListProps) => {
	const { setActiveVariant } = useProductStore();
	const [selectedItems, setSelectedItems] = useState<{ [key: string]: string }>({});
	const selectedItemsKeys = Object.keys(selectedItems);

	const paramsObjectDefault = useMemo(
		() => getParamsObjectFromVariants(variants),
		[variants],
	);

	const updateSelectedItems = (key: string, value: string) => {
		if (selectedItems[key] && selectedItems[key] === value) {
			setSelectedItems((prev) => {
				const prevCopy = { ...prev };
				delete prevCopy[key];
				return prevCopy;
			});
		} else {
			setSelectedItems((prev) => ({
				...prev,
				[key]: value,
			}));
		}
	};

	const onItemClick = (key: string, value: string) => updateSelectedItems(key, value);

	const paramsObject = useMemo(
		() => getParamsObjectFromVariants(filterVariants(variants, selectedItems)),
		[selectedItems, variants],
	);

	useEffect(() => {
		if (selectedItemsKeys.length === Object.keys(paramsObjectDefault).length) {
			const selectedVariant = getVariantByAttributes(variants, selectedItems);
			selectedVariant && setActiveVariant(selectedVariant);
		} else {
			setActiveVariant(null);
		}
	}, [
		paramsObjectDefault,
		selectedItems,
		selectedItemsKeys.length,
		setActiveVariant,
		variants,
	]);

	const isPossibleToSelectAttribute = (key: string, value: string) => {
		return !(
			paramsObject[key] &&
			!paramsObject[key].values.some((v) => v.value == value) &&
			!(
				selectedItemsKeys.length === 1 &&
				selectedItems[key] &&
				selectedItems[key] != value
			)
		);
	};

	return (
		<>
			<ul>
				{Object.entries(paramsObjectDefault)
					.sort(([key1], [key2]) => key1.localeCompare(key2))
					.map(([key, param]) => (
						<li key={param.key.value} className="mb-5 last:mb-0">
							<div className="mb-2 font-bold">{param.key.label}:</div>
							<div className="flex flex-wrap gap-2">
								{param.values.map(({ imgUrl, value }) => {
									const isDisabled = !isPossibleToSelectAttribute(key, value);

									return (
										<button
											key={value}
											className={cn(
												'relative overflow-hidden rounded-lg px-4 py-2 text-center shadow-[0_0_0_1px_rgba(0,0,0,.15)]',
												{
													'shadow-[0_0_0_2px_rgba(0,0,0,.9)]':
														selectedItems[key] &&
														selectedItems[key] === value,
												},
											)}
											onClick={() => onItemClick(key, value)}
											disabled={isDisabled}
										>
											{isDisabled ? (
												<>
													<span className="absolute bottom-0 left-0 right-0 top-1/2 h-[1px] w-full rotate-45 bg-red-600"></span>
													<span className="absolute bottom-0 left-0 right-0 top-1/2 h-[1px] w-full -rotate-45 bg-red-600"></span>
													<span className="opacity-25">{value}</span>
												</>
											) : (
												value
											)}
										</button>
									);
								})}
							</div>
						</li>
					))}
			</ul>
			{selectedItemsKeys.length > 0 && (
				<span
					className="mt-3 inline-flex cursor-pointer items-center justify-center gap-1 text-sm text-gray-600 hover:underline"
					onClick={() => setSelectedItems({})}
				>
					<Trash width={13} height={13} />
					Очистить
				</span>
			)}
		</>
	);
};
