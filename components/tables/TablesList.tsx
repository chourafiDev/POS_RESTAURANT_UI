import React, { FC } from "react";
import Table from "./Table";
import { motion } from "framer-motion";
import { useGetTablesQuery } from "@/redux/services/tableApiSlice";
import Loading from "@/components/ui/Loading";
import { Table as ITable } from "@/types";

interface TablesListProps {
  handleSelectedTable: (item: number) => void;
  selectedTables: number[];
  status: string;
}

const TablesList: FC<TablesListProps> = ({
  handleSelectedTable,
  selectedTables,
  status,
}) => {
  // Fetch all categories
  const { data: tables, isLoading } = useGetTablesQuery(status);

  const tabContentVariant = {
    active: {
      display: "block",
      transition: {
        staggerChildren: 0.2,
      },
    },
    inactive: {
      display: "none",
    },
  };

  return (
    <div className="bg-gray-light/80 border border-gray-light min-h-full px-14 pt-4 pb-16 rounded-xl mt-8">
      <motion.div
        variants={tabContentVariant}
        animate="active"
        initial="inactive"
        className="d-flex gap-16 flex-wrap items-center"
      >
        {isLoading ? (
          <Loading type="tables" />
        ) : (
          tables?.map((table: ITable) => (
            <Table
              key={table._id}
              table={table}
              handleSelectedTable={handleSelectedTable}
              selectedTables={selectedTables}
            />
          ))
        )}
      </motion.div>
    </div>
  );
};

export default TablesList;
