/** @type {import('next').NextConfig} */
module.exports = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
  publicRuntimeConfig: {
    SERVER_URL: process.env.NEXT_PUBLIC_SERVER_URL,
    GET_AUDIO_PATH: process.env.NEXT_PUBLIC_GET_AUDIO_PATH,
    GET_VIDEO_PATH: process.env.NEXT_PUBLIC_GET_VIDEO_PATH,
    PLAYLIST_PATH: process.env.NEXT_PUBLIC_GET_PLAYLIST_PATH,
    DOWNLOAD_AUDIO_PATH: process.env.NEXT_PUBLIC_DOWNLOAD_AUDIO_PATH,
    DOWNLOAD_VIDEO_PATH: process.env.NEXT_PUBLIC_DOWNLOAD_VIDEO_PATH
  },
  reactStrictMode: true,
}
