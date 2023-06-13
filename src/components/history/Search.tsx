"use client";

import { ImSearch } from "react-icons/im";
import { DateInput } from "@mantine/dates";
import { useState } from "react";

const Search = () => {
  const [value, setValue] = useState<Date | null>(null);

  return (
    <div className="flex items-center gap-4">
      <div className="flex flex-1 items-center bg-gray-light/60 py-[3px] px-4 gap-2 rounded-2xl">
        <ImSearch className="text-dark/40" size={17} />
        <input
          type="text"
          className="outline-none px-2 py-3 bg-transparent font-normal w-[500px] text-sm text-gray/50"
          placeholder="Search menu"
        />
      </div>
      <DateInput
        value={value}
        onChange={setValue}
        placeholder="Date input"
        maw={400}
        mx="auto"
      />
    </div>
  );
};

export default Search;
