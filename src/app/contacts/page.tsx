import { Metadata } from 'next';

import PageTitle from '@/shared/components/layout/PageTitle';
import { SHOP_INFO } from '@/shared/constants';
import BoxContainer from '@/shared/components/layout/BoxContainer';
import { openGraph } from '../shared-metadata';

export const metadata: Metadata = {
	title: 'Контакты',
	openGraph: {
		...openGraph,
		url: `${process.env.NEXT_PUBLIC_BASE_URL}/contacts`,
	},
};

export default async function Page() {
	return (
		<BoxContainer>
			<div className="grid grid-cols-2 gap-5">
				<div className="col-span-2 lg:col-span-1">
					<PageTitle>Контактная информация</PageTitle>
					<ul className="flex flex-col gap-5">
						<li>
							<b>Адрес:</b> {SHOP_INFO.adress}
						</li>
						{SHOP_INFO.phones.map((phone) => (
							<li key={phone.label}>
								<b>Тел:</b>{' '}
								<a
									href={'tel:' + phone.tel}
									className="hover:text-primary-accent"
								>
									{phone.label}
								</a>
							</li>
						))}
						<li>Вы можете связаться с нами по любым возникшим у вас вопросам.</li>
					</ul>
				</div>
				<div className="col-span-2 lg:col-span-1">
					<iframe
						src="https://yandex.ru/map-widget/v1/?um=constructor%3A7b6a8c001740a9bddc0e1e51a171a72129d046ec6e67ba7acc33b29023bb35f1&amp;source=constructor"
						width="100%"
						height="400"
					></iframe>
				</div>
			</div>
		</BoxContainer>
	);
}
