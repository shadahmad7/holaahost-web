import React, { FC } from "react";
import WidgetCategories from "components/WidgetCategories/WidgetCategories";

import {
  getAllAttendees,
  getAllRequestedAttendees,
} from "actions/attendeesAction";
import WidgetCategories2 from "components/WidgetCategories2/WidgetCategories2";

export interface SidebarProps {
  className?: string;
  id?: number;
  userId?: number;
}

let user: any;

export const Sidebar: FC<SidebarProps> = ({
  className = "space-y-6 ",
  id,
  userId,
}) => {
  const [data, setData] = React.useState([]);
  const [reqData, setReqData] = React.useState([]);
  React.useEffect(() => {
    loadData();
  }, []);
  const loadData = async () => {
    let action: any = await getAllAttendees(id);
    setData(action.data.data);
    let action2: any = await getAllRequestedAttendees(id);
    setReqData(action2.data.data);
    console.log("attendess", action2);
    let b: any = localStorage.getItem("@user");
    if (b != null) {
      b = JSON.parse(b);
      user = b.id;
    }
  };
  return (
    <div className={`nc-SingleSidebar ${className}`}>
      {/* <WidgetTags tags={tags} /> */}

      {user === userId && (
        <>
          <h1>All Pending Rquests</h1>
          <>
            {reqData.length != 0 ? (
              <WidgetCategories2 categories={reqData} />
            ) : (
              <div>
                <p>No Request found</p>
              </div>
            )}
          </>
        </>
      )}
      <>
        <h1>All Attendees</h1>

        {data.length != 0 ? (
          <WidgetCategories categories={data} />
        ) : (
          <div>
            <p>No Attendess found</p>
          </div>
        )}
      </>
    </div>
  );
};
