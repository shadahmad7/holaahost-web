import React, { FC, useState } from "react";
import { EventDataType} from "data/types";


import { api } from "config/api";
import PostCardSlots from "components/PostCardSlots/PostCardSlots";




export interface Card12Props {
  className?: string;
  post: EventDataType;
  ratio?: string;
  itemClass?: string,
  hiddenAuthor?: boolean;
  hiddenCommentOnMobile?:boolean
}

const Card12: FC<Card12Props> = ({
  className = "h-full",
  post,
  itemClass = "px-3 h-8 text-xs",
  hiddenAuthor = false,
  hiddenCommentOnMobile=true,
  ratio = "aspect-w-4 aspect-h-3",
}) => {
  const {   id,
    event_name,
    event_type,
    event_description,
    event_start_time,
    event_end_time,
    event_location,
    event_seats,
    event_free,
    event_rsvp,
    event_image,
    event_user_id,
    event_category_id,
    created_at,
    updated_at
   } = post;

  const [isHover, setIsHover] = useState(false);

  return (
    <div
      className={`nc-Card12 relative flex flex-col group [ nc-box-has-hover ] [ nc-dark-box-bg-has-hover ] ${className}`}
      data-nc-id="Card12"
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
      //
    >
      <div
        className={`block flex-shrink-0 relative w-full rounded-t-xl overflow-hidden ${ratio}`}
      >
        <div>
        <img 
      src={api.imageUrl2+event_image}
      alt={event_name}
      />
        </div>
      </div>
      <span className="absolute top-3 inset-x-3 z-10">
      </span>

      <div className="p-4 flex flex-col flex-grow space-y-3">
      
          <span className="text-xs font-normal text-neutral-500">{event_location}</span>
      
        <h2 className="nc-card-title block text-base font-semibold text-neutral-900 dark:text-neutral-100 ">
            {event_name}
        </h2>
      

        <div
      className={'slots-count'}
     
      >
   
      
      <PostCardSlots
      href="#"
      memberCount={event_seats}
      className={`${
        hiddenCommentOnMobile ? "hidden sm:flex" : "flex"
      }  ${itemClass}`}
      />
     
    </div>

       
      </div>
    </div>
  );
};

export default Card12;
