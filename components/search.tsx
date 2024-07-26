"use client";

import { useSearchStore } from "@/store/search-store";
import { useEffect, useState } from "react";
import { ChevronDownIcon, Search as SearchIcon } from "lucide-react";
import { useTagsModalStore } from "@/store/tags-modal-store";

const Tags = ({
  handleTagClick,
}: {
  handleTagClick: (tag: string) => void;
}) => {
  const { tags, allTags } = useSearchStore();
  return (
    <div className="hidden flex-wrap gap-2 md:flex">
      {allTags.map((tag) => (
        <div
          key={tag}
          onClick={() => handleTagClick(tag)}
          className={`${tags.includes(tag) ? "" : "opacity-50"} inline-flex h-6 shrink-0 cursor-pointer items-center justify-center gap-2 rounded-full bg-[#17D9D466] px-2 py-1 text-xs font-medium text-white transition-colors duration-300 ease-in-out hover:bg-[#17D9D480] active:bg-[#17D9D499]`}
        >
          {tag}
        </div>
      ))}
    </div>
  );
};

interface SearchProps {
  tags: string[];
}

const SearchInput = () => {
  const { searchKey } = useSearchStore();
  return (
    <div className="relative mx-auto w-full max-w-72">
      <input
        type="text"
        value={searchKey}
        placeholder="Search projects"
        onChange={(e) => useSearchStore.setState({ searchKey: e.target.value })}
        className="w-full rounded-full border border-[#BEBDBE] bg-black p-4 pl-12 font-medium text-white"
      />
      <SearchIcon className="absolute left-4 top-1/2 h-6 w-6 -translate-y-1/2 text-[#7E7E7E]" />
    </div>
  );
};

export default function Search({ tags }: SearchProps) {
  const { setTags, tags: searchTags, setAllTags, allTags } = useSearchStore();
  const { isOpen, setIsOpen } = useTagsModalStore();
  const [searchAllTags, setSearchAllTags] = useState(true);

  useEffect(() => {
    setAllTags(tags);
    setTags(tags);
  }, [setAllTags, setTags, tags]);

  useEffect(() => {
    if (searchAllTags) {
      setTags(tags);
    }
  }, [searchAllTags, tags, setTags]);

  const handleTagClick = (tag: string) => {
    if (searchAllTags) {
      setSearchAllTags(false);
      setTags([tag]);
    } else {
      if (searchTags.includes(tag)) {
        setTags(searchTags.filter((searchTag) => searchTag !== tag));
      } else {
        setTags(Array.from(new Set([...searchTags, tag])));
      }
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="relative">
        <SearchInput />
      </div>
      <label className="hidden cursor-pointer items-center md:inline-flex">
        <input
          type="checkbox"
          checked={searchAllTags}
          className="peer sr-only"
          onChange={() => setSearchAllTags((prev) => !prev)}
        />
        <div className="peer relative h-6 w-11 rounded-full bg-gray-200 after:absolute after:start-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-blue-600 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rtl:peer-checked:after:-translate-x-full dark:border-gray-600 dark:bg-gray-700 dark:peer-focus:ring-blue-800"></div>
        <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">
          All Tags
        </span>
      </label>
      <div
        onClick={() => setIsOpen(!isOpen)}
        className="mt-4 flex w-full cursor-pointer items-center justify-between truncate rounded-full border border-[#3F3F3F] bg-[#1A1A17] px-4 py-2 text-white md:hidden"
      >
        <span>
          {`Selected Tags: ${searchTags.length === allTags.length ? "All" : searchTags.join(", ")}`}
        </span>
        <ChevronDownIcon className="h-4 w-4" />
      </div>

      <Tags handleTagClick={handleTagClick} />
    </div>
  );
}
