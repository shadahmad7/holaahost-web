import React, { FC, ReactNode } from "react";
import { PostDataType, TaxonomyType } from "data/types";
import { CommentType } from "components/CommentCard/CommentCard";
import SingleRelatedPosts from "./SingleRelatedPosts";

import { Sidebar } from "./Sidebar";
import SingleHeader from "./SingleHeader";
import EventDetailPage from "components/EventDetailPage/EventDetailPage";
import FooterCard from "components/FooterCard/FooterCard";
import { eventById } from "actions/eventAction";
import ButtonPrimary from "components/Button/ButtonPrimary";
import { api } from "config/api";
import {
  claimRequest,
  getAllAttendees,
  rejectRequest,
} from "actions/attendeesAction";

let user: any;

export interface PageSingleTemp3SidebarProps {
  className?: string;
}

export interface SinglePageType extends PostDataType {
  tags: TaxonomyType[];

  content: string | ReactNode;
  comments: CommentType[];
}

const PageSingleTemp3Sidebar: FC<PageSingleTemp3SidebarProps> = ({
  className = "",
}) => {
  const [eventData, setEventData] = React.useState([]);
  const [attendeesData, setAttendeesData] = React.useState([]);
  const [loader, setLoader] = React.useState(false);
  const [active, setActive] = React.useState(false);
  const [eventId, setEventId] = React.useState(0);

  React.useEffect(() => {
    openModal();
  }, []);

  const openModal = async () => {
    setLoader(true);
    let id: any = window.location.pathname;
    id = await id.split("/").pop();
    console.log("Here id isssss", id);
    setEventId(id);
    let action = await eventById(id);
    setEventData(action?.data);
    console.log("He dataaa", eventData);
    let action2: any = await getAllAttendees(eventId);
    setAttendeesData(action2.data.data);
    console.log("EventData", action);
    let b: any = localStorage.getItem("@user");
    if (b != null) {
      b = JSON.parse(b);
      user = b.id;
    }

    window.addEventListener("storage2", () => {
      callFunc();
    });

    setTimeout(() => {
      setLoader(false);
      setActive(true);
    }, 2000);
  };

  const callFunc = async () => {
    setLoader(true);
    let id: any = window.location.pathname;
    id = id.split("/").pop();
    console.log("Here id is", id);

    let action = await eventById(id);
    setEventData(action?.data);
    console.log("EventData", action);
    let b: any = localStorage.getItem("@user");
    b = JSON.parse(b);
    user = b.id;
    setTimeout(() => {
      setLoader(false);
    }, 2000);
  };

  const claim = async (id: any) => {
    let claimRes = await claimRequest(id);
    console.log("claim res", claimRes);
    openModal();
  };
  const cancel = async (id: any) => {
    let cancelRequest = await rejectRequest(id);
    console.log("claim res", cancelRequest);
    openModal();
  };

  return (
    <div
      className={`nc-PageSingleTemp3Sidebar ${className}`}
      data-nc-id="PageSingleTemp3Sidebar"
    >
      <header className="relative pt-16 z-10 md:py-20 lg:py-28 bg-neutral-900 dark:bg-black">
        {/* SINGLE HEADER */}
        <div className="dark container relative z-10">
          <div className="max-w-screen-md">
            {active && (
              <SingleHeader
                hiddenDesc
                metaActionStyle="style2"
                pageData={eventData}
              />
            )}
          </div>
        </div>

        {/* FEATURED IMAGE */}
        <div className="mt-8 md:mt-0 md:absolute md:top-0 md:right-0 md:bottom-0 md:w-1/2 lg:w-2/5 2xl:w-1/3">
          <div className="hidden md:block absolute top-0 left-0 bottom-0 w-1/5 from-neutral-900 dark:from-black bg-gradient-to-r"></div>
          <img
            className="block w-full h-full object-cover"
            src={api.imageUrl2 + eventData?.event_image}
            alt=""
          />
        </div>
      </header>

      {/* SINGLE MAIN CONTENT */}

      {!loader ? (
        <>
          <div className="container  flex flex-col lg:mt-20 lg:flex-row ">
            <div className="w-full mt-12 lg:mt-0 lg:w-2/5 lg:pl-10 xl:pl-0 xl:w-1/3">
              <div>
                <div className="flex items-center mb-8 mt-2  justify-between">
                  <h1 className="text-3xl font-semibold">Attendees</h1>
                  {/* <span className="text-lg underline cursor-pointer">See all</span> */}
                </div>

                <Sidebar id={eventData?.id} userId={eventData?.event_user_id} />
              </div>
            </div>
            <div className="w-full lg:w-3/5 xl:w-2/3 xl:pl-20">
              <EventDetailPage post={eventData} />
            </div>
          </div>

          {/* ticket details section */}
          <div className="lg:flex container justify-between  items-center">
            <div className="mt-3 lg:flex sm:my-5 ">
              <span className="lg:text-lg sm:text-xs">Venue -</span>
              <h2 className="lg:text-xl sm:text-xs  ml-2 font-semibold">
                {eventData?.event_location}.
              </h2>
            </div>

            {user != eventData?.event_user_id && (
              <div className="flex justify-between  items-center sm:mt-4">
                <div className="mx-5">
                  <h2 className="text-xl font-semibold">
                    {eventData?.event_free != 1
                      ? eventData?.event_price
                      : `FREE`}
                  </h2>
                  <span className="text-lg">
                    {eventData?.event_seats - attendeesData.length} Spots left
                  </span>
                </div>
                <>
                  {eventData?.is_attendee === null &&
                    eventData?.event_seats != 0 && (
                      <ButtonPrimary onClick={() => claim(eventData?.id)}>
                        Claim
                      </ButtonPrimary>
                    )}
                </>
                <>
                  {eventData?.event_seats === 0 && (
                    <div className="px-3 border-2 py-1 bg-red">
                      <p>All slots are taken</p>
                    </div>
                  )}
                </>
                <>
                  {eventData?.is_attendee === "accept" && (
                    <ButtonPrimary
                      className="reject-button w-36"
                      onClick={() => cancel(eventData?.is_attendee_id)}
                    >
                      Cancel Slot
                    </ButtonPrimary>
                  )}
                </>
                <>
                  {eventData?.is_attendee === "None" && (
                    <div className="px-3 border-2 py-1 bg-red">
                      <p>Requested</p>
                    </div>
                  )}
                </>
                {/* <button className="ticket-btn mx-3">Claim</button> */}
                {/* <button className="ticket-btn mx-3">Buy</button> */}
              </div>
            )}
          </div>
        </>
      ) : (
        <div className="w-full px-10 h-full lg:flex rounded-md justify-between  mt-20">
          <div className=" lg:w-4/12 sm:w-full sm:mb-10  lg:ml-20 lg:pl-20 lg:mx-10 pt-5 animate-pulse flex-row  h-full  ">
            <div className=" flex  justify-between ">
              <div>
                <div className=" justify-between">
                  <div className="w-36 bg-gray-300 h-10 rounded-md "></div>
                  <div className="w-24 bg-gray-300 h-7 mt-4 rounded-md "></div>
                </div>
                <div className="pt-5">
                  <div className="flex sm:w-full ">
                    <div
                      className="w-60 sm:mb-8 items-center justify-start flex  h-16 lg:mx-1 rounded-xl
                       bg-gray-300  attendee-card-loader "
                    >
                      <div className="w-10 bg-gray-200 h-10  ml-2 rounded-3xl "></div>
                      <div className="w-28 bg-gray-200 h-6   ml-2 rounded-md "></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:w-8/12 sm:w-full  animate-pulse flex-row h-full  ">
            <div className=" ">
              <div className="sm:w-44 lg:w-44 h-8 lg:mx-5 bg-gray-300  rounded-md "></div>
              <div className="sm:w-full lg:w-10/12 mt-2 h-4 lg:mx-5 bg-gray-300  rounded-md "></div>
              <div className="sm:w-full lg:w-10/12 mt-2 h-4 lg:mx-5 bg-gray-300  rounded-md "></div>
              <div className="sm:w-full lg:w-10/12 mt-2 h-4 lg:mx-5 bg-gray-300  rounded-md "></div>
              <div className="w-44 mt-2 h-4 lg:mx-5 bg-gray-300  rounded-md "></div>
            </div>
            <div className="lg:ml-2 mt-5">
              <div className="sm:w-full lg:w-10/12 my-2 flex flex-col items-center  h-44 lg:mx-2 border-2 justify-between  rounded-md ">
                <div className="w-9/12 mt-2 h-4 mx-5 flex bg-gray-300  rounded-md "></div>
                <div className="w-9/12 mt-2 h-4 mx-5 mb-4  bg-gray-300  rounded-md "></div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* RELATED POSTS */}
      <SingleRelatedPosts
        id={eventData?.id}
        catId={eventData?.event_category_id}
      />

      <FooterCard />
    </div>
  );
};

export default PageSingleTemp3Sidebar;
