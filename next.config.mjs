/** @format */

import withPlaiceholder from '@plaiceholder/next';

/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		remotePatterns: [
			{ hostname: 'localhost', port: '1337', pathname: '/uploads/**', protocol: 'http' },
			{ hostname: 'res.cloudinary.com', pathname: `/${process.env.NEXT_CLOUDINARY_NAME}/**`, protocol: 'https' },
		],
	},
};

module.exports = withPlaiceholder(nextConfig);
