import React, { FC, useState } from "react";

interface Tabs {
  title: string;
  id: string;
  content: React.ComponentType<any>;
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
      <ul className="flex items-center gap-4 mb-5" role="tablist">
        {tabs.map((tab, index) => (
          <li
            key={tab.id}
            className={`rounded-full px-6 py-2 cursor-pointer text-sm font-medium ${
              activeTabIndex == index
                ? "bg-brand/20 text-brand"
                : "bg-gray/20 text-gray"
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
