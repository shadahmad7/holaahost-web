import React, { FC } from "react";
import NcImage from "components/NcImage/NcImage";
import PostCardSaveAction from "components/PostCardSaveAction/PostCardSaveAction";
import { EventDataType, PostDataType } from "data/types";
import { Link } from "react-router-dom";
import SocialsShare from "components/SocialsShare/SocialsShare";
import PostCardLikeAndComment from "components/PostCardLikeAndComment/PostCardLikeAndComment";
import CardAuthor2 from "components/CardAuthor2/CardAuthor2";
import CategoryBadgeList from "components/CategoryBadgeList/CategoryBadgeList";
import PostTypeFeaturedIcon from "components/PostTypeFeaturedIcon/PostTypeFeaturedIcon";
import { api } from "config/api";

export interface Card2Props {
  className?: string;
  post: EventDataType;
  size?: "normal" | "large";
}

const Card2: FC<Card2Props> = ({
  className = "h-full",
  size = "normal",
  post,
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

  return (
    <Link to={{
      pathname: `/event/${id}`,
      state: { eventId: id },
    }}>
    <div
      className={`nc-Card2 group relative flex flex-col  [ nc-box-has-hover ] [ nc-dark-box-bg-has-hover ] overflow-hidden ${className}`}
      data-nc-id="Card2"
    >
      <span className="block flex-shrink-0 flex-grow relative w-full h-0 pt-[75%] sm:pt-[55%] rounded-xl sm:rounded-b-none overflow-hidden">
        <NcImage
          containerClassName="absolute inset-0"
          src={api.imageUrl2+event_image}
          alt={event_name}
        />
        <PostTypeFeaturedIcon
          className="absolute bottom-2 left-2"
          postType={event_type}
          wrapSize="w-8 h-8"
          iconSize="w-4 h-4"
        />
      </span>

      <SocialsShare className="absolute hidden md:grid gap-[5px] right-4 top-4 opacity-0 z-[-1] group-hover:z-10 group-hover:opacity-100 transition-all duration-300" />
      <Link  to={{
          pathname: `/event/${id}`,
          state: { eventId: id },
        }} className="absolute inset-0" />

      <div className="p-4 sm:p-5 flex flex-col">
        <div className="space-y-6">
          {/* <CategoryBadgeList itemClass="relative" categories={categories} /> */}
          <h2
            className={`nc-card-title block font-semibold text-neutral-900 dark:text-neutral-100 transition-colors ${
              size === "large" ? "text-lg sm:text-2xl" : "text-base"
            }`}
          >
            <Link  to={{
          pathname: `/event/${id}`,
          state: { eventId: id },
        }} className="line-clamp-2" title={event_name}>
              {event_name}
            </Link>
          </h2>
          <span className="block text-neutral-500 dark:text-neutral-400 text-sm line-clamp-2">
            {event_description}
          </span>
        </div>
        {/* <CardAuthor2 className="relative my-4" date={date} author={author} /> */}
        <div className="flex items-center justify-between mt-12">
          {/* <PostCardLikeAndComment className="relative" postData={post} /> */}
          {/* <PostCardSaveAction
            className="relative"
            postData={post}
            readingTime={readingTime}
          /> */}
        </div>
      </div>
    </div>
    </Link>
  );
};

export default Card2;
