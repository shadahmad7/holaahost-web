import React, { useState } from "react";
import ButtonPrimary from "components/Button/ButtonPrimary";
import Card11 from "components/Card11/Card11";
import Nav from "components/Nav/Nav";
import NavItem from "components/NavItem/NavItem";
import { myGroups, savedGroups } from "actions/profileAction";

const TABS = ["Groups", "Saved"];



const DashboardRoot = () => {
  const [tabActive, setTabActive] = useState<string>(TABS[0]);
  const [myGroupData, setMyGroupdata] = React.useState([]);
  const [savedGroupData, setSavedGroupdata] = React.useState([]);

  React.useEffect(() => {
    loadAll();
  }, [])

  const loadAll = async () => {
    let loadMyGroupsRes: any = await myGroups();
    setMyGroupdata(loadMyGroupsRes.data.data);
    let loadSavedGroupsRes: any = await savedGroups();
    setSavedGroupdata(loadSavedGroupsRes.data.data);
    console.log("saved groups", loadSavedGroupsRes);

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


          {/* LOOP ITEMS */}

          {tabActive === "Groups" && (
            <>
          {myGroupData.length != 0 ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6 md:gap-8 mt-8 lg:mt-10">
              {myGroupData.map((post) => (
                <Card11 key={post.id} post={post} />
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
              {savedGroupData.length != 0 ? (
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6 md:gap-8 mt-8 lg:mt-10">
                  {savedGroupData.map((post) => (
                    <Card11 key={post.id} post={post} />
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

export default DashboardRoot;
