import React, { FC, useEffect, useRef } from "react";
import NcModal from "components/NcModal/NcModal";
import SingleCommentForm from "containers/PageSingle/SingleCommentForm";
import { CommentType, CommentTypee } from "./CommentCard";
import { updateComment, updateCommentReply } from "actions/discussionAction";

export interface ModalEditCommentProps {
  comment: CommentTypee;
  show: boolean;
  onCloseModalEditComment: () => void;
}

const ModalEditComment: FC<ModalEditCommentProps> = ({
  comment,
  show,
  onCloseModalEditComment,
}) => {
  const textareaRef = useRef(null);

  useEffect(() => {
    if (show) {
      setTimeout(() => {
        const element: HTMLTextAreaElement | null = textareaRef.current;
        if (element) {
          (element as HTMLTextAreaElement).focus();
          (element as HTMLTextAreaElement).setSelectionRange(
            (element as HTMLTextAreaElement).value.length,
            (element as HTMLTextAreaElement).value.length
          );
        }
      }, 400);
    }
  }, [show]);

  const updateComm = async () => {
    console.log("comment update params",  comment?.id,textareaRef.current.value,comment?.group_id);
    if (comment.hasOwnProperty("parent_comment_id")) {
      let updateCommentRes = await updateCommentReply(
        comment?.id,
        textareaRef.current.value,
        comment?.group_id
      );
      console.log("ressss add reply", updateCommentRes);
      window.localStorage.setItem("isThisInLocalStorage", "true");
      window.dispatchEvent(new Event("storage"));
    } else {
      let updateCommentRes = await updateComment(
        comment?.id,
        textareaRef.current.value,
        comment?.group.id
      );
      console.log("ressss add reply", updateCommentRes);
      window.localStorage.setItem("isThisInLocalStorage", "true");
      window.dispatchEvent(new Event("storage"));
    }
  };

  const renderContent = () => {
    return (
      <SingleCommentForm
        className="mt-0"
        onClickCancel={onCloseModalEditComment}
        onClickSubmit={() => updateComm()}
        defaultValue={comment.comment}
        textareaRef={textareaRef}
        rows={8}
        children={comment.comment}
      />
    );
  };

  const renderTrigger = () => {
    return null;
  };

  return (
    <NcModal
      isOpenProp={show}
      onCloseModal={onCloseModalEditComment}
      contentExtraClass="max-w-screen-md"
      renderContent={renderContent}
      renderTrigger={renderTrigger}
      modalTitle="Editing comment"
    />
  );
};

export default ModalEditComment;
