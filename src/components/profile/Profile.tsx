"use client";

import Image from "next/image";
import { RiEdit2Fill } from "react-icons/ri";
import { FC, useState } from "react";
import ProfileActions from "./ProfileActions";
import StickyBox from "react-sticky-box";

interface Tabs {
  title: string;
  id: string;
  content: any;
}

interface ProfileProps {
  tabs: Tabs[];
}

const Profile: FC<ProfileProps> = ({ tabs }) => {
  const [activeTabIndex, setActiveTabIndex] = useState(0);

  const onTabClick = (index: number) => {
    setActiveTabIndex(index);
  };

  return (
    <div className="flex items-start w-full gap-3">
      <StickyBox offsetTop={70} offsetBottom={20}>
        <div className="bg-white rounded-xl p-6">
          {/* Image profile */}
          <div className="flex  items-center justify-center">
            <div className="relative">
              <picture>
                <Image
                  src="/assets/imgs/user.png"
                  alt="user"
                  width={90}
                  height={90}
                  className="rounded-full relative"
                />
              </picture>
              <div className="bg-brand w-6 h-6 cursor-pointer rounded-full flex justify-center items-center absolute -bottom-0 right-0">
                <RiEdit2Fill className="text-white" size={14} />
              </div>
            </div>
          </div>

          {/* Info profile */}
          <div className="text-center mt-3">
            <h2 className="text-dark font-bold text-[15px]">Ronald Donal</h2>
            <p className="text-gray text-[14px]">Cashier</p>
          </div>

          {/* Tabs */}
          <ul className="space-y-4 mt-6" role="tablist">
            {tabs.map((tab, index) => (
              <ProfileActions
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
        {tabs.map((tab, index) => (
          <tab.content
            key={tab.id}
            id={`${tab.id}-content`}
            active={activeTabIndex === index}
          />
        ))}
      </div>
    </div>
  );
};

export default Profile;
