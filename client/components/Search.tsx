import React, { useEffect, useState } from "react";
import { Search as SearchIcon } from "lucide-react";
import { Button } from ".";

type SearchProps = {
  handleSearch: (arg: string) => {};
  page: string;
};
const Search = ({ handleSearch, page }: SearchProps) => {
  const [param, setParams] = useState("");
  const [placeholder, setPlaceholder] = useState(
    "Enter or Paste YouTube video URL"
  );
  useEffect(() => {
    switch (page) {
      case "mp3-downloader": {
        setPlaceholder("Enter or Paste YouTube audio URL");
        break;
      }
      case "playlist": {
        setPlaceholder("Enter or Paste YouTube playlist URL");
        break;
      }
      default:
        break;
    }
    return () => {
      setPlaceholder("");
    };
  }, [placeholder, page]);
  return (
    <form
      className="my-7 flex justify-center items-center"
      onSubmit={(event) => {
        event.preventDefault();
        handleSearch();
      }}
    >
      <div className="w-3/5 flex justify-center items-center mb-3">
        <div className="relative w-full mr-3">
          <input
            onChange={(event) => setParams(event.target.value)}
            className="bg-gray-50 border border-[#3d348b] text-gray-900 text-sm rounded-sm focus:ring-[#3d348b] focus:border-[#3d348b] block w-full px-3 py-2.5 outline-none"
            placeholder={placeholder}
          />
        </div>
        <div className="h-full">
          <Button
            text="Search"
            classNames="bg-[#3d348b] rounded-sm"
            icon={<SearchIcon size={18} color={"white"} />}
            param={param}
            onClick={handleSearch}
          />
        </div>
      </div>
    </form>
  );
};

export default Search;
