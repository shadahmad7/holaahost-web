import React, { FC, useState } from "react";
import { GroupDataType, PostDataType } from "data/types";
import { Link } from "react-router-dom";

import PostCardCommentBtn from "components/PostCardCommentBtn/PostCardCommentBtn";

import PostCardMembers from "components/PostCardMembers/PostCardMembers";
import { api } from "config/api";




export interface Card11Props {
  className?: string;
  post: GroupDataType;
  ratio?: string;
  itemClass?: string,
  hiddenAuthor?: boolean;
  hiddenCommentOnMobile?:boolean
}

const Card11: FC<Card11Props> = ({
  className = "h-full",
  post,
  itemClass = "px-3 h-8 text-xs",
  hiddenAuthor = false,
  hiddenCommentOnMobile=true,
  ratio = "aspect-w-4 aspect-h-3",
}) => {
  const {  id,
    group_name,
    group_image,
    group_description,
    group_location,
    group_user_id,
    members_count,
    comments_count,
    created_at,
    updated_at } = post;


  const [isHover, setIsHover] = useState(false);

  React.useEffect(()=> {
loadData();
  },[])

  const loadData= async()=> {
    console.log("datatata", post);
  }
  return (

    <Link to={{
      pathname: `/group/${id}`,
      state: { groupId: id },
    }}>
    <div
    
      className={`nc-Card11 cursor-pointer relative flex flex-col group [ nc-box-has-hover ] [ nc-dark-box-bg-has-hover ] ${className}`}
      data-nc-id="Card11"
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
      //
    >
      <div
        className={`block flex-shrink-0 relative w-full rounded-t-xl overflow-hidden ${ratio}`}
      >
        <div>
        <img 
      src={api.imageUrl2+group_image}
      alt="new"
      />
        </div>
      </div>
      <span className="absolute top-3 inset-x-3 z-10">
      </span>

      <div className="p-4 flex flex-col flex-grow space-y-3">
      
          <span className="text-xs font-normal text-neutral-500">{group_location}</span>
      
        <h2 className="nc-card-title block text-base font-semibold text-neutral-900 dark:text-neutral-100 ">
          {/* <Link to={href} className="line-clamp-2" title={title}> */}
            {group_name}
          {/* </Link> */}
        </h2>
      
{/* options */}
        <div
      className={'member-count'}
     
      >
      <PostCardCommentBtn 
      href="#"
      commentCount={comments_count}
      className={`${
        hiddenCommentOnMobile ? "hidden sm:flex" : "flex"
      }  ${itemClass}`}
      />
      
      <PostCardMembers  
      href="#"
      memberCount={members_count}
      className={`${
        hiddenCommentOnMobile ? "hidden sm:flex" : "flex"
      }  ${itemClass}`}
      />
     
    </div>

       
      </div>
    </div>
    </Link>
  );
};

export default Card11;
