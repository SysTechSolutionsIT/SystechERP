import React from "react";

export default function EMPTabs() {
  const [openTab, setOpenTab] = React.useState(1);

  return (
    <>
      <div className="flex ">
        <div className="w-full">
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
                Profile
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
                Settings
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
                Options
              </a>
            </li>
          </ul>
          <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
            <div className="px-4 py-5 flex-auto">
              <div className="tab-content tab-space">
                <div className={openTab === 1 ? "block" : "hidden"}>
                  <p>
                    Collaboratively administrate empowered markets via
                    plug-and-play networks. Dynamically procrastinate B2C users
                    after installed base benefits.
                    <br />
                    <br /> Dramatically visualize customer directed convergence
                    without revolutionary ROI.
                  </p>
                </div>
                <div className={openTab === 2 ? "block" : "hidden"}>
                  <p>
                    Completely synergize resource taxing relationships via
                    premier niche markets. Professionally cultivate one-to-one
                    customer service with robust ideas.
                    <br />
                    <br />
                    Dynamically innovate resource-leveling customer service for
                    state of the art customer service.
                  </p>
                </div>
                <div className={openTab === 3 ? "block" : "hidden"}>
                  <p>
                    Efficiently unleash cross-media information without
                    cross-media value. Quickly maximize timely deliverables for
                    real-time schemas.
                    <br />
                    <br /> Dramatically maintain clicks-and-mortar solutions
                    without functional solutions.
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
