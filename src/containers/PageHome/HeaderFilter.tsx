import React, { FC } from "react";
import Heading from "components/Heading/Heading";
import Nav from "components/Nav/Nav";
import NavItem from "components/NavItem/NavItem";
import ButtonSecondary from "components/Button/ButtonSecondary";
import { Link } from "react-router-dom";
import { EventCategoryDataType } from "data/types";

export interface HeaderFilterProps {
  tabActive: string;
  tabs: EventCategoryDataType[];
  heading: string;
  onClickTab: (item: any) => void;
}

const HeaderFilter: FC<HeaderFilterProps> = ({
  tabActive,
  tabs,
  heading = "🎈 Latest Articles",
  onClickTab,
}) => {
  return (
    <div className="flex flex-col mb-8 relative">
      <Heading>{heading}</Heading>
      <div className="flex items-center justify-between">
        <Nav
          className="sm:space-x-2"
          containerClassName="relative flex w-full  overflow-x-auto text-sm md:text-base"
        >
          
          {tabs.slice(0,5).map((item, index) => (
            <NavItem
              key={index}
              isActive={tabActive === item.event_category_name}
              onClick={() => onClickTab(item)}
            >
              {item.event_category_name}
            </NavItem>
          ))}
        </Nav>
        <span className="hidden sm:block flex-shrink-0">
        <Link to="/events"><ButtonSecondary className="!leading-none">
           <span>View all</span>
            <i className="ml-3 las la-angle-right text-xl"></i>
          </ButtonSecondary></Link>
        </span>
      </div>
    </div>
  );
};

export default HeaderFilter;
