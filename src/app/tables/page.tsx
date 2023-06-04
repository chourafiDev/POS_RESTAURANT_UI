"use client";

import Header from "@/components/tables/Header";
import SelectedTables from "@/components/tables/SelectedTables";
import TableState from "@/components/tables/TableState";
import TablesList from "@/components/tables/TablesList";
import React, { useState } from "react";

const Page = () => {
  const [selectedTables, setSelectedTables] = useState<string[]>([]);

  // Handle select tables to pass orders
  const handleSelectedTable = (item: string) => {
    if (selectedTables.includes(item)) {
      const newTables = selectedTables.filter((table) => table !== item);
      return setSelectedTables(newTables);
    } else {
      return setSelectedTables((prev) => [...prev, item]);
    }
  };

  // Handle remove single table selected
  const removeSingleTable = (item: string) => {
    const newTables = selectedTables.filter((table) => table !== item);
    return setSelectedTables(newTables);
  };

  // Handle remove all tables selected
  const removeAllTables = () => {
    return setSelectedTables([]);
  };

  return (
    <div className="relative">
      <Header />
      <TableState
        removeAllTables={removeAllTables}
        selectedTables={selectedTables}
      />
      <TablesList
        handleSelectedTable={handleSelectedTable}
        selectedTables={selectedTables}
      />
      <SelectedTables
        selectedTables={selectedTables}
        removeSingleTable={removeSingleTable}
      />
    </div>
  );
};

export default Page;
