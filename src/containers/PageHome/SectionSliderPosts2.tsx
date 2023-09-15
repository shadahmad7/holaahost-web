import React, { FC, useEffect } from "react";
import Heading from "components/Heading/Heading";
import Card4 from "components/Card4/Card4";

import Glide from "@glidejs/glide";
import { EventDataType } from "data/types";

import NextPrev from "components/NextPrev/NextPrev";

import ncNanoId from "utils/ncNanoId";
import ButtonPrimary from "components/Button/ButtonPrimary";
import Card12 from "components/Card12/Card12";

export interface SectionSliderPosts2Props {
  className?: string;
  heading: string;
  subHeading?: string;
  posts: EventDataType[];
  postCardName?: "card4" | "card7" | "card9" | "card10" | "card10V2" | "card11"| "card12";
  sliderStype?: "style1" | "style2";
  perView?: 2 | 3 | 4;
  uniqueSliderClass: string;
}

const SectionSliderPosts2: FC<SectionSliderPosts2Props> = ({
  heading,
  subHeading,
  className = "",
  posts,
  postCardName = "card4",
  sliderStype = "style1",
  perView = 4,
  uniqueSliderClass,
}) => {
  const UNIQUE_CLASS = "SectionSliderPosts_" + ncNanoId(uniqueSliderClass);


  console.log("test", posts);
 
  const MY_GLIDE = new Glide(`.${UNIQUE_CLASS}`, {
    // @ts-ignore
    direction:
      document.querySelector("html")?.getAttribute("dir") === "rtl"
        ? "rtl"
        : "ltr",
    perView: perView,
    gap: 32,
    bound: true,
    breakpoints: {
      1280: {
        perView: perView - 1,
      },
      1023: {
        perView: perView - 2 || 1.2,
        gap: 20,
      },
      767: {
        perView: perView - 2 || 1.2,
        gap: 20,
      },
      639: {
        perView: 1.2,
        gap: 20,
      },
    },
  });

  useEffect(() => {
    if (!MY_GLIDE) return;
    MY_GLIDE.mount();
  }, [MY_GLIDE]);

  const getPostComponent = () => {
    switch (postCardName) {
      
      case "card12":
        return Card12;

      default:
        return Card4;
    }
  };

  const renderHeading = () => {
    if (sliderStype === "style1") {
      return (
        <Heading desc={subHeading} hasNextPrev>
          {heading}
          
        </Heading>
      );
    } else {
      return (
        <Heading desc={subHeading} isCenter>
          {heading}
        </Heading>
      );
    }
  };

  const CardName = getPostComponent();
  console.log("card naaaaammmm", CardName);
  return (
    <div className={`nc-SectionSliderPosts ${className}`}>
      <div className={`${UNIQUE_CLASS}`}>

        {renderHeading()}
        <div className="flex self-center justify-center button-join-group">
      <ButtonPrimary className="" href="/groups">Join Now</ButtonPrimary></div>

        <div className="glide__track" data-glide-el="track">
          <ul className="glide__slides">
            {posts.map((item, index) => (
              <li
                key={index}
                className={`glide__slide h-auto  ${
                  sliderStype === "style2" ? "pb-12 xl:pb-16" : ""
                }`}
              >

                
             <Card12 key={item.id} post={item} />
              </li>
            ))}
          </ul>
        </div>
        {sliderStype === "style2" && (
          <NextPrev
            btnClassName="w-12 h-12"
            containerClassName="justify-center"
          />
        )}
      </div>
    </div>
  );
};

export default SectionSliderPosts2;
