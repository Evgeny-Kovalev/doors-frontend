/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: process.env.API_HOSTNAME,
				port: '',
				pathname: process.env.API_PATHNAME,
			},
		],
	},
};

export default nextConfig;
