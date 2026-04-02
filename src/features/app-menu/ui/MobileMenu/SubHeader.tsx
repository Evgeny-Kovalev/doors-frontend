'use client';

import { Suspense } from 'react';

import { PhoneNumbersList, WorkingHoursList } from '@/shared/components';
import { Skeleton } from '@/shared/ui';

import { SearchBox } from '@/features/search';

import { CallBackButton, CallBackDialog } from '@/features/callback';
import { useMobileMenuStore } from '../../hooks/useMobileMenuStore';

interface SubHeaderProps {}

export default function SubHeader({}: SubHeaderProps) {
	const { toggleMobileMenu } = useMobileMenuStore();

	return (
		<div className="px-4 py-3">
			<div className="mb-3 flex max-w-full items-center justify-between">
				<WorkingHoursList className="text-sm" />
				<PhoneNumbersList className="text-sm text-nowrap" />
			</div>
			<Suspense fallback={<Skeleton className="mb-3 h-10" />}>
				<SearchBox onSearchButtonClick={toggleMobileMenu} className="mb-3" />
			</Suspense>
			<CallBackDialog>
				<CallBackButton />
			</CallBackDialog>
		</div>
	);
}
