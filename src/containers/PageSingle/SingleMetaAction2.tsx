import React, { FC } from "react";
import BookmarkContainer from "containers/BookmarkContainer/BookmarkContainer";
import { GroupHeaderType} from "data/types";
import PostActionDropdown2 from "components/PostActionDropdown/PostActionDropdown2";
import {
  FacebookIcon,
  FacebookShareButton,
  TwitterIcon,
  TwitterShareButton,
  WhatsappIcon,
  WhatsappShareButton,
} from "react-share";

let message: string | undefined ;
export interface SingleMetaAction2Props {
  className?: string;
  meta: GroupHeaderType;
}

const SingleMetaAction2: FC<SingleMetaAction2Props> = ({
  className = "",
  meta,
}) => {
  const {  id,
    group_name,
    group_location,
    group_user_id,
    created_at,
    admin,
    is_member,
    is_saved } = meta;


  React.useEffect(()=> {
loadData();
  },[])

const loadData =async()=> {
message="AWS Basics";
  console.log("metaaaa", meta);
}

  return (
    <div className={`nc-SingleMetaAction2 ${className}`}>
      <div className="flex flex-row space-x-2.5 items-center">
        {/* <PostCardLikeAndComment
          itemClass="px-4 h-9 text-sm"
          hiddenCommentOnMobile
          postData={meta}
          className="!space-x-2.5"
        /> */}
       

        <BookmarkContainer
          initBookmarked={is_saved ? true : false}
          postId={String(id)}
          containerClassName="h-9 w-9 bg-neutral-100 hover:bg-neutral-200 dark:bg-neutral-800 dark:hover:bg-neutral-700 dark:text-neutral-200"
          iconClass="h-5 w-5"
        />

        {/* <NcDropDown
          className="flex-shrink-0 flex items-center justify-center focus:outline-none h-9 w-9 bg-neutral-100 hover:bg-neutral-200 dark:bg-neutral-800 dark:hover:bg-neutral-700 text-neutral-700 dark:text-neutral-200 rounded-full"
          renderTrigger={() => (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
              />
            </svg>
          )}
          onClick={() => {}}
          data={SOCIALS_DATA}
        /> */}
        
        <PostActionDropdown2
          containerClassName="h-9 w-9 bg-neutral-100 hover:bg-neutral-200 dark:bg-neutral-800 dark:hover:bg-neutral-700"
          iconClass="h-5 w-5"
          postData={meta}
        />


<FacebookShareButton quote={message} hashtag="#aws" url={"https://www.facebook.com/"}	className="w-10 h-10 flex items-center">
<FacebookIcon size={40} round={true} />
</FacebookShareButton>
<TwitterShareButton title={message} via={"web"} hashtags={["aws","amazon"]} url={"https://www.twitter.com/"}	className="w-10 h-10 flex items-center">
<TwitterIcon size={40} round={true} />
</TwitterShareButton>
<WhatsappShareButton title={message} separator={"hello"} url={"https://web.whatsapp.com/"}	className="w-10 h-10 flex items-center">
<WhatsappIcon size={40} round={true} />
</WhatsappShareButton>


      </div>
    </div>
  );
};

export default SingleMetaAction2;
