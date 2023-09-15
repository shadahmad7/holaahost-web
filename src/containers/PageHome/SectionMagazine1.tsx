import React, { FC, useState } from "react";
import Card2 from "components/Card2/Card2";
import { EventCategoryDataType, EventDataType, PostDataType } from "data/types";
import Card6 from "components/Card6/Card6";
import HeaderFilter from "./HeaderFilter";
import { Link } from "react-router-dom";
import ButtonSecondary from "components/Button/ButtonSecondary";

export interface SectionMagazine1Props {
  tabs: EventCategoryDataType[];

  posts: EventDataType[];
  heading?: string;
  className?: string;
}

const SectionMagazine1: FC<SectionMagazine1Props> = ({
  posts,
  tabs,

  heading = "Upcoming Online Events",
  className = "",
}) => {
  const [tabActive, setTabActive] = useState<string>(
    tabs[0]?.event_category_name
  );
  const [data, setData] = React.useState([]);
  const [filterData, setFilterData] = React.useState([]);
  const [loading, setLoading] = React.useState(false);

  const handleClickTab = async (item: any) => {
    if (item?.event_category_name === tabActive) {
      return;
    }
    setTabActive(item?.event_category_name);
    if (item?.event_category_name != "All") {
      let a = data.filter((obj) => obj?.event_category_id === item?.id);
      console.log("fitered", a);
      setFilterData([...a]);
      console.log("fitered 2", filterData);
    } else {
      setFilterData([...data]);
    }
  };

  React.useEffect(() => {
    setLoading(true);
    setData(posts);
    setFilterData(posts);
    console.log("A", data);
    console.log("B", filterData);
    console.log("C", tabs);
    setTimeout(()=> {
setLoading(false)
    },2000)
  }, []);

  return (
  
      
        <div className={`nc-SectionMagazine1   ${className}`}>
          <HeaderFilter
            tabActive={tabActive}
            tabs={tabs}
            heading={heading}
            onClickTab={handleClickTab}
          />

          {!filterData.length && (
            <main className="h-1/2 w-full mt-10 py-10 flex flex-col justify-center items-center ">
              <h1 className="text-9xl font-extrabold text-black tracking-widest">
                OOPS
              </h1>
              <div className="bg-[#305f63] px-2 text-sm text-white rounded rotate-12 absolute">
                Events Not Found
              </div>
            </main>
          )}

<div className="view-all-btn-mobile lg:hidden">

<Link to="/events">
  <ButtonSecondary className="!leading-none view-all-btn">
           <span>View all</span>
            <i className="ml-3 las la-angle-right text-xl"></i>
          </ButtonSecondary>
          </Link>
</div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8  ">
            {filterData[0] && <Card2 size="large" post={filterData[0]} />}
            {filterData.length != 0 && (
              <div className="grid gap-6 md:gap-8">
                {filterData
                  .filter((_, i) => i < 4 && i > 0)
                  .map((item, index) => (
                    <Card6 key={index} post={item} />
                  ))}
              </div>
            )}
          </div>
        </div>
     
        
      
      
      
      
      
    
    
  );
};

export default SectionMagazine1;
