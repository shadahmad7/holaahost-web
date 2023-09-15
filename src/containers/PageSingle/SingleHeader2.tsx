import React, { FC } from "react";
import SingleTitle from "./SingleTitle";
import { SinglePageType } from "./PageSingleTemp3Sidebar";
import SingleMetaAction2 from "./SingleMetaAction2";
import { Helmet } from "react-helmet";

import { GroupHeaderType } from "data/types";
import moment from "moment";
import ButtonPrimary from "components/Button/ButtonPrimary";
import { becomeMember, leaveGroupByUser } from "actions/membersAction";

export interface SingleHeaderProps {
  pageData: SinglePageType;
  hiddenDesc?: boolean;
  headerData: GroupHeaderType;
  metaActionStyle?: "style1" | "style2";
  titleMainClass?: string;
  className?: string;
}

const SingleHeader2: FC<SingleHeaderProps> = ({
  pageData,
  headerData,
  titleMainClass,
  hiddenDesc = false,
  className = "",
  metaActionStyle = "style1",
}) => {
  const { categories, desc, title } = pageData;
  const {
    id,
    group_name,
    group_location,
    group_user_id,
    created_at,
    admin,
    is_member,
    is_saved,
  } = headerData;

  const [user, setUser] = React.useState(0);
  React.useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    console.log("Header Detail", headerData);
    let a: any = await localStorage.getItem("@user");
    console.log("hereee", is_member);
    if (a != undefined) {
      a = JSON.parse(a);
      setUser(a.id);
    }
  };

  const joinGroup = async () => {
    let a: any = await localStorage.getItem("@user");
    if (a === null) {
      window.location.href = "/login";
    } else {
      let joinRes = await becomeMember(id);
      console.log("rs join", joinRes);
      window.localStorage.setItem("isThisInLocalStorage", "true");
      window.dispatchEvent(new Event("storage"));
    }
  };

  const leaveGroup = async () => {
    let a: any = await localStorage.getItem("@user");
    if (a === null) {
      window.location.href = "/login";
    } else {
      let leaveGroupRes = await leaveGroupByUser(is_member);
      console.log("leavd Detail", leaveGroupRes);
      window.localStorage.setItem("isThisInLocalStorage", "true");
      window.dispatchEvent(new Event("storage"));
    }
  };

  return (
    <>
      <Helmet>
        <title>HolaaHost</title>
      </Helmet>
      <div className={`nc-SingleHeader ${className}`}>
        <div className="space-y-5">
          <SingleTitle mainClass={titleMainClass} title={group_name} />

          <div className="w-full  border-b border-neutral-100 dark:border-neutral-800"></div>
          <div className="lg:flex  items-center flex-col sm:flex-row justify-start sm:items-end space-y-5 sm:space-y-0 sm:space-x-5">
            <div className="">
              <span className="text-sm font-black text-neutral-500">
                Managed by {admin}
              </span>
            </div>

            <div className="text-separator lg:border-l border-neutral-200 dark:border-neutral-700 h-6" />

            <div className="">
              <span className="text-sm font-black text-neutral-500">
                Created on {moment(created_at).format("DD-MM-YYYY")}
              </span>
            </div>

            <div className="text-separator lg:border-l border-neutral-200 dark:border-neutral-700 h-6" />

            <div className="">
              <span className="text-sm font-black text-neutral-500">
                {group_location}
              </span>
            </div>
          </div>
          <div className="lg:flex  items-center ">
            <SingleMetaAction2 meta={headerData} />

            {group_user_id != user && (
              <div className="event-detail-header">
                {is_member === undefined ? (
                  <ButtonPrimary onClick={() => joinGroup()} className="ml-3">
                    Join Group
                  </ButtonPrimary>
                ) : (
                  <ButtonPrimary
                    onClick={() => leaveGroup()}
                    className="leave-group-style text-md"
                  >
                    Leave Group
                  </ButtonPrimary>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default SingleHeader2;
