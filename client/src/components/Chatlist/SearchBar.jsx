import React from "react";
import { BiSearchAlt2 } from "react-icons/bi";
import { BsFilter } from "react-icons/bs";

function SearchBar() {
  return (
    <div className="flex py-3 pl-5 items-center gap-3 h-14">
      <div className="flex items-center gap-5 px-3 py-1 rounded-lg flex-grow">
        <div>
          <BiSearchAlt2 className="cursor-pointer text-lg text-primary" />
        </div>
        <div>
          <input
            type="text "
            placeholder="Search or start a new chat"
            className="bg-transparent text-sm focus:outline-none w-full"
          />
        </div>
      </div>
      <div className="pr-5 pl-3 ">
        <BsFilter className="cursor-pointer text-lg text-primary" />
      </div>
    </div>
  );
}

export default SearchBar;
