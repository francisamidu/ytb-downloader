import express, { response } from "express";
import youtubeDl from "ytdl-core";
import ytpl from "ytpl";

const router = express.Router();

const toSupportedFormat = (url: string) => {
  if (url.includes("list=")) {
    const playlistId = url.substring(url.indexOf("list=") + 5);

    return `https://www.youtube.com/playlist?list=${playlistId}`;
  }

  return url;
};

router.get("/download-video", async (req, res) => {
  const { downloadFormat, url, title, itag, type } = req.query;

  const URL = toSupportedFormat(String(url));
  if (!url || !title) {
    return res.status(400).send("Please provide both url and title");
  }

  const videoId = youtubeDl.getURLVideoID(String(url));

  let info = await youtubeDl.getInfo(videoId);
  let format = youtubeDl.chooseFormat(info.formats, { quality: String(itag) });

  res
    .header(
      "Content-Disposition",
      `attachment; filename="${title}.${downloadFormat}"`
    )
    .setHeader("content-length", format.contentLength);

  youtubeDl(URL, {
    format,
    filter: (format) => !!format.contentLength,
  })
    .on("data", () => {})
    .pipe(res);
});

router.get("/video-info", async (req, res) => {
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

    const videoFormats = formats
      .map((format) => ({
        size: format.contentLength,
        format: format.qualityLabel,
        tag: format.itag,
        url: format.url,
      }))
      .filter((file) => !Number.isNaN(Number(file.size)));

    const videoDetails = {
      duration: lengthSeconds,
      title,
      thumbnail: thumbnails[2].url,
      channel: ownerChannelName,
      videoId,
      formats: videoFormats,
    };

    return res.status(200).json(videoDetails);
  } catch (error) {
    console.log(error);
    return res.status(500).send("Failed to fetch data");
  }
});

router.get("/audio-info", async (req, res) => {
  try {
    const url = toSupportedFormat(String(req.query.url));
    const dl = await youtubeDl.getBasicInfo(url);
    let info = await youtubeDl.getInfo(dl.videoDetails.videoId);
    const {
      videoDetails: {
        lengthSeconds,
        title,
        thumbnails,
        ownerChannelName,
        videoId,
      },
    } = dl;
    let audioFormats = youtubeDl
      .filterFormats(info.formats, "audioonly")
      .map((format) => ({
        size: format.contentLength,
        format: format.qualityLabel,
        tag: format.itag,
        url: format.url,
      }))
      .filter((file) => !Number.isNaN(Number(file.size)));
    const details = {
      duration: lengthSeconds,
      title,
      thumbnail: thumbnails[2].url,
      channel: ownerChannelName,
      videoId,
      formats: audioFormats,
    };
    return res.status(200).json(details);
  } catch (error) {
    console.log(error);
    return res.status(500).send("Failed to fetch data");
  }
});

router.get("/download-audio", async (req, res) => {});

router.get("/youtube-playlist", async (req, res) => {
  try {
    const { URL } = req.query;
    const result = await ytpl(String(URL));
    const playlist = result.items.map((item) => ({
      title: item.title,
      url: item.shortUrl,
    }));
    return res.status(200).json(playlist);
  } catch (error) {}
});

export default router;
