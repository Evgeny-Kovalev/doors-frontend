import { GoogleAnalytics } from '@next/third-parties/google';
import type { Metadata, Viewport } from 'next';

import { fontSfProRounded } from './fonts';
import { ScrollToTopButton } from '@/shared/components/ScrollToTopButton/ScrollToTopButton';
import { openGraph } from './shared-metadata';

import { Footer } from '@/widgets/Footer';
import { Header } from '@/widgets/Header';

import { CallBackDialog } from '@/features/callback';
import { Portal } from '@/shared/components/Portal';
import { Button } from '@/shared/ui';
import { Phone } from 'lucide-react';
import { Toaster } from 'react-hot-toast';

import './globals.css';

export const revalidate = 3600;

export const viewport: Viewport = {
	width: 'device-width',
	initialScale: 1,
	maximumScale: 1,
	userScalable: false,
};

export const metadata: Metadata = {
	title: {
		default: 'Двери \u2013 Входные и межкомнатные',
		template: '%s | Двери \u2013 Входные и межкомнатные',
	},
	description:
		'Купить входные и межкомнатные двери в Гомеле. 💰 Выгодные цены. ✅ Доставка по всему Гомелю. 💰 Наличный и резналичный расчет. ✅ Рассрочка. ✅ Широкий ассортимент дверей в каталоге.',
	alternates: {
		canonical: './',
	},
	metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL!),
	openGraph: {
		...openGraph,
		siteName: 'Двери \u2013 Входные и межкомнатные',
		type: 'website',
		locale: 'ru_RU',
		url: process.env.NEXT_PUBLIC_BASE_URL,
	},
	twitter: {
		card: 'summary_large_image',
		images: [
			{
				url: `/logo_large.webp`,
				width: 1200,
				height: 630,
				alt: 'Двери \u2013 Входные и межкомнатные',
				type: 'image/webp',
			},
		],
	},
	robots: {
		index: true,
		follow: true,
		'max-image-preview': 'large',
		'max-snippet': -1,
		'max-video-preview': -1,
		googleBot: 'index, follow',
	},
	applicationName: 'Двери \u2013 Входные и межкомнатные',
	appleWebApp: {
		title: 'Двери \u2013 Входные и межкомнатные',
		statusBarStyle: 'default',
		capable: true,
	},
	// verification: {
	// 	google: 'YOUR_DATA',
	// 	yandex: ['YOUR_DATA'],
	// 	other: {
	// 		'msvalidate.01': ['YOUR_DATA'],
	// 		'facebook-domain-verification': ['YOUR_DATA'],
	// 	},
	// },
	icons: {
		icon: [
			{ url: '/favicon.ico', type: 'image/x-icon' },
			{ url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
			{ url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
			{ url: '/android-chrome-192x192.png', sizes: '192x192', type: 'image/png' },
		],
		shortcut: [{ url: '/favicon.ico', type: 'image/x-icon' }],
		apple: [{ url: '/apple-touch-icon.png', type: 'image/png' }],
	},
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="ru">
			<GoogleAnalytics gaId={`${process.env.GOOGLE_ANALYTICS_ID}`} />
			<body className={`${fontSfProRounded.variable} font-sfProRounded`}>
				<Toaster position="top-center" reverseOrder={false} />
				<Header />
				<div className="min-h-[500px] bg-muted/40 pb-14">{children}</div>
				<div className="bg-gray-900 text-gray-100">
					<Footer />
				</div>
				<ScrollToTopButton />
				<Portal>
					<CallBackDialog>
						<Button className="fixed bottom-5 left-5 z-10 h-12 w-12 rounded-full p-1 md:hidden">
							<Phone width={20} height={20} color="white" />
						</Button>
					</CallBackDialog>
				</Portal>
				<div id="portal" />
			</body>
		</html>
	);
}
