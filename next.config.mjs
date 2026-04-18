/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "wefbkudqqqbkolnnsgit.supabase.co",
        port: "",
        pathname: "/storage/v1/object/public/**",
      },
      {
        // Allow any external http/https images (fallback for other CDN URLs stored in DB)
        protocol: "https",
        hostname: "**",
      },
    ],
  },
};

export default nextConfig;
