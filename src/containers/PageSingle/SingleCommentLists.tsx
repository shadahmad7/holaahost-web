import React, { FC } from "react";
import ButtonPrimary from "components/Button/ButtonPrimary";
import CommentCard, { CommentType, CommentTypee } from "components/CommentCard/CommentCard";

export interface SingleCommentListsProps {
  commentss: CommentTypee[];
  comments: CommentType[];
  
}

const SingleCommentLists: FC<SingleCommentListsProps> = ({ comments,commentss }) => {
  React.useEffect(()=>{
loadAll();

  },[])


  const loadAll =()=> {
console.log("commments heree", commentss);
console.log("commments 2 heree", comments);
  }


  let cmtLv1 = commentss.filter((item) => !item.parent_comment_id);

  const renderCommentItemChild = (comment: CommentTypee) => {
    return (
      <li  key={comment.id}>
        <CommentCard size="normal"  comm={comment} />
        {/* {comment.children && (
          <ul className="pl-4 mt-5 space-y-5 md:pl-9">
            {comment.children.slice(0,2).map(renderCommentItemChild)}
          </ul>
        )} */}
      </li>
    );
  };

  const renderCommentItem = (comment: CommentTypee) => {
    return (
      <li key={comment.id}>
        <CommentCard comm={comment} />
        {comment.replies && (
          <ul className="pl-4 my-5 space-y-5 md:pl-11">
            {comment.replies.slice(0,2).map(renderCommentItemChild)}
          </ul>
        )}
      </li>
    );
  };

  return (
    <ul className="nc-SingleCommentLists space-y-5">
      {cmtLv1.map(renderCommentItem)}
   
    </ul>
  );
};

export default SingleCommentLists;
