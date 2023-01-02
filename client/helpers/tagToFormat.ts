const tagToFormat = (tag: number) => {
  const tags = [
    //   18   mp4       360p    avc1.42001E, mp4a.40.2 696.66KB 96KB
    //   137  mp4       1080p   avc1.640028            4.53MB
    //   248  webm      1080p   vp9                    2.52MB
    //   136  mp4       720p    avc1.4d4016            2.2MB
    //   247  webm      720p    vp9                    1.44MB
    //   135  mp4       480p    avc1.4d4014            1.1MB
    //   134  mp4       360p    avc1.4d401e            593.26KB
    //   140  mp4               mp4a.40.2                       128KB
    18, 134, 135, 136, 137, 140, 247, 248,
  ];
  const _tag = tags.findIndex((num) => num === tag);

  const formats = ["mp4", "mp4", "mp4", "mp4", "mp4", "mp4", "webm", "webm"];
  const qualityFormats = [
    "360p",
    "360p",
    "480p",
    "720p",
    "1080p",
    "mp4",
    "720p",
    "1080p",
  ];
  return {
    quality: qualityFormats[_tag],
    format: formats[_tag],
  };
};
export default tagToFormat;
