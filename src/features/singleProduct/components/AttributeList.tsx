'use client';

import {
	getGroupedAttributes,
	getPossibleVariants,
} from '@/features/singleProduct/helpers';
import { VariantApiResponse } from '@/shared/types';
import { cn } from '@/shared/ui/utils';
import { Trash } from 'lucide-react';
import React, { useCallback, useLayoutEffect, useMemo, useState } from 'react';
import { useProductStore } from '../store';
import { Attribute } from '../types';

interface Props extends React.HTMLAttributes<HTMLUListElement> {
	variants: VariantApiResponse[];
}

//TODO: refactor this code later
export default function AttributeList({ variants, className, ...rest }: Props) {
	const groupedAttributes = useMemo(() => getGroupedAttributes(variants), [variants]);

	const { selectedAttributes, setSelectedAttributes, activeVariant, setActiveVariant } =
		useProductStore();

	const [possibleAttributes, setPossibleAttributes] = useState(groupedAttributes);

	const onAttributeClick = useCallback(
		(data: Attribute) => {
			const { key, value } = data;

			const attributeIdx = selectedAttributes.findIndex((a) => a.key === key);

			if (attributeIdx >= 0) {
				const isValueNew = selectedAttributes[attributeIdx].value != value;
				if (isValueNew) {
					// remove old attribute and add new
					setSelectedAttributes([
						...selectedAttributes.filter((a) => a.key !== key && a.value != value),
						data,
					]);
				} else {
					// remove attribute
					setSelectedAttributes(
						selectedAttributes.filter((a) => a.key !== key && a.value != value),
					);
				}
			} else {
				// add attribute
				setSelectedAttributes([...selectedAttributes, data]);
			}
		},

		[selectedAttributes, setSelectedAttributes],
	);

	useLayoutEffect(() => {
		const validVariants = getPossibleVariants(variants, selectedAttributes);
		const groupedAttributes = getGroupedAttributes(validVariants);

		if (
			validVariants.length === 1 &&
			selectedAttributes.length ===
				Object.keys(getGroupedAttributes(variants)).length /* all attributes */
		) {
			setActiveVariant(validVariants[0]);
		} else {
			if (!!activeVariant) setActiveVariant(null);
		}
		setPossibleAttributes(groupedAttributes);
	}, [activeVariant, selectedAttributes, setActiveVariant, variants]);

	const isAttributeSelectedWithValue = useCallback(
		({ key, value }: Attribute) => {
			const isSelected = selectedAttributes.find(
				(a) => a.key === key && a.value === value,
			);
			return isSelected;
		},
		[selectedAttributes],
	);

	const isAttributeKeySelected = ({ key, value }: Attribute) => {
		return selectedAttributes.findIndex((a) => a.key === key && a.value !== value) >= 0;
	};

	const isPossibleToSelectAttribute = ({ key, value }: Attribute) => {
		if (possibleAttributes[key].values.includes(value)) {
			return true;
		} else {
			return false;
		}
	};

	return (
		<>
			<ul className={cn(className)}>
				{Object.values(groupedAttributes).map((a) => {
					return (
						<li key={a.key} className="mb-5 last:mb-0">
							<div className="mb-2 font-bold">{a.label}</div>
							<ul className="flex flex-wrap gap-2">
								{a.values.map((value) => {
									const isPossible = isPossibleToSelectAttribute({
										key: a.key,
										value,
									});
									return (
										<li key={a.key + value}>
											<button
												className={cn(
													'relative overflow-hidden rounded-lg px-4 py-2 text-center shadow-[0_0_0_1px_rgba(0,0,0,.15)]',
													{
														'shadow-[0_0_0_2px_rgba(0,0,0,.9)]':
															isAttributeSelectedWithValue({
																key: a.key,
																value,
															}),
													},
												)}
												onClick={() =>
													onAttributeClick({ key: a.key, value })
												}
												disabled={!isPossible}
											>
												{isPossible ? (
													value
												) : (
													<>
														<span className="absolute bottom-0 left-0 right-0 top-1/2 h-[1px] w-full rotate-45 bg-red-600"></span>
														<span className="absolute bottom-0 left-0 right-0 top-1/2 h-[1px] w-full -rotate-45 bg-red-600"></span>
														<span className="opacity-25">{value}</span>
													</>
												)}
											</button>
										</li>
									);
								})}
							</ul>
						</li>
					);
				})}
			</ul>
			{selectedAttributes.length > 0 && (
				<span
					className="mt-3 inline-flex cursor-pointer items-center justify-center gap-1 text-sm text-gray-600 hover:underline"
					onClick={() => setSelectedAttributes([])}
				>
					<Trash width={13} height={13} />
					Очистить
				</span>
			)}
		</>
	);
}
