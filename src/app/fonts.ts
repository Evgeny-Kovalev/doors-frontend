import localFont from 'next/font/local';

export const fontSfProRounded = localFont({
	src: [
		{
			path: '../../public/fonts/SF-Pro-Rounded/SF-Pro-Rounded-Regular.otf',
			weight: '400',
			style: 'normal',
		},
		{
			path: '../../public/fonts/SF-Pro-Rounded/SF-Pro-Rounded-Medium.otf',
			weight: '500',
			style: 'normal',
		},
		{
			path: '../../public/fonts/SF-Pro-Rounded/SF-Pro-Rounded-Semibold.otf',
			weight: '600',
			style: 'normal',
		},
		{
			path: '../../public/fonts/SF-Pro-Rounded/SF-Pro-Rounded-Bold.otf',
			weight: '700',
			style: 'normal',
		},
		{
			path: '../../public/fonts/SF-Pro-Rounded/SF-Pro-Rounded-Heavy.otf',
			weight: '800',
			style: 'normal',
		},
	],
	variable: '--font-sf-pro-rounded',
	display: 'swap',
});
