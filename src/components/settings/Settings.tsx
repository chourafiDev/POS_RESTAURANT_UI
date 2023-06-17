"use client";

import { FC, useState } from "react";
import SettingActions from "./SettingActions";
import StickyBox from "react-sticky-box";

interface Tabs {
  title: string;
  id: string;
  content: any;
}

interface SettingsProps {
  tabs: Tabs[];
}

const Settings: FC<SettingsProps> = ({ tabs }) => {
  const [activeTabIndex, setActiveTabIndex] = useState(0);

  const onTabClick = (index: number) => {
    setActiveTabIndex(index);
  };

  return (
    <div className="flex items-start w-full gap-3">
      <StickyBox offsetTop={70} offsetBottom={20}>
        <div className="bg-white rounded-xl p-6">
          {/* Tabs */}
          <ul className="space-y-4" role="tablist">
            {tabs.map((tab, index) => (
              <SettingActions
                key={index}
                tab={tab}
                activeTabIndex={activeTabIndex}
                index={index}
                onTabClick={onTabClick}
              />
            ))}
          </ul>
        </div>
      </StickyBox>

      <div className="flex-1">
        {/* Tab content */}
        {tabs.map((tab, index) => {
          const TabContent = tab.content;
          return (
            <TabContent
              key={tab.id}
              id={`${tab.id}-content`}
              active={activeTabIndex === index}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Settings;
