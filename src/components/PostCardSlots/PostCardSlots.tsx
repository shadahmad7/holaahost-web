import { PostDataType } from "data/types";
import React, { FC } from "react";
import { Link } from "react-router-dom";
import twFocusClass from "utils/twFocusClass";

export interface PostCardSlotsProps {
  className?: string;
  href: PostDataType["href"];
  memberCount?: PostDataType["memberCount"];
}

const PostCardSlots: FC<PostCardSlotsProps> = ({
  className = "flex px-3 h-8 text-xs",
  href,
  memberCount,
}) => {
  return (
    <Link
      to={href + "#members"}
      className={`nc-PostCardCommentBtn relative items-center min-w-[68px]  text-neutral-6000 bg-neutral-50 transition-colors dark:text-neutral-200 dark:bg-neutral-800 hover:bg-teal-50 dark:hover:bg-teal-100 hover:text-teal-600 dark:hover:text-teal-500 ${className} ${twFocusClass()}`}
      title="Slots"
      data-nc-id="PostCardCommentBtn"
    >

<svg
    xmlns="http://www.w3.org/2000/svg"
    xmlSpace="preserve"
    width={16.935}
    height={16.382}
    style={{
      shapeRendering: "geometricPrecision",
      textRendering: "geometricPrecision",
      imageRendering: "optimizeQuality",
      fillRule: "evenodd",
      clipRule: "evenodd",
    }}
    viewBox="0 0 5333 4452"
    
  >
    <path
      d="M229 1869c0-179 159-312 354-312h1187v83c0 192 229 170 229 42v-125h2750c110 0 185 34 247 86 146 122 107 348 107 580-285 0-494 162-611 410-127 269-28 607 220 794 111 84 240 129 391 129v354c0 183-167 312-354 312H1999v-125c0-128-229-150-229 42v83H583c-188 0-354-130-354-312v-354c113 0 200-22 288-66 38-19 67-37 97-59 68-49 112-99 159-164 26-35 40-69 59-107 21-42 29-73 42-125 42-172 7-369-92-512-128-185-317-300-554-300v-354zm1541 1344v312c0 191 229 160 229 31v-396c0-123-229-171-229 52zm0-958c0 102-17 362 27 421 64 88 203 42 203-57v-396c0-129-229-160-229 31zm2843-927H1207l1013-382c87-34 161-62 251-93 254-88 517-203 773-289 88-30 162-62 250-94l515-193c246-89 225-78 336 255l267 795zM-1 1859v490c0 173 249 42 444 160 294 179 294 583 0 762-195 119-444-13-444 160v490c0 221 164 419 363 491 76 27 145 40 251 40h4083c203 0 324-43 439-134 86-68 196-237 196-387v-500c0-95-98-105-198-104-124 1-164-10-247-55-197-108-290-378-153-615 199-344 597-98 597-309v-500c0-133-90-294-185-378-42-37-120-81-176-105-146-61-84 23-146-135-68-172-220-644-288-847-55-165-72-266-218-344-158-85-291-13-433 40L585 1311c-109 42-245 20-403 160-87 77-185 228-185 388z"
      style={{
        fill: "#626771",
      }}
    />
  </svg>

      <span className="ml-1 mt-1 text-neutral-900 dark:text-neutral-200">
        {memberCount}
      </span>


    </Link>
  );
};

export default PostCardSlots;
