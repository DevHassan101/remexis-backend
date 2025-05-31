import { useTheme } from '@/context/ThemeContext';
import { Icon } from "@iconify/react";
import Image from "next/image";
import avatar from '../../../../public/assets/icons/man.png';

const Sidebar = ({ isCollapsed, setIsCollapsed }) => {
  const { toggleTheme, theme } = useTheme();

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div
      className={`${
        isCollapsed ? "w-16" : "w-64"
      } h-[calc(100vh-50px)] top-6 border left-4 ${
        theme === "light"
          ? "border-gray-300 bg-white"
          : "border-gray-600 bg-gray-950"
      } shadow-xl justify-between rounded-xl flex flex-col transition-all duration-300 ease-in-out fixed`}
    >
      <div>
        <div className="px-4 pt-4 mb-4">
          <div
            className={`flex items-center justify-between mb-4 transition-all duration-300 ${
              isCollapsed ? "flex-col gap-3" : "flex-row"
            }`}
          >
            <Icon
              icon="gridicons:menus"
              className={
                theme === "light"
                  ? "text-gray-600"
                  : "text-gray-200"
              }
              onClick={toggleSidebar}
              style={{ width: 20, height: 20, cursor: "pointer" }}
            />
            <div
              className={`flex transition-all duration-300 ${
                isCollapsed ? "flex-col mt-3 gap-2" : "flex-row gap-3"
              }`}
            >
              <Icon
                icon="mdi:magnify"
                className={theme === "light" ? "text-gray-600" : "text-gray-200"}
                style={{ width: 20, height: 20 }}
              />
              <Icon
                icon="lucide:edit"
                className={theme === "light" ? "text-gray-600" : "text-gray-200"}
                style={{ width: 16, height: 16 }}
              />
            </div>
          </div>

          <div
            className={`transition-all duration-300 ease-in-out overflow-hidden ${
              isCollapsed ? "max-h-0 opacity-0 scale-95" : "max-h-16 opacity-100 scale-100"
            }`}
          >
            <button
              className={`w-full py-2 rounded-md font-medium ${
                theme === "light"
                  ? "bg-black text-white"
                  : "bg-gray-200 text-gray-900"
              }`}
            >
              + New chat
            </button>
          </div>
        </div>

        <div
          className={`transition-all ${
            isCollapsed ? "border-b-0" : "border-b"
          } ${
            theme === "light" ? "border-gray-300" : "border-gray-600"
          }`}
        ></div>

        <div
          className={`transition-all duration-300 ease-in-out overflow-hidden ${
            isCollapsed
              ? "max-h-0 opacity-0 scale-95"
              : "max-h-[600px] opacity-100 scale-100 px-4 py-4"
          }`}
        >
          <p className={`${theme === "light" ? "text-gray-500" : "text-gray-400"} text-xs mb-2`}>Today</p>
          {["How to write an impacting ...", "Web accessibility", "Design inspiration", "What is machine learning"].map((item, idx) => (
            <div
              key={idx}
              className={`flex items-center gap-2 text-sm mb-3 cursor-pointer hover:text-black transition ${
                theme === "light"
                  ? "text-gray-700 hover:text-black"
                  : "text-gray-200 hover:text-white"
              }`}
            >
              <Icon icon="mdi:message-outline" className="w-4 h-4" />
              <span className="truncate">{item}</span>
            </div>
          ))}
          <p className={`${theme === "light" ? "text-gray-500" : "text-gray-400"} text-xs mt-4 mb-2`}>Yesterday</p>
          {["How to write an impacting ...", "Web accessibility", "Design inspiration"].map((item, idx) => (
            <div
              key={idx}
              className={`flex items-center gap-2 text-sm mb-3 cursor-pointer hover:text-black transition ${
                theme === "light"
                  ? "text-gray-700 hover:text-black"
                  : "text-gray-200 hover:text-white"
              }`}
            >
              <Icon icon="mdi:message-outline" className="w-4 h-4" />
              <span className="truncate">{item}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="p-4 transition-all duration-300 ease-in-out">
        <div className={`space-y-3 text-sm border-b py-2 ${
          theme === "light"
            ? "text-gray-700 border-gray-300"
            : "text-gray-200 border-gray-600"
        }`}>
          {[
            { icon: "mdi:book-open-outline", label: "Articles" },
            { icon: "mdi:help-circle-outline", label: "Guide & FAQ" },
            { icon: "mdi:trash-can-outline", label: "Clear Conversations" },
          ].map((item, idx) => (
            <div
              key={idx}
              className={`flex items-center gap-2 cursor-pointer hover:text-black transition ${
                theme === "light"
                  ? "text-gray-700 hover:text-black"
                  : "text-gray-200 hover:text-white"
              }`}
            >
              <Icon icon={item.icon} className="w-4 h-4" />
              {!isCollapsed && <span>{item.label}</span>}
            </div>
          ))}
        </div>

        <div className={`space-y-3 text-sm pt-4 ${
          theme === "light"
            ? "text-gray-700"
            : "text-gray-200"
        }`}>
          {[
            { icon: "mdi:bell-outline", label: "Notifications" },
            { icon: "mdi:cog-outline", label: "Setting" },
            { icon: "mdi:theme-light-dark", label: `Toggle ${theme === "light" ? "Dark" : "Light"} Theme` },
          ].map((item, idx) => (
            <div
              key={idx}
              className={`flex items-center gap-2 cursor-pointer hover:text-black transition ${
                theme === "light"
                  ? "text-gray-700 hover:text-black"
                  : "text-gray-200 hover:text-white"
              }`}
              onClick={item.label.includes("Toggle") ? toggleTheme : undefined}
            >
              <Icon icon={item.icon} className="w-4 h-4" />
              {!isCollapsed && <span>{item.label}</span>}
            </div>
          ))}
        </div>

        <div
          className={`flex items-center gap-3 mt-6 p-2 rounded-lg cursor-pointer transition-all duration-300 hover:bg-gray-100 ${
            theme === "light"
              ? ""
              : "bg-gray-950 hover:bg-gray-800"
          } ${isCollapsed ? "justify-center" : ""}`}
        >
          <Image
            src={avatar}
            alt="User"
            width={200}
            height={200}
            className={`rounded-full transition-all duration-300 ${
              isCollapsed ? "w-5 h-5" : "w-8 h-8"
            }`}
          />
          {!isCollapsed && (
            <>
              <span className={theme === "light" ? "text-gray-800" : "text-gray-200 text-sm font-medium"}>
                Adela Parkson
              </span>
              <Icon
                icon="mdi:chevron-right"
                className={theme === "light" ? "text-gray-500" : "text-gray-300"}
                style={{ width: 16, height: 16, marginLeft: "auto" }}
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
