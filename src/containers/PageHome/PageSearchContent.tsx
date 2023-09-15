import React, {  useState } from "react";
import SectionSliderPosts from "./SectionSliderPosts";

import { Helmet } from "react-helmet";
import BackgroundSection from "components/BackgroundSection/BackgroundSection";

import SectionSliderNewCategories from "components/SectionSliderNewCategories/SectionSliderNewCategories";

import FooterCard from "components/FooterCard/FooterCard";

import SectionSliderPosts2 from "./SectionSliderPosts2";
import { searchGlobal } from "actions/profileAction";
import Card5 from "components/Card5/Card5";

const PageSearchContent: React.FC = () => {
  const [groupData, setGroupData] = useState([]);
  const [groupCategoryData, setGroupCategoryData] = useState([]);
  const [eventCategoryData, setEventCategoryData] = useState([]);
  const [eventData, setEventData] = useState([]);
  const [blogData, setBlogData] = useState([]);
  const [loader, setLoader] = useState(false);

  React.useEffect(() => {
    loadAll();
  }, []);

  const loadAll = async () => {
    setLoader(true);

    let keyword: any = localStorage.getItem("@search");
    keyword = JSON.parse(keyword);
    console.log("word", keyword);
    let action = await searchGlobal(keyword);
    console.log("resssssssss", action);

    setGroupData(action.group);
    setGroupCategoryData(action.groupcategory);
    setEventCategoryData(action.eventcategory);
    setEventData(action.events);
    setBlogData(action.blogs);
    setTimeout(() => {
      setLoader(false);
    }, 2000);
  };

  return (
    <div className="nc-PageSearchContent relative">
      <Helmet>
        <title>HolaaHost</title>
      </Helmet>

      <div className="relative overflow-hidden">
        {/* ======= START CONTAINER ============= */}
        <div className="container relative">
          {/* Trending Topics Groups */}


          <h1 className="my-10 text-3xl font-semibold justify-center">Groups Topics</h1>

          {!loader ? (
            <>
              {groupCategoryData.length != 0 ? (
                <SectionSliderNewCategories
                  className="py-16 mt-20 lg:py-28"
                  heading="Trending Groups Topics"
                  subHeading={`Discover ${groupCategoryData.length} topics`}
                  categories={groupCategoryData.filter((_, i) => i < 10)}
                  categoryCardType="card4"
                  uniqueSliderClass="pageHome-section5"
                />
              ) : (
                <div className="flex justify-center my-20">
                  <p>No results found for groups category</p>
                </div>
              )}
            </>
          ) : (
            <div className="w-full h-96 border-2 rounded-md mx-auto mt-20">
              <div className="mx-6">
                <div>
                  <div className="w-64 h-14 mt-3 bg-gray-200 rounded-md "></div>
                  <div className="w-24 h-10 mt-3 bg-gray-200 rounded-md "></div>
                </div>
                <div className="flex float-right -mt-14 mr-12">
                  <div className="w-8 h-8 mt-3 bg-gray-200 rounded-2xl "></div>
                  <div className="w-8 ml-2 h-8 mt-3 bg-gray-200 rounded-2xl "></div>
                </div>
              </div>

              <div className="flex animate-pulse flex-row items-end mt-10 px-6 justify-between space-x-5">
                <div className="flex flex-row mb-10 space-x-3">
                  <div>
                    <div className="w-56 h-32 bg-gray-300 rounded-md "></div>
                    <div className="w-20 h-6 mt-3 bg-gray-200 rounded-md "></div>
                    <div className="w-16 h-4 mt-3 bg-gray-200 rounded-md "></div>
                  </div>
                  <div>
                    <div className="w-56 h-32 bg-gray-300 rounded-md "></div>
                    <div className="w-20 h-6 mt-3 bg-gray-200 rounded-md "></div>
                    <div className="w-16 h-4 mt-3 bg-gray-200 rounded-md "></div>
                  </div>
                  <div>
                    <div className="w-56 h-32 bg-gray-300 rounded-md "></div>
                    <div className="w-20 h-6 mt-3 bg-gray-200 rounded-md "></div>
                    <div className="w-16 h-4 mt-3 bg-gray-200 rounded-md "></div>
                  </div>
                  <div>
                    <div className="w-56 h-32 bg-gray-300 rounded-md "></div>
                    <div className="w-20 h-6 mt-3 bg-gray-200 rounded-md "></div>
                    <div className="w-16 h-4 mt-3 bg-gray-200 rounded-md "></div>
                  </div>
                  <div>
                    <div className="w-56 h-32 bg-gray-300 rounded-md "></div>
                    <div className="w-20 h-6 mt-3 bg-gray-200 rounded-md "></div>
                    <div className="w-16 h-4 mt-3 bg-gray-200 rounded-md "></div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Groups */}

          <h1 className="mt-5 text-3xl font-semibold">Events</h1>

          <div className="relative mt-10 py-16">
            {eventData.length != 0 && <BackgroundSection />}

            {!loader ? (
              <>
                {eventData.length != 0 ? (
                  <SectionSliderPosts2
                    postCardName="card12"
                    heading="Popular groups"
                    subHeading="Join groups"
                    posts={eventData}
                    sliderStype="style2"
                    uniqueSliderClass="pageHome-section12"
                  />
                ) : (
                  <div className="flex justify-center my-20">
                    <p>No results found for events</p>
                  </div>
                )}
              </>
            ) : (
              <div className="w-full h-full border-2 rounded-md mx-auto mt-20">
                <div className=" flex flex-col justify-center items-center">
                  <div className="w-64 h-14 mt-3 bg-gray-200 rounded-md "></div>
                  <div className="w-28 h-8 mt-3 bg-gray-200 rounded-md "></div>
                  <div className="w-20 h-9 mt-3 bg-gray-200 rounded-md "></div>
                </div>

                <div className="flex animate-pulse flex-row items-end mt-10 px-6 justify-between space-x-64">
                  <div className="flex flex-row mb-10 space-x-3">
                    <div>
                      <div className="w-60 mx-5  h-56 bg-gray-200 flex flex-col rounded-md  justify-end items-center pb-5 ">
                        <div className="w-20 h-6 bg-gray-100 rounded-md flex mr-28"></div>

                        <div className="flex flex-row mt-2 w-full px-6 justify-between">
                          <div className="w-6 h-6  bg-gray-100 rounded-2xl "></div>
                          <div className="w-6 h-6 bg-gray-100 rounded-2xl "></div>
                        </div>
                      </div>
                    </div>
                    <div>
                      <div className="w-60 mx-5  h-56 bg-gray-200 flex flex-col rounded-md  justify-end items-center pb-5 ">
                        <div className="w-20 h-6 bg-gray-100 rounded-md flex mr-28"></div>

                        <div className="flex flex-row mt-2 w-full px-6 justify-between">
                          <div className="w-6 h-6  bg-gray-100 rounded-2xl "></div>
                          <div className="w-6 h-6 bg-gray-100 rounded-2xl "></div>
                        </div>
                      </div>
                    </div>
                    <div>
                      <div className="w-60 mx-5  h-56 bg-gray-200 flex flex-col rounded-md  justify-end items-center pb-5 ">
                        <div className="w-20 h-6 bg-gray-100 rounded-md flex mr-28"></div>

                        <div className="flex flex-row mt-2 w-full px-6 justify-between">
                          <div className="w-6 h-6  bg-gray-100 rounded-2xl "></div>
                          <div className="w-6 h-6 bg-gray-100 rounded-2xl "></div>
                        </div>
                      </div>
                    </div>
                    <div>
                      <div className="w-60 mx-5  h-56 bg-gray-200 flex flex-col rounded-md  justify-end items-center pb-5 ">
                        <div className="w-20 h-6 bg-gray-100 rounded-md flex mr-28"></div>

                        <div className="flex flex-row mt-2 w-full px-6 justify-between">
                          <div className="w-6 h-6  bg-gray-100 rounded-2xl "></div>
                          <div className="w-6 h-6 bg-gray-100 rounded-2xl "></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex justify-center mb-16">
                  <div className="w-8 h-8 mt-3 bg-gray-200 rounded-2xl "></div>
                  <div className="w-8 ml-2 h-8 mt-3 bg-gray-200 rounded-2xl "></div>
                </div>
              </div>
            )}
          </div>


          <h1 className="my-10 text-3xl font-semibold">Events Topic</h1>

          {/* Trending Topics Events */}
          {!loader ? (
            <>
              {eventCategoryData.length != 0 ? (
                <SectionSliderNewCategories
                  className="py-16 my-16  lg:py-28"
                  heading="Trending Events Topics"
                  subHeading={`Discover ${eventCategoryData?.length} topics`}
                  categories={eventCategoryData.filter((_, i) => i < 10)}
                  categoryCardType="card2"
                  uniqueSliderClass="pageHome-section5"
                />
              ) : (
                <div className="flex justify-center my-20">
                  <p>No results found for events category</p>
                </div>
              )}
            </>
          ) : (
            <div className="w-full h-96 border-2 rounded-md mx-auto mt-20">
              <div className="mx-6">
                <div>
                  <div className="w-64 h-14 mt-3 bg-gray-200 rounded-md "></div>
                  <div className="w-24 h-10 mt-3 bg-gray-200 rounded-md "></div>
                </div>
                <div className="flex float-right -mt-14 mr-8">
                  <div className="w-8 h-8 mt-3 bg-gray-200 rounded-2xl "></div>
                  <div className="w-8 ml-2 h-8 mt-3 bg-gray-200 rounded-2xl "></div>
                </div>
              </div>

              <div className="flex animate-pulse flex-row items-end mt-10 px-6 justify-between space-x-16">
                <div className="flex flex-row mb-10 space-x-3">
                  <div>
                    <div className="w-56  mx-2 h-40  flex flex-col rounded-md border-2 justify-end items-center pb-5 ">
                      <div className="w-14 h-20 mt-3 bg-gray-200 rounded-full "></div>
                      <div className="w-12 h-6 mt-3 bg-gray-200 rounded-md "></div>
                      <div className="w-16 h-4 mt-3 bg-gray-200 rounded-md "></div>
                    </div>
                  </div>
                  <div>
                    <div className="w-56  h-40  mx-2 flex flex-col rounded-md border-2 justify-end items-center pb-5 ">
                      <div className="w-14 h-20 mt-3 bg-gray-200 rounded-full "></div>
                      <div className="w-12 h-6 mt-3 bg-gray-200 rounded-md "></div>
                      <div className="w-16 h-4 mt-3 bg-gray-200 rounded-md "></div>
                    </div>
                  </div>
                  <div>
                    <div className="w-56  h-40 mx-2 flex flex-col rounded-md border-2 justify-end items-center pb-5 ">
                      <div className="w-14 h-20 mt-3 bg-gray-200 rounded-full "></div>
                      <div className="w-12 h-6 mt-3 bg-gray-200 rounded-md "></div>
                      <div className="w-16 h-4 mt-3 bg-gray-200 rounded-md "></div>
                    </div>
                  </div>
                  <div>
                    <div className="w-56  h-40 mx-2 flex flex-col rounded-md border-2 justify-end items-center pb-5 ">
                      <div className="w-14 h-20 mt-3 bg-gray-200 rounded-full "></div>
                      <div className="w-12 h-6 mt-3 bg-gray-200 rounded-md "></div>
                      <div className="w-16 h-4 mt-3 bg-gray-200 rounded-md "></div>
                    </div>
                  </div>
                  <div>
                    <div className="w-56  h-40 mx-2 flex flex-col rounded-md border-2 justify-end items-center pb-5 ">
                      <div className="w-14 h-20 mt-3 bg-gray-200 rounded-full "></div>
                      <div className="w-12 h-6 mt-3 bg-gray-200 rounded-md "></div>
                      <div className="w-16 h-4 mt-3 bg-gray-200 rounded-md "></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="my-16 " />


          <h1 className="my-10 text-3xl font-semibold">Groups</h1>

          {/* Groups */}
          <div className="relative mb-20 py-16">
            {groupData.length != 0 && <BackgroundSection />}

            {!loader ? (
              <>
                {groupData.length != 0 ? (
                  <SectionSliderPosts
                    postCardName="card11"
                    heading="Popular groups"
                    subHeading="Join groups"
                    posts={groupData}
                    sliderStype="style2"
                    uniqueSliderClass="pageHome-section12"
                  />
                ) : (
                  <div className="flex justify-center my-20">
                    <p>No results found for groups.</p>
                  </div>
                )}
              </>
            ) : (
              <div className="w-full h-full border-2 rounded-md mx-auto mt-20">
                <div className=" flex flex-col justify-center items-center">
                  <div className="w-64 h-14 mt-3 bg-gray-200 rounded-md "></div>
                  <div className="w-28 h-8 mt-3 bg-gray-200 rounded-md "></div>
                  <div className="w-20 h-9 mt-3 bg-gray-200 rounded-md "></div>
                </div>

                <div className="flex animate-pulse flex-row items-end mt-10 px-6 justify-between space-x-64">
                  <div className="flex flex-row mb-10 space-x-3">
                    <div>
                      <div className="w-60 mx-5  h-56 bg-gray-200 flex flex-col rounded-md  justify-end items-center pb-5 ">
                        <div className="w-20 h-6 bg-gray-100 rounded-md flex mr-28"></div>

                        <div className="flex flex-row mt-2 w-full px-6 justify-between">
                          <div className="w-6 h-6  bg-gray-100 rounded-2xl "></div>
                          <div className="w-6 h-6 bg-gray-100 rounded-2xl "></div>
                        </div>
                      </div>
                    </div>
                    <div>
                      <div className="w-60 mx-5  h-56 bg-gray-200 flex flex-col rounded-md  justify-end items-center pb-5 ">
                        <div className="w-20 h-6 bg-gray-100 rounded-md flex mr-28"></div>

                        <div className="flex flex-row mt-2 w-full px-6 justify-between">
                          <div className="w-6 h-6  bg-gray-100 rounded-2xl "></div>
                          <div className="w-6 h-6 bg-gray-100 rounded-2xl "></div>
                        </div>
                      </div>
                    </div>
                    <div>
                      <div className="w-60 mx-5  h-56 bg-gray-200 flex flex-col rounded-md  justify-end items-center pb-5 ">
                        <div className="w-20 h-6 bg-gray-100 rounded-md flex mr-28"></div>

                        <div className="flex flex-row mt-2 w-full px-6 justify-between">
                          <div className="w-6 h-6  bg-gray-100 rounded-2xl "></div>
                          <div className="w-6 h-6 bg-gray-100 rounded-2xl "></div>
                        </div>
                      </div>
                    </div>
                    <div>
                      <div className="w-60 mx-5  h-56 bg-gray-200 flex flex-col rounded-md  justify-end items-center pb-5 ">
                        <div className="w-20 h-6 bg-gray-100 rounded-md flex mr-28"></div>

                        <div className="flex flex-row mt-2 w-full px-6 justify-between">
                          <div className="w-6 h-6  bg-gray-100 rounded-2xl "></div>
                          <div className="w-6 h-6 bg-gray-100 rounded-2xl "></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex justify-center mb-16">
                  <div className="w-8 h-8 mt-3 bg-gray-200 rounded-2xl "></div>
                  <div className="w-8 ml-2 h-8 mt-3 bg-gray-200 rounded-2xl "></div>
                </div>
              </div>
            )}
          </div>
          <h1 className="my-10 text-3xl font-semibold">Blogs</h1>

{blogData.length != 0 ? ( 
            <div className="flex mb-10 items-center">

          
                {blogData.slice(0, 8).map((blog, index) => (
                  <div className="mx-5">
                  <Card5
                    className="bg-white w-72 h-72 dark:bg-neutral-800 shadow-2xl rounded-3xl"
                    key={index}
                    blog={blog}
                  />
                  </div>
                ))}
          </div>
          ) : (
            <div className="flex justify-center my-20">
            <p>No results found for blogs.</p>
            </div>
          )}
        </div>
      </div>
      <FooterCard />
    </div>
  );
};

export default PageSearchContent;
