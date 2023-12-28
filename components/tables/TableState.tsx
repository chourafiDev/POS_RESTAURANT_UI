import React, { FC } from "react";
import Button from "../ui/Button";
import { AiOutlineClear } from "react-icons/ai";
import { AnimatePresence, motion } from "framer-motion";

interface TableStateProps {
  removeAllTables: () => void;
  selectedTables: number[];
}

const TableState: FC<TableStateProps> = ({
  removeAllTables,
  selectedTables,
}) => {
  return (
    <div className="py-6 px-8 relative">
      <div className="flex items-center gap-7">
        <div className="flex items-center gap-2">
          <div className="bg-blue/20 w-7 h-7 rounded-full flex justify-center items-center">
            <div className="bg-blue w-4 h-4 rounded-full shadow-xl shadow-blue/40"></div>
          </div>
          <p className="text-dark/60 font-medium">Available</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="bg-orange-100 w-7 h-7 rounded-full flex justify-center items-center">
            <div className="bg-orange-500 w-4 h-4 rounded-full shadow-xl shadow-orange-400"></div>
          </div>
          <p className="text-dark/60 font-medium">Booked</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="bg-brand/30 w-7 h-7 rounded-full flex justify-center items-center">
            <div className="bg-brand w-4 h-4 rounded-full shadow-xl shadow-brand/40"></div>
          </div>
          <p className="text-dark/60 font-medium">Billed</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="bg-gray/20 w-7 h-7 rounded-full flex justify-center items-center">
            <div className="bg-gray/60 w-4 h-4 rounded-full shadow-xl shadow-gray"></div>
          </div>
          <p className="text-dark/60 font-medium">Occupied</p>
        </div>
      </div>

      {/* Button clear all */}
      <AnimatePresence initial={false}>
        {selectedTables.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{
              opacity: 1,
              transition: { duration: 0.75 / 2, delay: 0.75 / 2 },
            }}
            exit={{ opacity: 0, transition: { duration: 0.75 / 2 } }}
            className="absolute right-6 top-[1.3rem]"
          >
            <Button
              variant="secondary"
              size="sm"
              rounded="full"
              className="rounded-full gap-2"
              onClick={removeAllTables}
            >
              <AiOutlineClear size={22} />
              <p>Clear All</p>
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default TableState;
