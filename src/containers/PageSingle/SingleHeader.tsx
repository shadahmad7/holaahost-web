import CategoryBadgeList from "components/CategoryBadgeList/CategoryBadgeList";
import React, { FC } from "react";
import SingleTitle from "./SingleTitle";
import { SinglePageType } from "./PageSingleTemp3Sidebar";
import PostMeta2 from "components/PostMeta2/PostMeta2";
import SingleMetaAction2 from "./SingleMetaAction2";
import { Helmet } from "react-helmet";
import NcDropDown from "components/NcDropDown/NcDropDown";
import PostActionDropdown from "components/PostActionDropdown/PostActionDropdown";
import { SOCIALS_DATA } from "components/SocialsShare/SocialsShare";
import SingleMetaAction from "./SingleMetaAction";
import { EventDataType } from "data/types";

export interface SingleHeaderProps {
  pageData: EventDataType;
  hiddenDesc?: boolean;
  metaActionStyle?: "style1" | "style2";
  titleMainClass?: string;
  className?: string;
}

const SingleHeader: FC<SingleHeaderProps> = ({
  pageData,
  titleMainClass,
  hiddenDesc = false,
  className = "",
  metaActionStyle = "style1",
}) => {
  const {event_name, host } = pageData;

React.useEffect(()=> {
console.log("post header", pageData);
},[])


  return (
    <>
      <Helmet>
        <title>HolaaHost</title>
      </Helmet>
      <div className={`nc-SingleHeader ${className}`}>
        <div className="space-y-5">
          {/* <CategoryBadgeList itemClass="!px-3" categories={categories} /> */}
          <SingleTitle mainClass={titleMainClass} title={event_name} />
          {/* {!!desc && !hiddenDesc && (
            <span className="block text-base text-neutral-500 md:text-lg dark:text-neutral-400 pb-1">
              {desc}
            </span>
          )} */}
          <div className="w-full  border-b border-neutral-100 dark:border-neutral-800"></div>
          <div className="flex  flex-col sm:flex-row justify-start sm:items-end space-y-5 sm:space-y-0 sm:space-x-5">
            {/* <PostMeta2
              size="large"
              className="leading-none flex-shrink-0"
              meta={pageData}
              hiddenCategories
              avatarRounded="rounded-full shadow-inner"
            /> */}
            <div className="">
              <span className="text-white text-sm italic">Hosted by</span>
              <h2 className="text-white text-xl">{host}</h2>
            </div>

            {/* POst options */}
            {/* <div className="flex flex-row space-x-2.5 items-center">
            <PostActionDropdown
          containerClassName="h-9 w-9 bg-neutral-100 hover:bg-neutral-200 dark:bg-neutral-800 dark:hover:bg-neutral-700"
          iconClass="h-5 w-5"
          postData={pageData}
        />
            <NcDropDown
          className="flex-shrink-0 flex items-center justify-center focus:outline-none h-9 w-9 bg-neutral-100 hover:bg-neutral-200 dark:bg-neutral-800 dark:hover:bg-neutral-700 text-neutral-700 dark:text-neutral-200 rounded-full"
          renderTrigger={() => (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
              />
            </svg>
          )}
          onClick={() => {}}
          data={SOCIALS_DATA}
        />
       
            </div> */}
            <SingleMetaAction meta={pageData} />
          </div>
        </div>
      </div>
    </>
  );
};

export default SingleHeader;
