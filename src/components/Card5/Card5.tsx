import React, { FC } from "react";
import { Link } from "react-router-dom";
import { BlogDataType } from "data/types";

import parse from "html-react-parser";
import moment from "moment";

export interface Card5Props {
  className?: string;
  blog: BlogDataType[];
}

const Card5: FC<Card5Props> = ({
  blog,
  className = "[ nc-box-has-hover ] [ nc-dark-box-bg-has-hover ] ",
}) => {
  const { id, blog_title, blog_desc, group_id, created_at, updated_at }: any =
    blog;
  return (
    <div
      className={`nc-Card5 relative p-5 group ${className}`}
      data-nc-id="Card5"
    >
      <Link
        to={{
          pathname: `/blog/${id}`,
          state: { blogId: id },
        }}
        className="absolute inset-0 rounded-lg"
      ></Link>
      <h4 className="text-sm">{moment(created_at).format("YYYY-MM-DD hh:mm")}</h4>
      <div className="flex flex-col">
        {/* <CategoryBadgeList categories={categories} /> */}
        <h2
          className="block text-base font-semibold text-neutral-800 dark:text-neutral-300 my-4"
          title={blog_title}
        >
          <Link to={""} className="line-clamp-2 text-xl" title={blog_title}>
            {blog_title}
          </Link>
        </h2>
        <div className="">
          <p className="gradient-text-para">{parse(blog_desc)}</p>
        </div>
        <h2 className="text-xs py-2">by Admin</h2>
      </div>
    </div>
  );
};

export default Card5;
