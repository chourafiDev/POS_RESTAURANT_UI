"use client";

import Header from "@/components/tables/Header";
import SelectedTables from "@/components/tables/SelectedTables";
import TableState from "@/components/tables/TableState";
import TablesList from "@/components/tables/TablesList";
import React, { useState } from "react";

const Page = ({ params: { locale } }: { params: { locale: string } }) => {
  const [selectedTables, setSelectedTables] = useState<number[]>([]);

  // Handle select tables to pass orders
  const handleSelectedTable = (item: number) => {
    if (selectedTables.includes(item)) {
      const newTables = selectedTables.filter((table) => table !== item);
      return setSelectedTables(newTables);
    } else {
      return setSelectedTables((prev) => [...prev, item]);
    }
  };

  // Handle remove single table selected
  const removeSingleTable = (item: number) => {
    const newTables = selectedTables.filter((table) => table !== item);
    return setSelectedTables(newTables);
  };

  // Handle remove all tables selected
  const removeAllTables = () => {
    return setSelectedTables([]);
  };

  return (
    <div className="relative">
      <div className="bg-white rounded-xl">
        <Header />
        <TableState
          removeAllTables={removeAllTables}
          selectedTables={selectedTables}
        />
      </div>

      <TablesList
        handleSelectedTable={handleSelectedTable}
        selectedTables={selectedTables}
      />
      <SelectedTables
        selectedTables={selectedTables}
        removeSingleTable={removeSingleTable}
        locale={locale}
      />
    </div>
  );
};

export default Page;
