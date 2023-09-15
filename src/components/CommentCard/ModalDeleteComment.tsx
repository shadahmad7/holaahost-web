import React, { FC, useEffect, useRef } from "react";
import NcModal from "components/NcModal/NcModal";
import { CommentType, CommentTypee } from "./CommentCard";
import ButtonPrimary from "components/Button/ButtonPrimary";
import ButtonSecondary from "components/Button/ButtonSecondary";
import { deleteComment } from "actions/discussionAction";

export interface ModalDeleteCommentProps {
  commentId: CommentTypee["id"];
  show: boolean;
  update:boolean;
  onCloseModalDeleteComment: () => void;
}

const ModalDeleteComment: FC<ModalDeleteCommentProps> = ({
  commentId,
  show,
 
  onCloseModalDeleteComment,
}) => {
  const textareaRef = useRef(null);

  const handleClickSubmitForm = async() => {
    let deleteCommenttRes = await deleteComment(commentId);
    console.log("deleted", deleteCommenttRes) 
    onCloseModalDeleteComment();
    window.localStorage.setItem("isThisInLocalStorage", "true");
    window.dispatchEvent(new Event("storage"));
  };

  useEffect(() => {
    if (show) {
      setTimeout(() => {
        const element: HTMLTextAreaElement | null = textareaRef.current;
        if (element) {
          (element as HTMLTextAreaElement).focus();
        }
      }, 400);
    }
  }, [show]);

  const renderContent = () => {
    return (
    <>
        <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-200">
          Delete comment
        </h3>
        <span className="text-sm">
          Are you sure you want to delete this comment? You cannot undo this
          action.
        </span>
        <div className="mt-4 space-x-3">
          <ButtonPrimary onClick={handleClickSubmitForm} >
            Delete
          </ButtonPrimary>
          <ButtonSecondary type="button" onClick={onCloseModalDeleteComment}>
            Cancel
          </ButtonSecondary>
        </div>
        </>
    );
  };

  const renderTrigger = () => {
    return null;
  };

  return (
    <NcModal
      isOpenProp={show}
      onCloseModal={onCloseModalDeleteComment}
      contentExtraClass="max-w-screen-sm"
      renderContent={renderContent}
      renderTrigger={renderTrigger}
      modalTitle=""
    />
  );
};

export default ModalDeleteComment;
