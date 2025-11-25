'use client';

import { usePathname, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import ym, { YMInitializer } from 'react-yandex-metrika';

const YM_COUNTER_ID = 105506318;

export const YandexMetrika = () => {
	const pathname = usePathname();
	const searchParams = useSearchParams();

	useEffect(() => {
		const params = searchParams.toString();
		const url = pathname + (params && '?' + params);

		ym('hit', url);
	}, [pathname, searchParams]);

	return (
		<YMInitializer
			accounts={[YM_COUNTER_ID]}
			options={{
				defer: true,
				webvisor: true,
				clickmap: true,
				trackLinks: true,
				accurateTrackBounce: true,
			}}
			version="2"
		/>
	);
};
