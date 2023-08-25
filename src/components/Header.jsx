import React from "react";
import { Icon } from "@iconify/react";

const Header = () => {
  return (
    <nav className="top-0 w-full bg-blue-900 p-2 border-b-2 z-20 h-15">
      <div className="flex justify-end sticky ">
        <p className="p-2 flex items-center gap-2">
          <img
            src="/defaultuser2.png"
            alt="UserName"
            className="rounded-full w-8 h-auto"
          />
          <p className="text-white">Sandeep Patil</p>
        </p>
        <div className="mr-10 flex items-center">
          <Icon
            className="w-6 h-6 mx-2"
            icon="carbon:notification"
            color="white"
          />
          <Icon
            className="w-6 h-6 mx-2 cursor-pointer"
            icon="carbon:settings"
            color="white"
          />
        </div>
      </div>
    </nav>
  );
};

export default Header;
