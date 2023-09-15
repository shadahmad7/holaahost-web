import React, { FC, useRef, useState } from "react";
import Avatar from "components/Avatar/Avatar";
import NcDropDown from "components/NcDropDown/NcDropDown";
import CommentCardLikeReplyContainer from "containers/CommentCardLikeReplyContainer/CommentCardLikeReplyContainer";
import { PostAuthorType } from "data/types";
import { Link } from "react-router-dom";
import twFocusClass from "utils/twFocusClass";
import SingleCommentForm from "containers/PageSingle/SingleCommentForm";
import ModalEditComment from "./ModalEditComment";
import ModalDeleteComment from "./ModalDeleteComment";
import ModalReportItem from "components/ModalReportItem/ModalReportItem";
import { api } from "config/api";
import moment from "moment";
import {
  addComment,
  addCommentReply,
  deleteComment,
} from "actions/discussionAction";

export interface CommentType {
  id: number;
  author: PostAuthorType;
  date: string;
  content: string;
  parentId: number | null;
  children?: CommentType[];
  like: {
    count: number;
    isLiked: boolean;
  };
}
export interface CommentTypee {
  id: number;
  parent_comment_id: number;
  comment: string;
  user_id: number;
  group_id: number;
  created_at: string;
  updated_at: string;
  likes_count: number;
  replies: [];
  users: {};
  likes: [];
  group: {};
  is_likes: {};
}

export interface CommentCardProps {
  className?: string;
  comm: CommentTypee;
  size?: "large" | "normal";
}

const CommentCard: FC<CommentCardProps> = ({
  className = "",
  comm,
  size = "large",
}) => {
  const {
    id,
    parent_comment_id,
    comment,
    user_id,
    group_id,
    created_at,
    updated_at,
    likes_count,
    replies,
    users,
    likes,
    group,
    is_likes,
  } = comm;

  let actions = [
    { id: "edit", name: "Edit", icon: "las la-edit" },
    { id: "reply", name: "Reply", icon: "las la-reply" },
    { id: "delete", name: "Delete", icon: "las la-trash-alt" },
  ];

  let actions2 =  [
    { id: "reply", name: "Reply", icon: "las la-reply" },
     { id: "report", name: "Report abuse", icon: "las la-flag" },
   ];
  

  const textareaRef = useRef(null);
  const [isReplying, setIsReplying] = useState(false);
  const [isEditting, setIsEditting] = useState(false);
  const [isReporting, setIsReporting] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [user, setUser] = useState(false);

  const [commentText, setCommentText] = useState("");

React.useEffect(()=>{

},[])



  const openReplyForm = () => {
    setIsReplying(true);
    setTimeout(() => {
      textareaRef.current && (textareaRef.current as any).focus();
    }, 100);
  };
  const closeReplyForm = () => {
    setIsReplying(false);
  };

  const openModalEditComment = () => setIsEditting(true);
  const closeModalEditComment = () => setIsEditting(false);

  const openModalReportComment = () => setIsReporting(true);
  const closeModalReportComment = () => setIsReporting(false);

  const openModalDeleteComment = async () => {
    setIsDeleting(true);
  };
  const closeModalDeleteComment = () => setIsDeleting(false);

 const checkModal = async()=> {
  var b:any =  localStorage.getItem("@user");
  b= JSON.parse(b);
  console.log("ids", b.id , user_id)
  if(user_id === b.id){
    setUser(true);
  }
  console.log("ids", b.id , user_id,user)
 
 }

  const hanldeClickDropDown = (item: typeof actions[number]) => {
    
    switch (item.id) {
      case "reply":
        return openReplyForm();
      case "edit":
        return openModalEditComment();
      case "report":
        return openModalReportComment();
      case "delete":
        return openModalDeleteComment();
      default:
        return openReplyForm();
        break;
    }
    return;
  };

  const createComment = async () => {
    console.log("comment params", textareaRef.current.value, group.id);
    let createCommentReplyRes = await addCommentReply(
      id,
      textareaRef.current.value,
      group.id
    );
    console.log("ressss add reply", createCommentReplyRes);
    window.localStorage.setItem("isThisInLocalStorage", "true");
    window.dispatchEvent(new Event("storage"));
  };

  const renderCommentForm = () => {
    return (
      <SingleCommentForm
        textareaRef={textareaRef}
        onClickSubmit={() => {
          createComment();
        }}
        onClickCancel={closeReplyForm}
        className="flex-grow"
        commentId={id}
      />
    );
  };

  return (
    <>
      <div
        className={`nc-CommentCard my-4 flex ${className}`}
        data-nc-id="CommentCard"
        data-comment-id={id}
        data-comment-parent-id={parent_comment_id}
      >
        <Avatar
          imgUrl={api.imageUrl2 + users?.photoUrl}
          userName={users?.name}
          sizeClass={`h-6 w-6 text-base ${
            size === "large" ? "sm:text-lg sm:h-8 sm:w-8" : ""
          }`}
          radius="rounded-full"
          containerClassName="mt-4"
        />
        <div className="flex-grow flex flex-col p-4 ml-2 text-sm border border-neutral-200 rounded-xl sm:ml-3 sm:text-base dark:border-neutral-700">
          {/* AUTHOR INFOR */}
          <div className="relative flex items-center pr-6">
            <div onClick={()=> checkModal()} className="absolute -right-3 -top-3">
              <NcDropDown
                className={`p-2 text-neutral-500 flex items-center justify-center rounded-lg hover:text-neutral-800 dark:hover:text-neutral-200 sm:hover:bg-neutral-100 dark:hover:bg-neutral-800 ${twFocusClass()}`}
                data={user ? actions : actions2}
                onClick={hanldeClickDropDown}
              />
            </div>
            <Link
              className="flex-shrink-0 font-semibold text-neutral-800 dark:text-neutral-100"
              to={"/"}
            >
              {users?.name}
            </Link>
            <span className="mx-2">·</span>
            <span className="text-neutral-500 dark:text-neutral-400 text-xs line-clamp-1 sm:text-sm">
              {moment(created_at).format("YYYY-MM-DD HH:mm")}
            </span>
          </div>

          {/* CONTENT */}
          <span className="block text-neutral-700 mt-2 mb-3 sm:mt-3 sm:mb-4 dark:text-neutral-300">
            {comment}
          </span>

          {/* ACTION LIKE REPLY */}
          {isReplying ? (
            renderCommentForm()
          ) : (
            <CommentCardLikeReplyContainer
              onClickReply={openReplyForm}
              comment={comm}
            />
          )}
        </div>
      </div>


      <ModalEditComment
        show={isEditting}
        comment={comm}
        onCloseModalEditComment={closeModalEditComment}
      />
     
      <ModalReportItem
        show={isReporting}
        id={comm.id}
        onCloseModalReportItem={closeModalReportComment}
      />
 
      <ModalDeleteComment
        show={isDeleting}
        commentId={comm.id}
        onCloseModalDeleteComment={closeModalDeleteComment}
      />

    </>
  );
};

export default CommentCard;
