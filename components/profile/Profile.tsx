"use client";

import Image from "next/image";
import { RiEdit2Fill } from "react-icons/ri";
import { ChangeEvent, FC, useRef, useState } from "react";
import ProfileActions from "./ProfileActions";
import StickyBox from "react-sticky-box";
import { useUpdateProfileImageMutation } from "@/redux/services/profileApiSlice";
import { useGetCurrentUserQuery } from "@/redux/services/userApiSlice";
import { profileDefault } from "@/utils/assets";
import Button from "@/components/ui/Button";
import { AnimatePresence, motion } from "framer-motion";
import { message } from "antd";
import SpinLoading from "@/components/ui/SpinLoading";

interface Tabs {
  title: string;
  id: string;
  content: any;
}

interface ProfileProps {
  tabs: Tabs[];
}

const Profile: FC<ProfileProps> = ({ tabs }) => {
  const ref = useRef(null);
  const [selectedFile, setSelectedFile] = useState<string | ArrayBuffer | null>(
    null
  );
  const [activeTabIndex, setActiveTabIndex] = useState(0);

  const onTabClick = (index: number) => {
    setActiveTabIndex(index);
  };

  // Fetch current user data
  const { data: user } = useGetCurrentUserQuery(null);

  const openFile = () => {
    if (ref.current) {
      (ref.current as HTMLInputElement).click();
    }
  };

  const onChangeImage = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === FileReader.DONE) {
          setSelectedFile(reader.result);
        }
      };

      reader.readAsDataURL(file);
    }
  };

  const cancelEditImage = () => {
    setSelectedFile(null);
  };

  const [updateProfileImage, { isLoading }] = useUpdateProfileImageMutation();

  const handleEditImage = async () => {
    try {
      const res = await updateProfileImage(selectedFile).unwrap();
      message.success(res.message);
      setSelectedFile(null);
    } catch (err: any) {
      message.error(err.data?.message || err.error);
    }
  };

  return (
    <div className="flex items-start w-full gap-3">
      <StickyBox offsetTop={20} offsetBottom={20}>
        <div className="bg-white rounded-xl p-6">
          {/* Image profile */}
          <div className="flex  items-center justify-center">
            <div className="relative">
              <picture>
                <Image
                  src={
                    selectedFile
                      ? selectedFile
                      : user?.image?.url
                      ? user?.image?.url
                      : profileDefault
                  }
                  alt="profile"
                  width={90}
                  height={90}
                  className="rounded-full relative"
                />
              </picture>
              <button
                onClick={openFile}
                className="bg-brand w-6 h-6 cursor-pointer rounded-full flex justify-center items-center absolute -bottom-0 right-0"
              >
                <RiEdit2Fill className="text-white" size={14} />
              </button>
              <input
                type="file"
                ref={ref}
                accept="image/*"
                onChange={onChangeImage}
                className="hidden"
              />
            </div>
          </div>

          {/* Info profile */}
          <div className="text-center mt-3">
            <h2 className="text-dark font-medium text-[15px]">
              <span className="capitalize">{user?.firstName}</span>{" "}
              <span className="capitalize">{user?.lastName}</span>
            </h2>
            <p className="text-gray text-[14px] capitalize">{user?.role}</p>
          </div>

          <div className="h-12 flex justify-center items-center">
            <AnimatePresence initial={false}>
              {selectedFile && (
                <motion.div
                  initial={{
                    opacity: 0,
                    y: 10,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                    transition: { duration: 0.75 / 2, delay: 0.75 / 2 },
                  }}
                  exit={{
                    opacity: 0,
                    y: 10,
                    transition: { duration: 0.75 / 2 },
                  }}
                  className="flex items-center gap-2"
                >
                  <Button
                    onClick={cancelEditImage}
                    variant="outline"
                    size="sm"
                    rounded="full"
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={handleEditImage}
                    variant="default"
                    size="sm"
                    rounded="full"
                    className="gap-2"
                  >
                    {isLoading ? (
                      <>
                        <SpinLoading color="#264653" />
                        <span>Edit</span>
                      </>
                    ) : (
                      <span>Edit</span>
                    )}
                  </Button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Tabs */}
          <ul className="space-y-4" role="tablist">
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
            user={user}
          />
        ))}
      </div>
    </div>
  );
};

export default Profile;
