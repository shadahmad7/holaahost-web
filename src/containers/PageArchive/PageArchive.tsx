import React, { FC, useState } from "react";


import { Helmet } from "react-helmet";
import SectionSubscribe2 from "components/SectionSubscribe2/SectionSubscribe2";
import NcImage from "components/NcImage/NcImage";

import FooterCard from "components/FooterCard/FooterCard";
import { getAllEvents, getAllFilteredEvents } from "actions/eventAction";
import Card12 from "components/Card12/Card12";
import { Link, useLocation } from "react-router-dom";

import Pagination from "react-pagination-library";
import "react-pagination-library/build/css/index.css";
import { getAllEventCategories } from "actions/eventCategoryAction";

export interface LocationState {
  from: {
    pathname: string;
    state: any;
  };
}

export interface PageArchiveProps {
  className?: string;
}


const PageArchive: FC<PageArchiveProps> = ({ className = "" }) => {
  const DISTANCE = [
    { id: 1, name: "2 KMS", value:2 },
    { id: 2, name: "5 KMS" , value:5},
    { id: 3, name: "10 KMS", value:10 },
    { id: 4, name: "50 KMS" , value:50},
    { id: 5, name: "100+ KMS" , value:101},
  ];
  const DAYS = [
    { id: 1, name: "Starting Soon" },
    { id: 2, name: "Today" },
    { id: 3, name: "Tomorrow" },
    { id: 4, name: "This Week" },
    { id: 5, name: "This Weekend" },
    { id: 6, name: "Next Week" },
  ];

  let arr1: any = [],
    arr2: any = [],
    arr3: any = [],
    arr4: any = [];

  const TYPE = [{ name: "Online" }, { name: "Indoor" }, { name: "Outdoor" }];
  const location = useLocation<LocationState>();

  const [dayOpen, setDayOpen] = useState(1);
  const [typeOpen, setTypeOpen] = useState(1);
  const [distanceOpen, setDistanceOpen] = useState(1);
  const [catOpen, setCatOpen] = useState(1);

  const [eventData, setEventData] = useState([]);
  const [eventCatData, setEventCatData] = useState([]);

  const [searchTextForGroup, setSearchTextForGroup] = useState("");
  const [filterGroup, setFilterGroup] = useState([]);
  const [filterDay, setFilterDay] = useState([]);
  const [filterType, setFilterType] = useState([]);
  const [filterDistance, setFilterDistance] = useState([]);

  //Pagination
  const [offset, setOffset] = useState(10);
  const [pageCount, setPageCount] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(false);

  React.useEffect(() => {
    loadAll();
  }, []);

  const loadAll = async () => {
    setLoading(true);
    let id: any = location.state?.eventCatId;
    
    if (id != undefined) {
      changeFilter(id, "event");
      let action2 = await getAllEventCategories();
      setEventCatData(action2.data.data);
    } else {
      loadData();
      setTimeout(() => {
        setLoading(false);
      }, 3000);
    }

  };

  const loadData = async () => {
    let action = await getAllEvents();
    let action2 = await getAllEventCategories();
    setTotalPages(action.data.last_page);
    setEventCatData(action2.data.data);
    setEventData(action.data.data);
    console.log("EventData After set", eventData);
  };

  const handleDayOpen = (value: any) => {
    setDayOpen(dayOpen === value ? 0 : value);
  };
  const handleTypeOpen = (value: any) => {
    setTypeOpen(typeOpen === value ? 0 : value);
  };
  const handleDistanceOpen = (value: any) => {
    setDistanceOpen(distanceOpen === value ? 0 : value);
  };
  const handleCatOpen = (value: any) => {
    setCatOpen(catOpen === value ? 0 : value);
  };

  const changeFilter = async (data: any, section: any) => {
    setLoading(true);
    if (section === "event") {
      arr1 = [...filterGroup];
      if (!arr1.includes(data)) {
        arr1.push(data);
      } else {
        arr1 = await arr1.filter((e: any) => e !== data);
      }
      setFilterGroup(arr1);
      console.log("Event Cat Filter", arr1);
      arr2 = [...filterDay];
      arr3 = [...filterDistance];
      arr4 = [...filterType];
    }
    if (section === "day") {
      arr2 = [...filterDay];
      if (!arr2.includes(data)) {
        arr2.push(data);
      } else {
        arr2 = await arr2.filter((e: any) => e !== data);
      }
      setFilterDay(arr2);
      console.log("Day Filter", arr2);
      arr1 = [...filterGroup];
      arr3 = [...filterDistance];
      arr4 = [...filterType];
    }
    if (section === "distance") {
      arr3 = [...filterDistance];
      if (!arr3.includes(data)) {
        arr3.push(data);
      } else {
        arr3 = await arr3.filter((e: any) => e !== data);
      }
      setFilterDistance(arr3);
      console.log("Distance Filter", arr3);
      arr1 = [...filterGroup];
      arr2 = [...filterDay];
      arr4 = [...filterType];
    }
    if (section === "type") {
      arr4 = [...filterType];
      if (!arr4.includes(data)) {
        arr4.push(data);
      } else {
        arr4 = await arr4.filter((e: any) => e !== data);
      }
      setFilterType(arr4);
      console.log("Type Filter", arr4);
      arr1 = [...filterGroup];
      arr2 = [...filterDay];
      arr3 = [...filterDistance];
    }

   await applyFilter(arr1, arr2, arr3, arr4);

    setTimeout(() => {
      setLoading(false);
    }, 2000);
  };

  const applyFilter = async (ar1: any, ar2: any, ar3: any, ar4: any) => {
    console.log("cat,day, distance,type", ar1, ar2, ar3, ar4);
    let eventFilterRes: any = await getAllFilteredEvents(ar1, ar2, ar3, ar4);
    console.log("data filtered", eventFilterRes);

    setEventData(eventFilterRes.data.data);
    setTotalPages(eventFilterRes.data.last_page);
    console.log("FILTEREDDD");
  };

  const handlePageClick = (numPage: any) => {
    setPageCount(numPage);
    console.log("page", numPage);
    var requestOptions: any = {
      method: "GET",
      redirect: "follow",
    };

    fetch(`http://127.0.0.1:8000/events?page=${numPage}`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        setEventData(result.data.data);
      })
      .catch((error) => console.log("error", error));
  };

  const resetFilter = async () => {
    setLoading(true);
    setFilterGroup([]),
      setFilterDay([]),
      setFilterDistance([]),
      setFilterType([]),
      setDayOpen(0);
    setCatOpen(0);
    setDistanceOpen(0);
    setTypeOpen(0);
    loadData();
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  };

  return (
    <div
      className={`nc-PageArchive overflow-hidden ${className}`}
      data-nc-id="PageArchive"
    >
      <Helmet>
        <title>HolaaHost || Events</title>
      </Helmet>

      {/* HEADER */}
      <div className="w-full py-2 px-2 xl:max-w-screen-2xl mx-auto">
        <div className="rounded-3xl md:rounded-[40px] relative aspect-w-16 aspect-h-13 sm:aspect-h-9 lg:aspect-h-8 xl:aspect-h-5 overflow-hidden ">
          <NcImage
            containerClassName="absolute inset-0"
            src="https://images.unsplash.com/photo-1478147427282-58a87a120781?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
            className="object-cover w-full h-full"
          />
          <div className="absolute inset-0 bg-black text-white bg-opacity-30 flex flex-col items-center justify-center">
            <h2 className="inline-block align-middle event-banner-text font-semibold  ">
              Events
            </h2>
            <span className="block event-banner-text-2 mt-4 text-neutral-300">
              Who Are Interested In the same things as you.
            </span>
          </div>
        </div>
      </div>
      {/* ====================== END HEADER ====================== */}

      <div className="container event-div py-16 lg:pb-28 lg:pt-20 space-y-16 lg:space-y-28">
        <div className="lg:flex mb-4 justify-between">
          {/* filters */}
          <div className=" lg:w-1/4 sm:w-full mb-10">
            {/* Radio */}
            <div className=" items-center flex">
              <div className="mx-7 flex items-center">
                <Link to="/groups">
                  <input
                    className="mx-3"
                    type="radio"
                    value="option2"
                    checked={false}
                  />
                </Link>
                <label className="text-ms font-semibold">Groups</label>
              </div>
              <div className="mx-1 flex items-center">
                <input
                  className="mx-3"
                  type="radio"
                  value="option2"
                  checked={true}
                />
                <label className="text-ms font-semibold">Events</label>
              </div>
            </div>
            {/* Radio */}

            {/* Filters */}
            <div className="justify-between mt-12 my-8 px-8 items-center flex">
              <div className=" items-center flex">
                <i className="las la-sliders-h mx-1  text-2xl  text-black opacity-100"></i>
                <p className="text-ms text-black font-semibold">Filters</p>
              </div>
              <div className=" items-center cursor-pointer  flex">
                {/* <i className="las la-sliders-h mx-1  text-2xl  text-black opacity-100"></i> */}
                <p
                  className="text-ms text-black font-semibold transition-all hover:text-amber-600"
                  onClick={resetFilter}
                >
                  Reset
                </p>
              </div>
            </div>
            {/* Filters */}

            {/* Any day */}
            <div
              className="justify-between my-8 px-8 items-center flex"
              onClick={() => handleDayOpen(1)}
            >
              <div className=" items-center flex">
                <i className="las la-calendar mx-1  text-2xl  text-black opacity-100"></i>
                <p className="text-ms text-black font-normal">Any day</p>
              </div>
              <div>
                {dayOpen === 1 ? (
                  <i className="las la-angle-up mx-1  text-sm  text-black opacity-100"></i>
                ) : (
                  <i className="las la-angle-down mx-1  text-sm  text-black opacity-100"></i>
                )}
              </div>
            </div>
            {/* Any day */}
            {dayOpen === 1 && (
              <div>
                <div className="mx-8 overflow-y-auto	event-filter-group relative">
                  {DAYS.map((day) => (
                    <div className="my-2 flex mx-1 ">
                      <input
                        className="form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
                        type="checkbox"
                        // checked={ filterGroup.includes(day?.id) ? true : false}
                        value=""
                        id="flexCheckDefault"
                        onChange={() => changeFilter(day.name, "day")}
                      />
                      <label
                        className="form-check-label inline-block text-gray-800"
                        htmlFor="flexCheckDefault"
                      >
                        {day.name}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            )}
            {/* Any Type */}
            <div
              className="justify-between my-8 px-8 items-center flex"
              onClick={() => handleTypeOpen(1)}
            >
              <div className=" items-center flex">
                <i className="las la-check-circle mx-1  text-2xl  text-black opacity-100"></i>
                <p className="text-ms text-black font-normal">Any Type</p>
              </div>
              <div>
                {typeOpen === 1 ? (
                  <i className="las la-angle-up mx-1  text-sm  text-black opacity-100"></i>
                ) : (
                  <i className="las la-angle-down mx-1  text-sm  text-black opacity-100"></i>
                )}
              </div>
            </div>
            {/* Any Type */}
            {typeOpen === 1 && (
              <div>
                <div className="mx-8 overflow-y-auto	event-filter-group relative">
                  {TYPE.map((type) => (
                    <div className="my-2 flex mx-1 ">
                      <input
                        className="form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
                        type="checkbox"
                        value=""
                        id="flexCheckDefault"
                        onChange={(e) => changeFilter(type.name, "type")}
                      />
                      <label
                        className="form-check-label inline-block text-gray-800"
                        htmlFor="flexCheckDefault"
                      >
                        {type.name}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Any Distance */}
            <div
              className="justify-between my-8 px-8 items-center flex"
              onClick={() => handleDistanceOpen(1)}
            >
              <div className=" items-center flex">
                <i className="las la-map mx-1  text-2xl  text-black opacity-100"></i>
                <p className="text-ms text-black font-normal">Any Distance</p>
              </div>
              <div>
                {distanceOpen === 1 ? (
                  <i className="las la-angle-up mx-1  text-sm  text-black opacity-100"></i>
                ) : (
                  <i className="las la-angle-down mx-1  text-sm  text-black opacity-100"></i>
                )}
              </div>
            </div>
            {/* Any Distance */}
            {distanceOpen === 1 && (
              <div>
                <div className="mx-8 overflow-y-auto	event-filter-group relative">
                  {DISTANCE.map((dis) => (
                    <div className="my-2 flex mx-1 ">
                      <input
                        className="form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
                        type="checkbox"
                        value=""
                        id="flexCheckDefault"
                        onChange={(e) => changeFilter(dis.value, "distance")}
                      />
                      <label
                        className="form-check-label inline-block text-gray-800"
                        htmlFor="flexCheckDefault"
                      >
                        {dis.name}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            )}
            {/* Any Category */}
            <div
              className="justify-between my-8 px-8 items-center flex"
              onClick={() => handleCatOpen(1)}
            >
              <div className=" items-center flex">
                <i className="las la-bars mx-1  text-2xl  text-black opacity-100"></i>
                <p className="text-ms text-black font-normal">Any Category</p>
              </div>
              <div>
                {catOpen === 1 ? (
                  <i className="las la-angle-up mx-1  text-sm  text-black opacity-100"></i>
                ) : (
                  <i className="las la-angle-down mx-1  text-sm  text-black opacity-100"></i>
                )}
              </div>
            </div>
            {/* Any Category */}
            {catOpen === 1 && (
              <div>
                <div className="mx-8 overflow-y-auto	event-filter-group relative">
                  <div className="flex items-center ">
                    <input
                      className="event-filter-group-input  "
                      type="text"
                      placeholder="Search"
                      value={searchTextForGroup}
                      onChange={(e) => setSearchTextForGroup(e.target.value)}
                    />
                    <i className="las la-search text-lg search-icon-filter relative top-1 right-7 text-black opacity-100"></i>
                  </div>
                  {eventCatData
                    .filter((eventCat) => {
                      if (searchTextForGroup === "") {
                        return eventCat;
                      } else if (
                        eventCat?.event_category_name
                          .toLowerCase()
                          .includes(searchTextForGroup.toLowerCase())
                      ) {
                        return eventCat;
                      }
                    })
                    .map((eventCat) => (
                      <div className="my-2 flex mx-1 ">
                        <input
                          className="form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
                          type="checkbox"
                          checked={
                            filterGroup.includes(eventCat?.id) ? true : false
                          }
                          value=""
                          id="flexCheckDefault"
                          onChange={() => changeFilter(eventCat?.id, "event")}
                        />
                        <label
                          className="form-check-label inline-block text-gray-800"
                          htmlFor="flexCheckDefault"
                        >
                          {eventCat?.event_category_name}
                        </label>
                      </div>
                    ))}
                </div>
              </div>
            )}
          </div>
          {/* filters */}

          {/* Events */}
          <div className=" group-card-listing  lg:w-3/4 sm:w-full  h-fit	 p-12 rounded-3xl event-card">
            <div className="justify-center text-center items-center">
              <h1 className="sm:text-2xl lg:text-3xl text-black font-semibold">Events</h1>
              <p className="sm:text-md lg:text-xl mt-5 mb-5 text-black font-normal">
                Discover the most outstanding upcoming events
              </p>
            </div>

            {/* LOOP ITEMS */}
            {!loading ? (
              <>
                {eventData.length != 0 ? (
                  <div className="grid card-gap sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3  gap-6 md:gap-8 mt-8 lg:mt-10">
                    {eventData.map((post) => (
                      <Link
                      to={`/event/${post.id}`}
                      >
                        <Card12 key={post.id} post={post} />
                      </Link>
                    ))}
                  </div>
                ) : (
                  <main>
                    <div className="h-full w-full mt-10 py-10 flex flex-col self-center items-center justify-center">
                      <h1 className="text-9xl font-extrabold text-black 	 tracking-widest">
                        OOPS
                      </h1>
                      <div className="bg-[#305f63] px-2 text-sm text-white rounded rotate-12 absolute">
                        Events Not Found
                      </div>
                    </div>
                  </main>
                )}
              </>
            ) : (
              <>
                <div className="lg:flex">
                  <div className=" p-2 w-64 h-72  rounded-2xl  flex flex-col sm:flex-row gap-2 select-none ">
                    <div className="h-52 sm:h-full sm:w-72 rounded-xl bg-gray-200 animate-pulse"></div>
                    <div className="flex flex-col flex-1 gap-5 sm:p-2"></div>
                  </div>
                  <div className=" p-2 w-64 h-72  rounded-2xl  flex flex-col sm:flex-row gap-2 select-none ">
                    <div className="h-52 sm:h-full sm:w-72 rounded-xl bg-gray-200 animate-pulse"></div>
                    <div className="flex flex-col flex-1 gap-5 sm:p-2"></div>
                  </div>
                  <div className=" p-2 w-64 h-72  rounded-2xl  flex flex-col sm:flex-row gap-2 select-none ">
                    <div className="h-52 sm:h-full sm:w-72 rounded-xl bg-gray-200 animate-pulse"></div>
                    <div className="flex flex-col flex-1 gap-5 sm:p-2"></div>
                  </div>
                </div>
                <div className="lg:flex">
                  <div className=" p-2 w-64 h-72  rounded-2xl  flex flex-col sm:flex-row gap-2 select-none ">
                    <div className="h-52 sm:h-full sm:w-72 rounded-xl bg-gray-200 animate-pulse"></div>
                    <div className="flex flex-col flex-1 gap-5 sm:p-2"></div>
                  </div>
                  <div className=" p-2 w-64 h-72  rounded-2xl  flex flex-col sm:flex-row gap-2 select-none ">
                    <div className="h-52 sm:h-full sm:w-72 rounded-xl bg-gray-200 animate-pulse"></div>
                    <div className="flex flex-col flex-1 gap-5 sm:p-2"></div>
                  </div>
                  <div className=" p-2 w-64 h-72  rounded-2xl  flex flex-col sm:flex-row gap-2 select-none ">
                    <div className="h-52 sm:h-full sm:w-72 rounded-xl bg-gray-200 animate-pulse"></div>
                    <div className="flex flex-col flex-1 gap-5 sm:p-2"></div>
                  </div>
                </div>
              </>
            )}
            {/* PAGINATIONS */}
            <div className="flex flex-col mt-12 lg:mt-16 space-y-5 sm:space-y-0 sm:space-x-3 sm:flex-row sm:justify-between sm:items-center">
              {totalPages != 1 && (
                <Pagination
                  currentPage={pageCount}
                  totalPages={totalPages}
                  changeCurrentPage={handlePageClick}
                  theme="square-i"
                />
              )}

       
            </div>
          </div>
          {/* Events */}
        </div>

 


        {/* SUBCRIBES */}
        <SectionSubscribe2 />
      </div>
      <FooterCard />

      
    </div>
  );
};

export default PageArchive;
