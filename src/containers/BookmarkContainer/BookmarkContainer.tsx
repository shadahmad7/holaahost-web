import NcBookmark, { NcBookmarkProps } from "components/NcBookmark/NcBookmark";
import React from "react";
import { useAppSelector, useAppDispatch } from "app/hooks";
import {
  addNewSavedByPostId,
  removeSavedByPostId,
  selectRecentSaveds,
  selectRecentRemoveds,
} from "app/bookmarks/bookmarksSlice";
import { addBookmark, removeBookmark } from "actions/groupsAction";

export type BookmarkContainerProps = Omit<NcBookmarkProps, "isBookmarked"> & {
  initBookmarked: boolean;
};

const BookmarkContainer: React.FC<BookmarkContainerProps> = (props) => {
  const { postId, initBookmarked } = props;
  const recentSaveds = useAppSelector(selectRecentSaveds);
  const recentRemoveds = useAppSelector(selectRecentRemoveds);
  const dispatch = useAppDispatch();
  const isBookmarked = () => {
    if (recentSaveds.includes(postId)) {
      return true;
    }
    if (initBookmarked && !recentRemoveds.includes(postId)) {
      return true;
    }
    return false;
  };

  const handleClickBookmark = async () => {
    if (isBookmarked()) {
      let a: any = await localStorage.getItem("@user");
      if (a === null) {
        window.location.href = "/login";
      } else {
        let bookMarkRemove = await removeBookmark(postId);
        console.log("unsaved", bookMarkRemove);
        dispatch(removeSavedByPostId(postId));
      }
    } else {
      let a: any = await localStorage.getItem("@user");
      if (a === null) {
        window.location.href = "/login";
      } else {
        let bookMarkAdd = await addBookmark(postId);
        console.log("saved", bookMarkAdd);

        dispatch(addNewSavedByPostId(postId));
      }
    }
  };

  return (
    <NcBookmark
      onClick={handleClickBookmark}
      isBookmarked={isBookmarked()}
      {...props}
    />
  );
};

export default BookmarkContainer;
