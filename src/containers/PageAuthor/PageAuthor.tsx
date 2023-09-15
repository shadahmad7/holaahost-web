import React, { FC, useState } from "react";

import { Helmet } from "react-helmet";
import SectionSubscribe2 from "components/SectionSubscribe2/SectionSubscribe2";
import Card11 from "components/Card11/Card11";

import NcImage from "components/NcImage/NcImage";
import FooterCard from "components/FooterCard/FooterCard";
import { getAllFilteredGroups, getAllGroups } from "actions/groupsAction";
import { Link, useLocation } from "react-router-dom";

import Pagination from "react-pagination-library";
import "react-pagination-library/build/css/index.css";
import { getAllGroupCategories } from "actions/groupCategoryAction";

export interface LocationState {
  from: {
    pathname: string;
    state: any;
  };
}

export interface PageAuthorProps {
  className?: string;
}


const PageAuthor: FC<PageAuthorProps> = ({ className = "" }) => {
  const DISTANCE = [
    { id: 1, name: "2 KMS",value:2 },
    { id: 2, name: "5 KMS" ,value:5},
    { id: 3, name: "10 KMS",value:10 },
    { id: 4, name: "50 KMS",value:50 },
    { id: 5, name: "100+ KMS",value:101 },
  ];
  let arr1:any=[], arr2:any=[];
  const location = useLocation<LocationState>();

  const [distanceOpen, setDistanceOpen] = useState(1);
  const [catOpen, setCatOpen] = useState(1);
  const [categoryData, setCategoryData] = useState([]);
  const [groupData, setGroupData] = useState([]);

  const [searchTextForGroup, setSearchTextForGroup] = useState("");
  const [filterGroup, setFilterGroup] = useState([]);

  const [filterDistance, setFilterDistance] = useState([]);
  //Pagination
  const [totalPages, setTotalPages] = useState(0);
  const [pageCount, setPageCount] = useState(1);
  const [loading, setLoading] = useState(false);

  React.useEffect(() => {
    loadAll();
  }, []);

  const loadAll = async () => {
    setLoading(true);
    let id: any = location.state?.groupCatId;
    if (id != undefined) {
      changeFilter(id, "group");
      let action = await getAllGroupCategories();
      setCategoryData(action.data.data);
    } else {
      loadData();
      setTimeout(() => {
        setLoading(false);
      }, 2000);
    }

   
   
  };

const loadData = async()=> {
  let action2 = await getAllGroups();
  console.log("GroupdData", action2);
  setTotalPages(action2.data.last_page);
  setGroupData(action2.data.data);
  let action = await getAllGroupCategories();
  setCategoryData(action.data.data);
  console.log("Cat After set", categoryData);
}




  const handleDistanceOpen = (value: any) => {
    setDistanceOpen(distanceOpen === value ? 0 : value);
  };
  const handleCatOpen = (value: any) => {
    setCatOpen(catOpen === value ? 0 : value);
  };

  const changeFilter = async(data: any, section: any) => {
    setLoading(true);
   
    console.log("type", section);
    if (section === "group") {
     arr1 = [...filterGroup];
      if (!arr1.includes(data)) {
        arr1.push(data);
      } else {
        arr1 = arr1.filter((e) => e !== data);
      }
      console.log("Group Cat Array Filter", arr1);
      setFilterGroup(arr1);
      arr2 = [...filterDistance];
    } 
    if(section==="distance") {
       arr2 = filterDistance;
      if (!arr2.includes(data)) {
        arr2.push(data);
      } else {
        arr2 = arr2.filter((e) => e !== data);
      }
      console.log("Distance Array Filter", arr2);
      setFilterDistance(arr2);
      arr1 = [...filterGroup];
    }
    applyFilter(arr1,arr2);
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  };

  const applyFilter = async (arr1:any,arr2:any) => {
    let i,j,
      a = [],
      b = [];
    for (i = 0; i < arr1.length; i++) {
      a.push({ catId: arr1[i] });
    }
  
  console.log("ALL Filters", arr2, a);
  let filterRes:any = await getAllFilteredGroups(a, arr2);
  console.log("filter", filterRes);
  setGroupData(filterRes.data.data);
  setTotalPages(filterRes.data.last_page);
  console.log("FILTEREDDD");

  };
  const resetFilter = async () => {
    setLoading(true);
    setCatOpen(0);
    setFilterGroup([]);
    setFilterDistance([]);
    setDistanceOpen(0);
    loadData();
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  };

  const handlePageClick = (numPage: any) => {
    setPageCount(numPage);
    console.log("page", numPage);
    var requestOptions: any = {
      method: "GET",
      redirect: "follow",
    };

    fetch(`http://127.0.0.1:8000/groups?page=${numPage}`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        setGroupData(result.data.data);
      })
      .catch((error) => console.log("error", error));
  };

  return (
    <div
      className={`nc-PageArchive overflow-hidden ${className}`}
      data-nc-id="PageArchive"
    >
      <Helmet>
        <title>HolaaHost || Groups</title>
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
              Groups
            </h2>
            <span className="block mt-4 text-neutral-300">Join Groups</span>
          </div>
        </div>
      </div>
      {/* ====================== END HEADER ====================== */}

      <div className="container event-div py-16 lg:pb-28 lg:pt-20 space-y-16 lg:space-y-28">
        <div className=" lg:flex  mb-4 justify-between">
          {/* filters */}
          <div className=" lg:w-1/4 sm:w-full mb-10">
            {/* Radio */}
            <div className=" items-center flex">
              <div className="mx-7 flex items-center">
                <input
                  className="mx-3"
                  type="radio"
                  value="option2"
                  checked={true}
                />

                <label className="text-ms font-semibold">Groups</label>
              </div>
              <div className="mx-1 flex items-center">
                <Link to="/events">
                  <input
                    className="mx-3"
                    type="radio"
                    value="option2"
                    checked={false}
                  />
                </Link>
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
                  {categoryData
                    .filter((category) => {
                      if (searchTextForGroup === "") {
                        return category;
                      } else if (
                        category?.group_category_name
                          .toLowerCase()
                          .includes(searchTextForGroup.toLowerCase())
                      ) {
                        return category;
                      }
                    })
                    .map((category) => (
                      <div className="my-2 flex mx-1 ">
                        <input
                          className="form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
                          type="checkbox"
                          checked={
                            filterGroup.includes(category?.id) ? true : false
                          }
                          value=""
                          id="flexCheckDefault"
                          onChange={() => changeFilter(category?.id, "group")}
                        />
                        <label
                          className="form-check-label inline-block text-gray-800"
                          htmlFor="flexCheckDefault"
                        >
                          {category?.group_category_name}
                        </label>
                      </div>
                    ))}
                </div>
              </div>
            )}
          </div>
          {/* filters */}

          {/* Events */}
          <div className="group-card-listing  lg:w-3/4 sm:w-full p-12 rounded-3xl event-card">
            <div className="justify-center text-center items-center">
              <h1 className="lg:text-3xl text-black font-semibold sm:text-xl">Groups</h1>
              <p className="sm:text-lg lg:text-xl mt-5 mb-5 text-black font-normal">
                Join Groups
              </p>
            </div>

            {!loading ? (
              <div className="grid card-gap sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3  gap-6 md:gap-8 mt-8 lg:mt-10">
                {groupData.map((post) => (
                  <Link
                    to={{
                    
                      pathname: `/group/${post.id}`,
                      state: { groupId: post.id },
                    }}
                    target="_blank"
                  >
                    <Card11 key={post.id} post={post} />
                  </Link>
                ))}
              </div>
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

export default PageAuthor;
