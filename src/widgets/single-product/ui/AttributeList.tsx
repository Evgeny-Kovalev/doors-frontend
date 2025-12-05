'use client';

import { useEffect, useMemo, useState } from 'react';
import { Trash } from 'lucide-react';

import { VariantApiResponse } from '@/shared/types';
import { cn } from '@/shared/ui';

import { useProductStore } from '../model';

interface AttributeListProps {
	variants: VariantApiResponse[];
}

type AttributeKey = {
	id: number;
	value: string;
	label: string;
};
type AttributeValue = {
	id: number;
	value: string;
	imgUrl: string | null;
	isDisabled?: boolean;
};

export const AttributeList = ({ variants }: AttributeListProps) => {
	const { activeVariant, setActiveVariant } = useProductStore();
	const [selectedItems, setSelectedItems] = useState<{ [key: string]: string }>({});

	const isVariantCompatibleWithSelection = (
		variant: VariantApiResponse,
		selection: Record<string, string>,
	) => {
		return Object.keys(selection).every((k) => {
			const attr = variant.attributes.find((a) => a.key.value === k);
			return !!attr && attr.value.value === selection[k];
		});
	};

	const grouped = useMemo(() => {
		const map: Record<
			string,
			{
				key: AttributeKey;
				values: AttributeValue[];
			}
		> = {};

		variants.forEach((v) => {
			v.attributes.forEach((a) => {
				const key = a.key.value;
				const value = a.value.value;
				const imgUrl = a.value.imgUrl ?? null;

				if (!map[key]) {
					map[key] = {
						key: { label: a.key.label, value: key, id: a.key.id },
						values: [],
					};
				}

				if (!map[key].values.find((x) => x.value === value)) {
					map[key].values.push({ id: map[key].values.length + 1, value, imgUrl });
				}
			});
		});

		Object.keys(map).forEach((key) => {
			map[key].values = map[key].values.map((v) => {
				const candidateSelection = { ...selectedItems, [key]: v.value };
				const isAvailable = variants.some((variant) =>
					isVariantCompatibleWithSelection(variant, candidateSelection),
				);
				return { ...v, isDisabled: !isAvailable };
			});
		});

		return map;
	}, [variants, selectedItems]);

	const handleValueClick = (key: string, value: string, isDisabled?: boolean) => {
		if (isDisabled) return;

		setSelectedItems((prev) => {
			const next = { ...prev };
			if (next[key] === value) delete next[key];
			else next[key] = value;
			return next;
		});
	};

	useEffect(() => {
		const found = variants.find((v) =>
			v.attributes.every(
				(a) =>
					selectedItems[a.key.value] && selectedItems[a.key.value] === a.value.value,
			),
		);

		if (found) setActiveVariant(found);
	}, [selectedItems, variants, setActiveVariant]);

	useEffect(() => {
		if (!activeVariant) return;

		const newSelection = activeVariant.attributes.reduce<Record<string, string>>(
			(acc, a) => {
				acc[a.key.value] = a.value.value;
				return acc;
			},
			{},
		);

		setSelectedItems(newSelection);
	}, [activeVariant]);

	return (
		<div className="relative">
			{Object.keys(grouped).map((k) => {
				const g = grouped[k];
				return (
					<ul key={k} className="mb-5">
						<div className="font-semibold">{g.key.label}:</div>
						<li className="mt-1 flex flex-wrap gap-2">
							{g.values.map((v) => (
								<button
									key={v.value}
									type="button"
									disabled={v.isDisabled}
									onClick={() => handleValueClick(k, v.value, v.isDisabled)}
									className={cn(
										'relative overflow-hidden rounded border px-3 py-2 text-sm',
										selectedItems[k] === v.value && 'bg-gray-200',
									)}
								>
									{v.isDisabled ? (
										<>
											<span className="absolute -left-1/2 bottom-0 right-1/2 top-1/2 h-[1px] w-[200%] rotate-45 bg-red-600"></span>
											<span className="absolute -left-1/2 bottom-0 right-1/2 top-1/2 h-[1px] w-[200%] -rotate-45 bg-red-600"></span>
											<span className="opacity-25">{v.value}</span>
										</>
									) : (
										v.value
									)}
								</button>
							))}
						</li>
					</ul>
				);
			})}
			{Object.keys(selectedItems).length > 0 && (
				<span
					className="absolute -bottom-2.5 inline-flex cursor-pointer items-center justify-center gap-1 text-sm text-gray-600 hover:underline"
					onClick={() => setSelectedItems({})}
				>
					<Trash width={13} height={13} />
					Очистить
				</span>
			)}
		</div>
	);
};
