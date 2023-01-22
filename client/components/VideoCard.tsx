import React from "react";

import Image from "next/image";
import { Dropdown } from ".";
import { IFile } from "../types";

interface VideoCardProps extends IFile {
  timestamp: string;
  handler: ({ tag, url }: { tag: number; url: string }) => Promise<void>;
}
const VideoCard = ({
  channel,
  formats,
  timestamp,
  title,
  thumbnail,
  handler,
}: Partial<VideoCardProps>) => {
  return (
    <div className="bg-gray-100 flex flex-row p-2">
      <Image
        src={thumbnail || ""}
        alt="Thumbnail"
        className="rounded-md"
        width="350"
        height="350"
      />
      <div className="mx-2.5">
        <h1 className="font-bold capitalize text-slate-800">{title}</h1>
        <h2 className="text-sm capitalize text-slate-600 my-3">{channel}</h2>
        <h2 className="text-sm capitalize text-slate-600">{timestamp}</h2>
        <div className="mt-3">
          <Dropdown
            label="Choose format"
            formats={formats}
            handler={handler}
            duration={0}
            title={""}
            thumbnail={""}
            channel={""}
            videoId={0}
          />
        </div>
      </div>
    </div>
  );
};

export default VideoCard;
