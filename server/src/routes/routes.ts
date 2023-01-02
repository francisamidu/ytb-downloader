import express from "express";
import youtubeDl from "ytdl-core";

const router = express.Router();

const toSupportedFormat = (url: string) => {
  if (url.includes("list=")) {
    const playlistId = url.substring(url.indexOf("list=") + 5);

    return `https://www.youtube.com/playlist?list=${playlistId}`;
  }

  return url;
};

router.get("/download", async (req, res) => {
  const { downloadFormat, url, title, itag, type } = req.query;

  const URL = toSupportedFormat(String(url));
  if (!url || title) {
    return res
      .status(400)
      .json({ message: "Please provide both url and title" });
  }
  res.header(
    "Content-Disposition",
    `attachment; filename="${String(title).substring(0, 25)}.${downloadFormat}"`
  );
  youtubeDl(URL, {
    filter: type === "video-only" ? "videoonly" : "audioandvideo",
    quality: Number(itag),
  })
    .pipe(res)
    .on("response", (response) => {
      // If you want to set size of file in header
      res.setHeader("content-length", response.headers["content-length"]);
    })
    .on("error", (error) => {
      return res.status(500).json({ message: error.message });
    })
    .pipe(res);
});

router.get("/youtube", async (req, res) => {
  try {
    const { url } = req.query;

    const URL = toSupportedFormat(String(url));
    const dl = await youtubeDl.getBasicInfo(URL);
    const {
      formats,
      videoDetails: {
        lengthSeconds,
        title,
        thumbnails,
        ownerChannelName,
        videoId,
      },
    } = dl;

    const videoFormats = formats.map((format) => ({
      size: format.contentLength,
      format: format.qualityLabel,
      tag: format.itag,
      url: format.url,
    }));

    const videoDetails = {
      duration: lengthSeconds,
      title,
      thumbnail: thumbnails[2].url,
      channel: ownerChannelName,
      videoId,
      videoFormats,
    };

    return res.status(200).json(videoDetails);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Failed to fetch data" });
  }
});

router.get("/youtube-mp3", (req, res) => {
  const url = toSupportedFormat(req.body.url);
});

router.get("/youtube-playlist", (req, res) => {
  const url = toSupportedFormat(req.body.url);
});

export default router;
