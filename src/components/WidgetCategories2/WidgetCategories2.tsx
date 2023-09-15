import { acceptRequest, rejectRequest } from "actions/attendeesAction";
import ButtonPrimary from "components/Button/ButtonPrimary";
import ButtonSecondary from "components/Button/ButtonSecondary";
import CardCategory1 from "components/CardCategory1/CardCategory1";
import WidgetHeading1 from "components/WidgetHeading1/WidgetHeading1";
import { api } from "config/api";
import { AttendeesType, TaxonomyType } from "data/types";
import React, { FC } from "react";

export interface WidgetCategories2Props {
  className?: string;
  categories: AttendeesType[];
}

const WidgetCategories2: FC<WidgetCategories2Props> = ({
  className = "bg-neutral-100 dark:bg-neutral-800",
  categories,
}) => {
  const Attendees = [
    { id: 1, name: "Shad Ahmad", type: "Co-ordinator" },
    { id: 2, name: "Shahbaz Ahmad", type: "Co-ordinator" },
    { id: 3, name: "Bhushan", type: "Member" },
    { id: 4, name: "Shivang", type: "Member" },
    { id: 5, name: "Shubham", type: "Member" },
  ];

const accept = async(id:any)=> {
  let acceptRes = await acceptRequest(id);
  console.log("accept req", acceptRes);
}

const reject = async(id:any)=> {
  let rejectRes = await rejectRequest(id);
  console.log("reject req", rejectRes);
}

  return (
    <div
      className={`nc-WidgetCategories rounded-3xl  overflow-hidden ${className}`}
      data-nc-id="WidgetCategories"
    >
      {/* <WidgetHeading1
        title="✨ Trending topic"
        viewAll={{ label: "View all", href: "/#" }}
      /> */}
      <div className="flow-root">
        <div className="flex flex-col divide-y divide-neutral-200 dark:divide-neutral-700">
          {categories.map((attendees, index) => (
            // <CardCategory1
            //   className="p-4 xl:p-5 hover:bg-neutral-200 dark:hover:bg-neutral-700"
            //   key={attendees.id}
            //   taxonomy={attendees}
            //   size="normal"
            // />
            <div className="flex px-5 py-4 justify-start items-center hover:bg-neutral-200 dark:hover:bg-neutral-700">
              <div>
                <img
                  className="rounded-full"
                  src={api.imageUrl2 + attendees.photoUrl}
                  alt="img"
                  height="50"
                  width="50"
                />
              </div>
              <div className="mx-3">
                <h1 className="text-base text-neutral-900 dark:text-neutral-100 font-semibold">
                  {attendees.name}
                </h1>
                {/* <span className="block mt-[2px] text-xs text-neutral-500 dark:text-neutral-400">{attendees.attendees_role}</span> */}
              </div>
              <div className="flex ml-4 items-center">
                <ButtonPrimary className="w-20 h-9 accept-button text-xs" onClick={()=> accept(attendees.id)}>
                  Accept
                </ButtonPrimary>
                <ButtonSecondary className="w-20 reject-button h-9 ml-2 text-xs" onClick={()=> reject(attendees.id)}>
                  Reject
                </ButtonSecondary>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WidgetCategories2;
