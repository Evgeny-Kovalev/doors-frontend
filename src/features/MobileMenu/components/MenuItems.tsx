'use client';

import { useState } from 'react';
import { type MenuItem } from '../types';

interface MenuItemsProps {
	items: MenuItem[];
}

export default function MenuItems({ items }: MenuItemsProps) {
	const [itemsToShow, setItemsToShow] = useState(items);
	const [itemsStack, setItemsStack] = useState([items]);

	const changeMenuItems = (newItemsToShow: MenuItem[], newItemsStack: MenuItem[][]) => {
		setItemsToShow(newItemsToShow);
		setItemsStack(newItemsStack);
	};

	const moveToNext = (targetItem: MenuItem) => {
		const newItems = itemsToShow.find((item) => item.id === targetItem.id);

		if (newItems && newItems.items && newItems.items.length > 0) {
			changeMenuItems(newItems.items, [...itemsStack, itemsToShow]);
		}
	};

	const moveToPrevious = () => {
		const newItemsStack = [...itemsStack];
		const newItemsToShow = newItemsStack.pop();

		newItemsToShow && changeMenuItems(newItemsToShow, newItemsStack);
	};

	return (
		<ul>
			{itemsToShow.map((item) => {
				const isBackItem = item.label === 'back';
				const isShowAllItem = item.label === 'all';
				if (isBackItem) {
					return (
						<li
							className="container flex max-w-full cursor-pointer border-b border-b-gray-200 bg-background py-3"
							key={item.id}
							onClick={moveToPrevious}
						>
							{'<-- back'}
						</li>
					);
				}
				// if (isShowAllItem) {
				// 	return (
				// 		<li className="mb-2 cursor-pointer border-2 px-4 py-2" key={item.id}>
				// 			{'--- show all'}
				// 		</li>
				// 	);
				// }
				if (item.items && item.items.length > 0) {
					return (
						<li
							key={item.id}
							className="container flex max-w-full cursor-pointer border-b border-b-gray-200 bg-background py-3"
							onClick={() => moveToNext(item)}
						>
							{'>'}({item.id}){item.label}
						</li>
					);
				}
				return (
					<li
						className="container flex max-w-full cursor-pointer border-b border-b-gray-200 bg-background py-3"
						key={item.id}
					>
						({item.id}){item.label}
					</li>
				);
			})}
		</ul>
	);
}
