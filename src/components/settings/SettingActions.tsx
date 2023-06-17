import { FC } from "react";
import { MdFastfood } from "react-icons/md";
import { RiLayoutMasonryFill } from "react-icons/ri";

interface SettingActionsProps {
  activeTabIndex: number;
  index: number;
  tab: {
    title: string;
    id: string;
    content: React.ComponentType<any>;
  };
  onTabClick: (item: number) => void;
}

const SettingActions: FC<SettingActionsProps> = ({
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
          : "bg-white text-dark/50"
      }`}
      role="presentation"
      onClick={() => onTabClick(index)}
    >
      <a href={`#${tab.id}`} className="flex items-center gap-3 text-sm">
        {tab.id === "menu" ? (
          <MdFastfood
            size={20}
            className={activeTabIndex == index ? "text-brand" : "text-dark/80"}
          />
        ) : (
          <RiLayoutMasonryFill
            size={18}
            className={activeTabIndex == index ? "text-brand" : "text-dark/80"}
          />
        )}
        {tab.title}
      </a>
    </li>
  );
};

export default SettingActions;
