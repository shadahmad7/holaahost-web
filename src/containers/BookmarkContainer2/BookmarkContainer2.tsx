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
import { addBookmarkEvent, removeBookmarkEvent } from "actions/eventAction";

export type BookmarkContainer2Props = Omit<NcBookmarkProps, "isBookmarked"> & {
  initBookmarked: boolean;
};

const BookmarkContainer2: React.FC<BookmarkContainer2Props> = (props) => {
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
      let b: any = localStorage.getItem("@user");
      if (b === null) {
        window.location.href = "/login";
      } else {
        let bookMarkRemove = await removeBookmarkEvent(postId);
        console.log("unsaved", bookMarkRemove);
        window.localStorage.setItem("isThisInLocalStorage2", "true");
        window.dispatchEvent(new Event("storage2"));
        dispatch(removeSavedByPostId(postId));
      }
    } else {
      let b: any = localStorage.getItem("@user");
      if (b === null) {
        window.location.href = "/login";
      } else {
        let bookMarkAdd = await addBookmarkEvent(postId);
        console.log("saved", bookMarkAdd);
        window.localStorage.setItem("isThisInLocalStorage2", "true");
        window.dispatchEvent(new Event("storage2"));

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

export default BookmarkContainer2;
