import { FC } from "react";
import { FaUserAlt } from "react-icons/fa";
import { RiLockFill } from "react-icons/ri";

interface ProfileActionsProps {
  activeTabIndex: number;
  index: number;
  tab: {
    title: string;
    id: string;
    content: React.ComponentType<any>;
  };
  onTabClick: (item: number) => void;
}

const ProfileActions: FC<ProfileActionsProps> = ({
  tab,
  index,
  activeTabIndex,
  onTabClick,
}) => {
  return (
    <li
      key={tab.id}
      className={`rounded-full px-6 py-2 cursor-pointer text-sm font-medium ${
        activeTabIndex == index
          ? "bg-brand/20 text-dark"
          : "bg-white text-dark/80"
      }`}
      role="presentation"
      onClick={() => onTabClick(index)}
    >
      <a href={`#${tab.id}`} className={`flex items-center gap-3 text-sm`}>
        {tab.id === "personal-information" ? (
          <FaUserAlt />
        ) : (
          <RiLockFill size={18} />
        )}
        {tab.title}
      </a>
    </li>
  );
};

export default ProfileActions;
