/** @type {import('next').NextConfig} */
const nextConfig = {
   eslint: {
      // ✅ Skip ESLint on production builds (Netlify)
      ignoreDuringBuilds: true,
   },
};

export default nextConfig;
