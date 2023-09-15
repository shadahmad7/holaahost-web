import React, { FC } from "react";
import NcImage from "components/NcImage/NcImage";
import { EventCategoryDataType, TaxonomyType, TwMainColor } from "data/types";
import { Link } from "react-router-dom";
import Badge from "components/Badge/Badge";
import { api } from "config/api";

export interface CardCategory2Props {
  className?: string;
  taxonomy: EventCategoryDataType;
  index?: string;
}

const CardCategory2: FC<CardCategory2Props> = ({
  className = "",
  taxonomy,
  index,
}) => {
  const { id, event_category_image, event_category_name,count, created_at, updated_at} = taxonomy;
  return (
    <Link
    to={{ pathname:"/events", state: { eventCatId: id }}}
      className={`nc-CardCategory2 relative flex flex-col items-center justify-center text-center px-3 py-5 my-2 sm:p-6  [ nc-box-has-hover ] [ nc-dark-box-bg-has-hover ]  ${className}`}
      data-nc-id="CardCategory2"
    >
      
      <NcImage
        containerClassName={`flex-shrink-0 w-20 h-20 rounded-full overflow-hidden`}
        src={api.imageUrl2+event_category_image}
      />
      <div className="mt-3 ">
        <h2 className={`text-base sm:text-lg font-semibold `}>
          <span className="line-clamp-1">{event_category_name}</span>
        </h2>
        <span
          className={`block mt-[2px] text-sm text-neutral-500 dark:text-neutral-400`}
        >
          {count} Events
        </span>
      </div>
    </Link>
  );
};

export default CardCategory2;
