import { FC } from "react";
import { motion } from "framer-motion";
import { Table } from "../../../types";

interface TableProps {
  table: Table;
  handleSelectedTable: (item: number) => void;
  selectedTables: number[];
}

const Table: FC<TableProps> = ({
  table: { number, numberOfGuests, status },
  handleSelectedTable,
  selectedTables,
}) => {
  const tableVariant = {
    active: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
    inactive: {
      opacity: 0,
      y: 10,
      transition: {
        duration: 0.5,
      },
    },
  };
  return (
    <motion.div
      key={number}
      className={`relative ${numberOfGuests === 8 ? "w-36" : "w-[95px]"}`}
      variants={tableVariant}
    >
      {/* Top */}
      {numberOfGuests === 8 ? (
        <div className="flex items-center justify-center gap-2 mb-1 mx-3">
          <div className="h-5 w-12 rounded-md bg-white"></div>
          <div className="h-5 w-12 rounded-md bg-white"></div>
          <div className="h-5 w-12 rounded-md bg-white"></div>
        </div>
      ) : numberOfGuests === 6 ? (
        <div className="flex items-center justify-center gap-2 mb-1 mx-3">
          <div className="h-5 w-12 rounded-md bg-white"></div>
          <div className="h-5 w-12 rounded-md bg-white"></div>
        </div>
      ) : (
        <div className="h-5 w-12 rounded-md mb-1 bg-white mx-auto"></div>
      )}

      <div
        className={`bg-white rounded-lg py-3 border-[2px] w-full h-full flex justify-center items-center mx-auto cursor-pointer ${
          selectedTables.includes(number) ? "border-dark/60" : "border-white"
        }`}
        onClick={() => handleSelectedTable(number)}
      >
        <div
          className={`${
            status === "Available"
              ? "bg-blue"
              : status === "Billed"
              ? "bg-brand"
              : status === "Occupied"
              ? "bg-gray/60"
              : "bg-orange-500"
          }  rounded-full w-12 h-12 flex justify-center items-center`}
        >
          <p className="text-white font-medium text-sm">T-{number}</p>
        </div>
      </div>

      {/* Bottom */}
      {numberOfGuests === 8 ? (
        <div className="flex items-center justify-center gap-2 mt-1 mx-3">
          <div className="h-5 w-12 rounded-md bg-white"></div>
          <div className="h-5 w-12 rounded-md bg-white"></div>
          <div className="h-5 w-12 rounded-md bg-white"></div>
        </div>
      ) : numberOfGuests === 6 ? (
        <div className="flex items-center justify-center gap-2 mt-1 mx-3">
          <div className="h-5 w-12 rounded-md bg-white"></div>
          <div className="h-5 w-12 rounded-md bg-white"></div>
        </div>
      ) : (
        <div className="h-5 w-12 rounded-md mt-1 bg-white mx-auto"></div>
      )}

      {/* Left */}
      <div className="h-12 w-5 top-[20%] -left-6 rounded-md mt-1 mx-auto bg-white absolute"></div>
      {/* Right */}
      <div className="h-12 w-5 top-[20%] -right-6 rounded-md mt-1 mx-auto bg-white absolute"></div>
    </motion.div>
  );
};

export default Table;
