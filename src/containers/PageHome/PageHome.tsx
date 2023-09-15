import React, { useState } from "react";
import SectionSliderPosts from "./SectionSliderPosts";
import SectionMagazine1 from "./SectionMagazine1";
import { Helmet } from "react-helmet";
import BackgroundSection from "components/BackgroundSection/BackgroundSection";
import SectionSubscribe2 from "components/SectionSubscribe2/SectionSubscribe2";

import SectionSliderNewCategories from "components/SectionSliderNewCategories/SectionSliderNewCategories";

import SectionHero from "components/SectionHero/SectionHero";
import rightImg from "images/hero-right.png";
import HomePageBanner from "components/HomePageBanner/HomePageBanner";
import FooterCard from "components/FooterCard/FooterCard";
import MobileApp from "components/MobileApp/MobileApp";
import { getAllGroups } from "actions/groupsAction";
import { getAllEvents } from "actions/eventAction";
import { getAllGroupCategories } from "actions/groupCategoryAction";
import { getAllEventCategories } from "actions/eventCategoryAction";


let MAGAZINE1_TABS:any=[];

const PageHome: React.FC = () => {
  const [groupData, setGroupData] = useState([]);
  const [groupCategoryData, setGroupCategoryData] = useState([]);
  const [eventCategoryData, setEventCategoryData] = useState([]);
  const [eventData, setEventData] = useState([]);
  const [loader, setLoader] = useState(false);

  React.useEffect(() => {
    loadAll();
  }, []);

  const loadAll = async () => {
    setLoader(true);
    let action: any = await getAllGroups();
    let action2: any = await getAllGroupCategories();
    let action3: any = await getAllEvents();
    let action4: any = await getAllEventCategories();
    MAGAZINE1_TABS = [...action4.data.data];
    let arr = [
        {
          id: 0,
          event_category_name: "All",
          event_category_image: "1670404588partyy.jpg",
          created_at: "2022-12-07T09:16:28.000000Z",
          updated_at: "2022-12-07T09:16:28.000000Z",
        },
      ],
      i;

    for (i = 0; i < MAGAZINE1_TABS.length; i++) {
      arr.push(MAGAZINE1_TABS[i]);
    }
    MAGAZINE1_TABS = arr;
    console.log("event Tab data", MAGAZINE1_TABS);
    console.log("Groups Res", action);
    console.log("Event Cat Res", action4);

    setGroupData(action.data.data);
    setGroupCategoryData(action2.data.data);
    setEventCategoryData(action4.data.data);
    setEventData(action3.data.data);
    setTimeout(() => {
      setLoader(false);
    }, 2000);

  
  };

  return (
    <div className="nc-PageHome relative">
      <Helmet>
        <title>HolaaHost</title>
      </Helmet>

      {/* ======== ALL SECTIONS ======== */}
      <div className="relative overflow-hidden">
        {/* ======== BG GLASS ======== */}
        {/* <BgGlassmorphism /> */}

        {/* ======= START CONTAINER ============= */}
        <div className="container relative">
          <HomePageBanner className="" />

          {/* Trending Topics Groups */}
          {!loader ? (
            <SectionSliderNewCategories
              className="py-16 lg:py-28"
              heading="Trending Groups Topics"
              subHeading={`Discover ${groupCategoryData.length} topics`}
              categories={groupCategoryData.filter((_, i) => i < 10)}
              categoryCardType="card4"
              uniqueSliderClass="pageHome-section5"
            />
          ) : (
            <div className="w-full  h-96 border-2 rounded-md mx-auto mt-20">
              <div className="mx-6">
                <div>
                  <div className="w-64 h-14 mt-3 bg-gray-200 rounded-md "></div>
                  <div className="w-24 h-10 mt-3 bg-gray-200 rounded-md "></div>
                </div>
                <div className=" home-page-group-cat-loader flex float-right  -mt-14 mr-12">
                  <div className="w-8 h-8 mt-3 bg-gray-200 rounded-2xl "></div>
                  <div className="w-8 ml-2 h-8 mt-3 bg-gray-200 rounded-2xl "></div>
                </div>
              </div>

              <div className="flex animate-pulse flex-row items-end mt-10 px-6 justify-between space-x-5 ">
                <div className="home-page-group-cat-loader-scroll flex flex-row mb-10 space-x-3 sm:overflow-x-scroll">
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

          {/* How we work */}

          {!loader ? (
            <SectionHero
              rightImg={rightImg}
              className="pt-10 pb-16 md:py-16 lg:py-28"
              heading={<span>How we work</span>}
              btnText="Learn more"
              subHeading="Through online and live events , meet new individuals who are
          interested in the same things as you . The creation of an
          account is free ."
            />
          ) : (
            <div className="w-full p-4 h-full  rounded-md mx-auto mt-20">
              <div
                className="flex mt-10 animate-pulse justify-between py-12 flex-row w-full  h-full space-x-5">
                <div className="how-we-work-loader sm:w-full sm:mx-10 lg:w-6/12 h-96   rounded-md ">
                  <div className="lg:px-5 py-2 ">
                    <div className=" h-5 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[480px] mb-2.5"></div>
                    <div className="h-5 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
                    <div className="h-5 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[440px] mb-2.5"></div>
                  </div>
                  <div className="lg:px-5 ">
                    <div className="sm:w-full lg:w-80 h-20 bg-gray-200 my-2  rounded-md "></div>
                    <div className="w-80 h-20 bg-gray-200 my-2  rounded-md "></div>
                    <div className="w-80 h-20 bg-gray-200 my-2  rounded-md "></div>
                  </div>
                  <div className="lg:mx-5 py-2">
                    <div className="w-20 h-10 bg-gray-300 my-2  rounded-md "></div>
                  </div>
                </div>
                <div className="caraousel-card-loader flex gap-8 flex-row ">
                  <div className="w-36 h-64 bg-gray-300 my-2  rounded-md "></div>
                  <div className="w-36 h-64 bg-gray-300 my-2 rounded-md "></div>
                  <div className="w-36 h-64 bg-gray-300 my-2  rounded-md "></div>
                </div>
              </div>
            </div>
          )}

          {/* Events */}
          {!loader ? (
            <SectionMagazine1
              className="py-16 lg:py-16"
              posts={eventData}
              tabs={MAGAZINE1_TABS}
            />
          ) : (
            <div className="w-full p-4 h-full  rounded-md mx-auto mt-20">
              <div className="flex justify-start">
                <div className="w-24 h-10 mx-2 bg-gray-300  rounded-md "></div>
                <div className="w-24 h-10 mx-2   bg-gray-300  rounded-md "></div>
                <div className="w-24 h-10  mx-2 bg-gray-300  rounded-md "></div>
                <div className="w-24 h-10 mx-2  bg-gray-300  rounded-md "></div>

                <div className="flex  ml-96">
                  <div className="w-24  ml-96  h-10 mx-2 bg-gray-300  rounded-md "></div>
                </div>
              </div>

              <div
                className="flex mt-10 animate-pulse justify-between flex-row w-full  h-full
          space-x-5"
              >
                <div className="w-full h-96  bg-gray-300 rounded-md "></div>
                <div className="flex flex-col ">
                  <div className="event-card-loader w-96 lg:h-28 bg-gray-300 my-2  rounded-md "></div>
                  <div className="event-card-loader w-96 lg:h-28 bg-gray-300 my-2 rounded-md "></div>
                  <div className="event-card-loader w-96 lg:h-28 bg-gray-300 my-2  rounded-md "></div>
                </div>
              </div>
            </div>
          )}

          {/* Trending Topics Events */}
          {!loader ? (
            <SectionSliderNewCategories
              className="py-16 my-16  lg:py-28"
              heading="Trending Events Topics"
              subHeading={`Discover ${eventCategoryData?.length} topics`}
              categories={eventCategoryData.filter((_, i) => i < 10)}
              categoryCardType="card2"
              uniqueSliderClass="pageHome-section5"
            />
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
                <div className="home-page-group-cat-loader-scroll flex flex-row mb-10 space-x-3">
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

          <div className="my-16" />

          {/* Groups */}
          <div className="relative py-16">
            <BackgroundSection />

            {!loader ? (
              <SectionSliderPosts
                postCardName="card11"
                heading="Popular groups"
                subHeading="Join groups"
                posts={groupData}
                sliderStype="style2"
                uniqueSliderClass="pageHome-section12"
              />
            ) : (
              <div className="w-full h-full border-2 rounded-md mx-auto mt-20">
                <div className=" flex flex-col justify-center items-center">
                  <div className="w-64 h-14 mt-3 bg-gray-200 rounded-md "></div>
                  <div className="w-28 h-8 mt-3 bg-gray-200 rounded-md "></div>
                  <div className="w-20 h-9 mt-3 bg-gray-200 rounded-md "></div>
                </div>

                <div className="flex animate-pulse flex-row items-end mt-10 px-6 justify-between space-x-64">
                  <div className="home-page-group-cat-loader-scroll flex flex-row mb-10 space-x-3">
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

          {/* Newsletter */}
          <SectionSubscribe2 className="pt-16 lg:pt-28" />
          {/* <MobileApp /> */}

          {/* end */}

        </div>

        {/* ======= END CONTAINER ============= */}
      </div>
      <FooterCard />
    </div>
  );
};

export default PageHome;
