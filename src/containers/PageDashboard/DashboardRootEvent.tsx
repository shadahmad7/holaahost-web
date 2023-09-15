import React, { useState } from "react";

import ButtonPrimary from "components/Button/ButtonPrimary";

import Nav from "components/Nav/Nav";
import NavItem from "components/NavItem/NavItem";
import Card12 from "components/Card12/Card12";

import { myEvents, savedEvents } from "actions/profileAction";
import { Link } from "react-router-dom";

const TABS = ["Events", "Saved"];


const DashboardRootEvent = () => {
  const [tabActive, setTabActive] = useState<string>(TABS[0]);
  const [myEventData, setMyEventData] = React.useState([]);
  const [savedEventdata, setSavedEventdata] = React.useState([]);

  React.useEffect(() => {
    loadAll();
  }, [])


  const loadAll = async () => {
    let loadMyEventsRes: any = await myEvents();
    setMyEventData(loadMyEventsRes.data);
    let loadSavedEventsRes: any = await savedEvents();
    setSavedEventdata(loadSavedEventsRes.data);
    console.log("saved events", loadSavedEventsRes);
  }

  const handleClickTab = (item: string) => {
    if (item === tabActive) {
      return;
    }
    setTabActive(item);
  };


  return (
    <div className="rounded-xl min-h-full text-sm border border-neutral-100 dark:border-neutral-800 p-6 md:text-base">
      <div className=" lg:pb-4 lg:pt-4 px-4 space-y-16 lg:space-y-4">
        <main>
          {/* TABS FILTER */}
          <div className="flex flex-col sm:items-center sm:justify-between sm:flex-row">
            <Nav className="sm:space-x-2">
              {TABS.map((item, index) => (
                <NavItem
                  key={index}
                  isActive={tabActive === item}
                  onClick={() => handleClickTab(item)}
                >
                  {item}
                </NavItem>
              ))}
            </Nav>
            <div className="block my-4 border-b w-full border-neutral-100 sm:hidden"></div>
          
          </div>



          {tabActive === "Events" && (
            <>
          {myEventData.length != 0 ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6 md:gap-8 mt-8 lg:mt-10">
              {myEventData.map((post) => (
                <Card12 key={post.id} post={post} />
              ))}
            </div>
          ) : (
            <div className="flex justify-center mt-20 item-center">
              <p>Sorry, no result found.</p>
            </div>
          )}
</>
          )}

          {tabActive === "Saved" && (
            <>
              {savedEventdata.length != 0 ? (
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6 md:gap-8 mt-8 lg:mt-10">
                  {savedEventdata.map((post) => (
                     <Link
                     to={{
                       pathname: `/event/${post.id}`,
                       state: { eventId: post.id },
                     }}
                   >
                    <Card12 key={post.id} post={post} />
                    </Link>
                  ))}
                </div>
              ) : (
                <div className="flex justify-center mt-20 item-center">
                  <p>Sorry, no result found.</p>
                </div>
              )}

            </>
          )}


          {/* PAGINATION */}
          <div className="flex flex-col mt-12 lg:mt-16 space-y-5 sm:space-y-0 sm:space-x-3 sm:flex-row sm:justify-between sm:items-center">
            <ButtonPrimary>Show me more</ButtonPrimary>
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardRootEvent;
