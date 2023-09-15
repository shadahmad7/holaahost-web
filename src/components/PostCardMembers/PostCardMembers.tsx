import { PostDataType } from "data/types";
import React, { FC } from "react";
import { Link } from "react-router-dom";
import twFocusClass from "utils/twFocusClass";

export interface PostCardMembersProps {
  className?: string;
  href: PostDataType["href"];
  memberCount?: PostDataType["memberCount"];
}

const PostCardMembers: FC<PostCardMembersProps> = ({
  className = "flex px-3 h-8 text-xs",
  href,
  memberCount,
}) => {
  return (
    <Link
      to={href + "#members"}
      className={`nc-PostCardCommentBtn relative items-center min-w-[68px]  text-neutral-6000 bg-neutral-50 transition-colors dark:text-neutral-200 dark:bg-neutral-800 hover:bg-teal-50 dark:hover:bg-teal-100 hover:text-teal-600 dark:hover:text-teal-500 ${className} ${twFocusClass()}`}
      title="Members"
      data-nc-id="PostCardCommentBtn"
    >

<svg xmlns="http://www.w3.org/2000/svg" 
width="18" height="18"
 viewBox="0 0 24 24"
  strokeWidth="2" 
  stroke="currentColor" 
  fill="none" strokeLinecap="round" strokeLinejoin="round">
  <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
  <circle cx="9" cy="7" r="4"/>
  <path d="M3 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2"/>
  <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
  <path d="M21 21v-2a4 4 0 0 0 -3 -3.85"/>
</svg>

      <span className="ml-1 text-neutral-900 dark:text-neutral-200">
        {memberCount}
      </span>


    </Link>
  );
};

export default PostCardMembers;
