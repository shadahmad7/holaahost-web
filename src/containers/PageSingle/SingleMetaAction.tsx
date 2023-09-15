import React, { FC } from "react";
import PostActionDropdown from "components/PostActionDropdown/PostActionDropdown";
import PostCardLikeAndComment from "components/PostCardLikeAndComment/PostCardLikeAndComment";
import SocialsShare from "components/SocialsShare/SocialsShare";
import BookmarkContainer from "containers/BookmarkContainer/BookmarkContainer";
import { EventDataType, PostDataType } from "data/types";
import {
  FacebookIcon,
  FacebookShareButton,
  TwitterIcon,
  TwitterShareButton,
  WhatsappIcon,
  WhatsappShareButton,
} from "react-share";
import BookmarkContainer2 from "containers/BookmarkContainer2/BookmarkContainer2";

export interface SingleMetaActionProps {
  className?: string;
  meta: EventDataType;
}

let message: any = "This is demo ";
const SingleMetaAction: FC<SingleMetaActionProps> = ({
  className = "mt-5 sm:mt-8",
  meta,
}) => {
  const { id, is_saved } = meta;

  return (
    <div className={`nc-SingleMetaAction ${className}`}>
      <div className="flex flex-col space-y-4 mt-auto sm:flex-row sm:space-x-3 sm:space-y-0 sm:items-center sm:justify-between">
        {/* <PostCardLikeAndComment
          itemClass="px-4 h-9 text-sm"
          hiddenCommentOnMobile={false}
          postData={meta}
        /> */}

        <div className="flex space-x-3 items-center sm:space-x-4">
          <FacebookShareButton
            quote={message}
            hashtag="#party"
            url={"https://www.facebook.com/"}
            className="w-10 h-10 flex items-center"
          >
            <FacebookIcon size={40} round={true} />
          </FacebookShareButton>
          <TwitterShareButton
            title={message}
            via={"web"}
            hashtags={["party", "gaming"]}
            url={"https://www.twitter.com/"}
            className="w-10 h-10 flex items-center"
          >
            <TwitterIcon size={40} round={true} />
          </TwitterShareButton>
          <WhatsappShareButton
            title={message}
            separator={"hello"}
            url={"https://web.whatsapp.com/"}
            className="w-10 h-10 flex items-center"
          >
            <WhatsappIcon size={40} round={true} />
          </WhatsappShareButton>
          <div className="border-l border-neutral-300 dark:border-neutral-700 h-6"></div>
          <div
            className={`flex items-center space-x-2 text-xs text-neutral-700 dark:text-neutral-200 `}
          >
            <BookmarkContainer2
          initBookmarked={is_saved ? true : false}
          postId={String(id)}
              containerClassName="h-9 w-9 bg-neutral-100 hover:bg-neutral-200 dark:bg-neutral-800 dark:hover:bg-neutral-700"
              iconClass="h-5 w-5"
            />
            <PostActionDropdown
              containerClassName="h-9 w-9 bg-neutral-100 hover:bg-neutral-200 dark:bg-neutral-800 dark:hover:bg-neutral-700"
              iconClass="h-5 w-5"
              postData={meta}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleMetaAction;
