import { FC } from "react";
import { Table } from "../../../types";

interface TableProps {
  table: Table;
  handleSelectedTable: (item: string) => void;
  selectedTables: string[];
}

const Table: FC<TableProps> = ({
  table: { number, guests, status },
  handleSelectedTable,
  selectedTables,
}) => {
  return (
    <div
      className={` h-[80px] relative mb-4 ${
        guests === 8 ? "w-36" : "w-[75px]"
      }`}
    >
      {/* Top */}
      {guests === 8 ? (
        <div className="flex items-center justify-center gap-2 mb-1 mx-3">
          <div className="h-5 w-12 rounded-md bg-white"></div>
          <div className="h-5 w-12 rounded-md bg-white"></div>
          <div className="h-5 w-12 rounded-md bg-white"></div>
        </div>
      ) : (
        <div className="h-5 w-12 rounded-md mb-1 bg-white mx-auto"></div>
      )}

      <div
        className={`bg-white rounded-lg  w-full h-full flex justify-center items-center mx-auto cursor-pointer ${
          selectedTables.includes(number) && "border-[2px] border-dark/60"
        }`}
        onClick={() => handleSelectedTable(number)}
      >
        <div
          className={`${
            status === "available"
              ? "bg-blue"
              : status === "billed"
              ? "bg-brand"
              : status === "occupied"
              ? "bg-gray/60"
              : "bg-orange-500"
          }  rounded-full w-12 h-12 flex justify-center items-center`}
        >
          <p className="text-white font-medium text-sm">{number}</p>
        </div>
      </div>

      {/* Bottom */}
      {guests === 8 ? (
        <div className="flex items-center justify-center gap-2 mt-1 mx-3">
          <div className="h-5 w-12 rounded-md bg-white"></div>
          <div className="h-5 w-12 rounded-md bg-white"></div>
          <div className="h-5 w-12 rounded-md bg-white"></div>
        </div>
      ) : (
        <div className="h-5 w-12 rounded-md mt-1 bg-white mx-auto"></div>
      )}

      {/* Left */}
      <div className="h-12 w-5 top-[50%] -left-6 rounded-md mt-1 mx-auto bg-white absolute"></div>
      {/* Right */}
      <div className="h-12 w-5 top-[50%] -right-6 rounded-md mt-1 mx-auto bg-white absolute"></div>
    </div>
  );
};

export default Table;
