import React, { FC, useEffect } from "react";
import Heading from "components/Heading/Heading";
import Glide from "@glidejs/glide";
import {  GroupCategoryDataType, PostDataType, TaxonomyType } from "data/types";
import CardCategory4 from "components/CardCategory4/CardCategory4";
import CardCategory2 from "components/CardCategory2/CardCategory2";
import ncNanoId from "utils/ncNanoId";

export interface SectionSliderNewCategoriesProps {
  className?: string;
  itemClassName?: string;
  heading: string;
  subHeading: string;
  categories: GroupCategoryDataType;
  categoryCardType?: "card1" | "card2" | "card3" | "card4" | "card5";
  itemPerRow?: 4 | 5;
  uniqueSliderClass: string;
}

const SectionSliderNewCategories: FC<SectionSliderNewCategoriesProps> = ({
  heading,
  subHeading,
  className = "",
  itemClassName = "",
  categories,
  itemPerRow = 5,
  categoryCardType = "card3",
  uniqueSliderClass = "",
}) => {
  const UNIQUE_CLASS = `SectionSliderNewCategories_${ncNanoId(
    uniqueSliderClass
  )}`;

  console.log("card", categoryCardType);
  const MY_GLIDE = new Glide(`.${UNIQUE_CLASS}`, {
    // @ts-ignore
    direction:
      document.querySelector("html")?.getAttribute("dir") === "rtl"
        ? "rtl"
        : "ltr",
    perView: itemPerRow,
    gap: 32,
    bound: true,
    breakpoints: {
      1280: {
        perView: itemPerRow - 1,
      },
      1024: {
        gap: 24,
        perView: itemPerRow - 2,
      },
      768: {
        gap: 20,
        perView: itemPerRow - 2,
      },
      640: {
        gap: 20,
        perView: itemPerRow - 3,
      },
      500: {
        gap: 20,
        perView: 1.3,
      },
    },
  });

  useEffect(() => {
    if (!MY_GLIDE) return;
    MY_GLIDE.mount();
  }, [MY_GLIDE]);

  const renderCard = (item: GroupCategoryDataType, index: number) => {
    const topIndex = index < 0 ? `#${index + 1}` : undefined;
    switch (categoryCardType) {
    
      case "card2":
        return <CardCategory2 index={topIndex} taxonomy={item} />;
      
      case "card4":
        return <CardCategory4 index={topIndex} taxonomy={item} />;
      default:
        return null;
    }
  };

  return (
    <div className={`nc-SectionSliderNewCategories trending-card ${className}`}>
      <div className={`${UNIQUE_CLASS} flow-root`}>
        <Heading desc={subHeading} hasNextPrev>
          {heading}
        </Heading>
        <div className="glide__track" data-glide-el="track">
          <ul className="glide__slides">
            {categories.map((item, index) => (
              <li key={index} className={`glide__slide ${itemClassName}`}>
                {renderCard(item, index)}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SectionSliderNewCategories;
