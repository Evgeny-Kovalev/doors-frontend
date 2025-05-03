/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: process.env.IMAGES_HOSTNAME ?? '',
				port: process.env.IMAGES_PORT,
				pathname: process.env.IMAGES_PATHNAME ?? '',
			},
			{
				protocol: 'https',
				hostname: '*',
				pathname: '/**',
			},
			{
				protocol: 'http',
				hostname: '*',
				pathname: '/**',
			},
		],
	},
};

export default nextConfig;
