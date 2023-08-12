import React from "react";

export default function EMPTabs() {
  const [openTab, setOpenTab] = React.useState(1);

  return (
    <>
      <div className="flex">
        <div className="ml-24">
          <ul className="flex mb-0 list-none flex-wrap pt-3 pb-4 flex-row">
            <li className="-mb-px mr-2">
              <a
                className={
                  "inline-block p-4 " +
                  (openTab === 1
                    ? "text-s font-bold uppercase text-blue-600 bg-gray-100 rounded-t-lg active"
                    : "hover:text-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800 dark:hover:text-gray-300")
                }
                onClick={(e) => {
                  e.preventDefault();
                  setOpenTab(1);
                }}
                href="#"
              >
                Personal Profile
              </a>
            </li>
            <li className="-mb-px mr-2 ml-2">
              <a
                className={
                  "inline-block p-4 rounded-t-lg " +
                  (openTab === 2
                    ? "text-s font-bold uppercase text-blue-600 bg-gray-100 rounded-t-lg active"
                    : "hover:text-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800 dark:hover:text-gray-300")
                }
                onClick={(e) => {
                  e.preventDefault();
                  setOpenTab(2);
                }}
                href="#"
              >
                Family Profile
              </a>
            </li>
            <li className="-mb-px mr-2">
              <a
                className={
                  "inline-block p-4 rounded-t-lg " +
                  (openTab === 3
                    ? "text-s font-bold uppercase text-blue-600 bg-gray-100 rounded-t-lg active"
                    : "hover:text-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800 dark:hover:text-gray-300")
                }
                onClick={(e) => {
                  e.preventDefault();
                  setOpenTab(3);
                }}
                href="#"
              >
                Work Profile
              </a>
            </li>
            <li className="-mb-px mr-2">
              <a
                className={
                  "inline-block p-4 rounded-t-lg " +
                  (openTab === 4
                    ? "text-s font-bold uppercase text-blue-600 bg-gray-100 rounded-t-lg active"
                    : "hover:text-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800 dark:hover:text-gray-300")
                }
                onClick={(e) => {
                  e.preventDefault();
                  setOpenTab(4);
                }}
                href="#"
              >
                Academic Profile
              </a>
            </li>
            <li className="-mb-px mr-2">
              <a
                className={
                  "inline-block p-4 rounded-t-lg " +
                  (openTab === 5
                    ? "text-s font-bold uppercase text-blue-600 bg-gray-100 rounded-t-lg active"
                    : "hover:text-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800 dark:hover:text-gray-300")
                }
                onClick={(e) => {
                  e.preventDefault();
                  setOpenTab(5);
                }}
                href="#"
              >
                Professional Profile
              </a>
            </li>
            <li className="-mb-px mr-2">
              <a
                className={
                  "inline-block p-4 rounded-t-lg " +
                  (openTab === 6
                    ? "text-s font-bold uppercase text-blue-600 bg-gray-100 rounded-t-lg active"
                    : "hover:text-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800 dark:hover:text-gray-300")
                }
                onClick={(e) => {
                  e.preventDefault();
                  setOpenTab(6);
                }}
                href="#"
              >
                Training Profile
              </a>
            </li>
            <li className="-mb-px mr-2">
              <a
                className={
                  "inline-block p-4 rounded-t-lg " +
                  (openTab === 7
                    ? "text-s font-bold uppercase text-blue-600 bg-gray-100 rounded-t-lg active"
                    : "hover:text-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800 dark:hover:text-gray-300")
                }
                onClick={(e) => {
                  e.preventDefault();
                  setOpenTab(7);
                }}
                href="#"
              >
                Asset Profile
              </a>
            </li>
          </ul>
          <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
            <div className="px-4 py-5 flex-auto">
              <div className="tab-content tab-space">
                <div className={openTab === 1 ? "block" : "hidden"}>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                    ut tortor sed metus bibendum tincidunt at nec ex. Nullam sit
                    amet velit at est cursus tincidunt. Aenean eu tristique
                    quam.
                  </p>
                </div>

                {/* Family Profile Tab */}
                <div className={openTab === 2 ? "block" : "hidden"}>
                  <p>
                    In hac habitasse platea dictumst. Ut eget nisl quis erat
                    elementum dapibus. Nulla facilisi. Maecenas ac purus auctor,
                    efficitur elit eu, gravida elit.
                  </p>
                </div>

                {/* Work Profile Tab */}
                <div className={openTab === 3 ? "block" : "hidden"}>
                  <p>
                    Vivamus vel elit ac elit congue eleifend. Quisque nec ligula
                    et tortor tincidunt volutpat. Nunc et tristique purus. Fusce
                    non lorem et odio tristique sodales.
                  </p>
                </div>

                {/* Academic Profile Tab */}
                <div className={openTab === 4 ? "block" : "hidden"}>
                  <p>
                    Pellentesque habitant morbi tristique senectus et netus et
                    malesuada fames ac turpis egestas. Quisque ac turpis eu ante
                    placerat facilisis. Nullam sit amet justo eu nisl laoreet
                    elementum.
                  </p>
                </div>

                {/* Professional Profile Tab */}
                <div className={openTab === 5 ? "block" : "hidden"}>
                  <p>
                    Integer eu justo nec diam convallis malesuada. Praesent
                    hendrerit justo eu est facilisis, sit amet varius turpis
                    auctor. Etiam et mauris eu mi bibendum blandit nec eu odio.
                  </p>
                </div>

                {/* Training Profile Tab */}
                <div className={openTab === 6 ? "block" : "hidden"}>
                  <p>
                    Suspendisse cursus mauris ut magna posuere, ut posuere justo
                    tincidunt. Nam ac nunc et augue bibendum ultrices. Duis non
                    ex nec purus interdum tincidunt.
                  </p>
                </div>

                {/* Asset Profile Tab */}
                <div className={openTab === 7 ? "block" : "hidden"}>
                  <p>
                    Aenean a justo et dui placerat convallis. Curabitur vel
                    lectus in tellus rhoncus ultrices. Nulla facilisi. Aliquam
                    id arcu in nisi pharetra gravida.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
