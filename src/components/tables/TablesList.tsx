import React, { FC } from "react";
import Table from "./Table";
import { tables } from "@/utils/data";

interface TablesListProps {
  handleSelectedTable: (item: string) => void;
  selectedTables: string[];
}

const TablesList: FC<TablesListProps> = ({
  handleSelectedTable,
  selectedTables,
}) => {
  return (
    <div className="bg-gray-light/80 min-h-full px-14 pt-4 pb-16">
      <div className="flex gap-20 flex-wrap items-center">
        {tables.map((table) => (
          <Table
            key={table.number}
            table={table}
            handleSelectedTable={handleSelectedTable}
            selectedTables={selectedTables}
          />
        ))}
      </div>
    </div>
  );
};

export default TablesList;
