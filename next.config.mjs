/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		remotePatterns: [
			{
				protocol: 'http',
				hostname: process.env.IMAGES_HOSTNAME ?? '',
				port: process.env.IMAGES_PORT,
				pathname: process.env.IMAGES_PATHNAME ?? '',
			},
		],
	},
};

export default nextConfig;
