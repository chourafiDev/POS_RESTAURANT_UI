"use client";

import React, { FC, useState } from "react";

interface Tabs {
  title: string;
  id: string;
  content: any;
}

interface OrdersProps {
  tabs: Tabs[];
}

const Orders: FC<OrdersProps> = ({ tabs }) => {
  const [activeTabIndex, setActiveTabIndex] = useState(0);

  const onTabClick = (index: number) => {
    setActiveTabIndex(index);
  };

  return (
    <>
      <ul
        className="flex items-center gap-4 mb-5 bg-white p-4 rounded-xl"
        role="tablist"
      >
        {tabs.map((tab, index) => (
          <li
            key={tab.id}
            className={`rounded-full px-6 py-2 cursor-pointer text-sm font-medium ${
              activeTabIndex == index
                ? "bg-brand/20 border border-brand/10 text-brand"
                : "bg-gray/10 border border-gray/5 text-gray"
            }`}
            role="presentation"
            onClick={() => onTabClick(index)}
          >
            <a href={`#${tab.id}`}>{tab.title}</a>
          </li>
        ))}
      </ul>

      {tabs.map((tab, index) => (
        <tab.content
          key={tab.id}
          id={`${tab.id}-content`}
          active={activeTabIndex === index}
        />
      ))}
    </>
  );
};

export default Orders;
