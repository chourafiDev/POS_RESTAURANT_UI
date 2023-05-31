import { ImSearch } from "react-icons/im";

const Search = () => {
  return (
    <div className="flex items-center bg-gray-light py-[3px] px-2 rounded-md w-96">
      <ImSearch className="text-dark/50" size={17} />
      <input
        type="text"
        className="outline-none px-2 py-2 bg-gray-light text-dark/50 font-normal text-sm w-full"
        placeholder="Search menu"
      />
    </div>
  );
};

export default Search;
