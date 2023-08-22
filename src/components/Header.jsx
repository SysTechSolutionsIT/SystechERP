import React from "react";
import { Icon } from "@iconify/react";

const Header = () => {
  return (
    <nav className="top-0 w-full bg-blue-900 p-4 border-b-2 z-20 h-15">
      {/* <div className='py-2 md:px-6 px-2 hidden md:flex items-center bg-gray-100 rounded-full'>
                <Icon className='w-5 h-5 mr-4' icon="ic:baseline-search" color="#556987" />
                <input
                    type='text'
                    id='search'
                    placeholder='Search something...'
                    className='bg-gray-100 focus:outline-none w-full'
                />
            </div> */}
      <div className="flex items-center justify-end sticky z-10">
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
