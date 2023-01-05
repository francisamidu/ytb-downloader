import React, { useEffect, useState } from "react";
import { Search, Spinner, VideoCard } from ".";
import { downloadFile, formatTime, getFile, tagToFormat } from "../helpers";
import getConfig from "next/config";
import { IFile } from "../types";
import { AxiosResponse } from "axios";
import { toast } from "react-toastify";
const { publicRuntimeConfig } = getConfig();
const {
  DOWNLOAD_PATH,
  SERVER_URL,
  GET_AUDIO_PATH,
  GET_PLAYLIST_PATH,
  GET_VIDEO_PATH,
} = publicRuntimeConfig;

const Home = ({ page }: { page: string }) => {
  const [file, setFile] = useState<IFile>({
    channel: "",
    duration: 0,
    thumbnail: "",
    title: "",
    videoFormats: [],
    videoId: 0,
  });
  const [h2, setH2] = useState("");
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [path, setPath] = useState<AxiosResponse<IFile, any>>({
    config: {},
    data: {
      channel: "",
      duration: 0,
      thumbnail: "",
      title: "",
      videoFormats: [],
      videoId: 0,
    },
    headers: {},
    status: 0,
    statusText: "",
    request: {},
  });
  const handleSearch = async (param: string) => {
    setLoading(true);
    setUrl(param);
    try {
      switch (page) {
        case "mp3-downloader":
          setPath(await getFile(`${SERVER_URL}${GET_AUDIO_PATH}?url=${param}`));
          break;
        case "playlist": {
          setPath(
            await getFile(`${SERVER_URL}${GET_PLAYLIST_PATH}?url=${param}`)
          );
          break;
        }
        default:
          setPath(await getFile(`${SERVER_URL}${GET_VIDEO_PATH}?url=${param}`));
          break;
      }
      toast.success("Found video");
      setFile(path.data);
      setLoading(false);
    } catch (error) {
      toast.error("Something went wrong");
      setLoading(false);
      console.log(error);
    }
  };
  const handleDownload = async ({ tag }: { tag: number }) => {
    setLoading(true);
    const downloadFormat = tagToFormat(tag);
    try {
      await downloadFile(
        `${SERVER_URL}${DOWNLOAD_PATH}?url=${url}&itag=${tag}&downloadFormat=${downloadFormat.format}&title=${file.title}&type=audioandvideo`
      );
      setLoading(false);
    } catch (error) {
      toast.error("Something went wrong");
      setLoading(false);
      console.log(error);
    }
  };
  useEffect(() => {
    switch (page) {
      case "mp3-downloader": {
        setH2("Download YouTube audio in high quality formats");
        break;
      }
      case "playlist": {
        setH2("Download YouTube playlists in HD formats");
        break;
      }
      default: {
        setH2("Download YouTube videos and audios in HD formats");
        break;
      }
    }
    return () => {
      setH2("");
    };
  }, [page]);
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold text-center text-[#3d348b]">
        YouTube Video, Audio and Playlist downloader
      </h1>
      <h2 className="mt-2 text-center text-slate-600">{h2}</h2>
      <div className="md:max-w-screen-md mx-auto">
        <Search handleSearch={handleSearch} page={page} />
        <div className="flex flex-row justify-center items-center ">
          {loading ? <Spinner /> : null}
        </div>
        {file.title && file.thumbnail && !loading ? (
          <VideoCard
            key={file.videoId}
            handler={handleDownload}
            thumbnail={file.thumbnail}
            timestamp={formatTime(file.duration)}
            title={file.title}
            channel={file.channel}
            videoFormats={file.videoFormats}
          />
        ) : null}
      </div>
    </div>
  );
};

export default Home;
