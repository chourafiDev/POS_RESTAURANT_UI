import { ImSearch } from "react-icons/im";

const Search = () => {
  return (
    <div className="flex items-center gap-4">
      <div className="flex items-center bg-white py-[3px] px-4 gap-2 rounded-md">
        <ImSearch className="text-dark/40" size={17} />
        <input
          type="text"
          className="outline-none px-2 py-3 bg-white font-normal w-[500px] text-sm text-gray/50"
          placeholder="Search menu"
        />
      </div>
      <p className="text-brand text-sm"> Showing 20 items</p>
    </div>
  );
};

export default Search;
