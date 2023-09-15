import { useAppDispatch, useAppSelector } from "app/hooks";
import { CommentType, CommentTypee } from "components/CommentCard/CommentCard";
import {
  selectCommentRecentLikeds,
  selectCommentRecentRemoveds,
  removeLikedByPostId,
  addNewLikedByPostId,
} from "app/commentLikes/commentLikes";
import CommentCardLikeReply, {
  CommentCardLikeReplyProps,
} from "components/CommentCardLikeReply/CommentCardLikeReply";
import React, { FC } from "react";
import { likeComment, unlikeComment } from "actions/discussionAction";

export interface CommentCardLikeReplyContainerProps
  extends Pick<CommentCardLikeReplyProps, "onClickReply"> {
  className?: string;
  comment: CommentTypee;
}

const CommentCardLikeReplyContainer: FC<CommentCardLikeReplyContainerProps> = ({
  className = "",
  comment,
  ...args
}) => {
  const {  is_likes, likes_count, id } = comment;

  const recentLikeds = useAppSelector(selectCommentRecentLikeds);
  const recentRemoveds = useAppSelector(selectCommentRecentRemoveds);
  const dispatch = useAppDispatch();

  const isLiked = () => {
    if (recentLikeds.includes(id)) {
      return true;
    }
    if (is_likes != null ) {
      return true;
    }
    return false;
  };

  const getLikeCount = (): number => {
    // Recent Liked
    if (recentLikeds.includes(id)) {
      return likes_count + 1;
    }
    if (is_likes != null && recentRemoveds.includes(id)) {
      return likes_count  - 1;
    }
    return likes_count;
  };

  const handleClickLike = async() => {
    if (isLiked()) {
      dispatch(removeLikedByPostId(id));
      let unlikeCommentRes = await unlikeComment(id);
      console.log("res comment unlike", unlikeCommentRes);
    
    } else {
      let likeCommentRes = await likeComment(id);
      console.log("res comment like", likeCommentRes);
    
      dispatch(addNewLikedByPostId(id));
    }
   
  };

  return (
    <CommentCardLikeReply
      className={className}
      onClickLike={handleClickLike}
      commentId={id}
      isLiked={isLiked()}
      likeCount={getLikeCount()}
      {...args}
    />
  );
};

export default CommentCardLikeReplyContainer;
