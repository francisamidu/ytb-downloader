import React, { MutableRefObject, useRef } from "react";
import { ChevronDown } from "lucide-react";
import { IFile } from "../types";
import { formatBytes } from "../helpers";

interface DropdownProps extends IFile {
  label: string;
  handler: ({ tag, url }: { tag: number; url: string }) => Promise<void>;
}
const Dropdown = ({
  label,
  videoFormats: links,
  handler,
}: Partial<DropdownProps>) => {
  const dropdownRef: MutableRefObject<any> = useRef();
  const handleClick = () => {
    dropdownRef?.current.classList.toggle("hidden");
  };
  const handleDownload = (tag: number, url: string) => {
    if (handler) handler({ tag, url });
  };
  return (
    <div className="relative">
      <button
        id="dropdownDefault"
        className="text-white bg-[#443a9b] hover:bg-[#3d348b]  focus:outline-none font-medium rounded-lg text-sm px-4 py-2.5 text-center inline-flex items-center dark:bg-[#3d348b] dark:hover:bg-[#43399b] dark:focus:ring-[#3d348b]"
        type="button"
        onClick={() => handleClick()}
      >
        <span className="mr-1">{label}</span>
        <ChevronDown size={15} color="#fff" />
      </button>
      <div
        ref={dropdownRef}
        className="hidden absolute top-10 left-0 z-10 w-44 bg-white rounded divide-y divide-gray-100 shadow transition-all duration-200"
      >
        <ul
          className="py-1 text-sm text-slate-800"
          aria-labelledby="dropdownDefault"
        >
          {links?.map((link) => (
            <li
              className="hover:cursor-pointer hover:bg-[#443a9b]"
              onClick={() => handleDownload(link.tag, link.url)}
            >
              <p
                data-value={link.format}
                data-url={`${link.url}`}
                className="block py-2 px-4 hover:bg-gray-100"
              >
                {link.format ? link.format : null}
                {link.format && link.size ? <span>-</span> : null}
                {Number(link.size) ? formatBytes(Number(link.size)) : null}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Dropdown;
