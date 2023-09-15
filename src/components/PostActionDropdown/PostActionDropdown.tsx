import React, { FC, useState } from "react";
import twFocusClass from "utils/twFocusClass";
import NcDropDown from "components/NcDropDown/NcDropDown";
import ModalReportItem from "components/ModalReportItem/ModalReportItem";
import { EventDataType, PostDataType } from "data/types";
import ModalHideAuthor from "./ModalHideAuthor";
import { useHistory } from "react-router";
import { api } from "config/api";

export interface PostActionDropdownProps {
  containerClassName?: string;
  iconClass?: string;
  postData: EventDataType;
  dropdownPositon?: "up" | "down";
}

const PostActionDropdown: FC<PostActionDropdownProps> = ({
  containerClassName = "h-8 w-8 bg-neutral-100 hover:bg-neutral-200 dark:bg-neutral-800 dark:hover:bg-neutral-700",
  iconClass = "h-[18px] w-[18px]",
  dropdownPositon = "down",
  postData,
}) => {
  let actions = [
    {
      id: "copylink",
      name: "Copy link",
      icon: "las la-copy",
    },
    {
      id: "editEvent",
      name: "Edit event",
      icon: "las la-edit",
    },
    {
      id: "reportThisArticle",
      name: "Report this Event",
      icon: "las la-flag",
    },
  ];
  let actions2 = [
    {
      id: "copylink",
      name: "Copy link",
      icon: "las la-copy",
    },
    {
      id: "reportThisArticle",
      name: "Report this Event",
      icon: "las la-flag",
    },
  ];
  //
  let history = useHistory();
  //
  const [user, setUser] = useState(0);
  const [isReporting, setIsReporting] = useState(false);
  const [showModalHideAuthor, setShowModalHideAuthor] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  const openModalReportPost = () => setIsReporting(true);
  const closeModalReportPost = () => setIsReporting(false);

  const openModalHideAuthor = () => setShowModalHideAuthor(true);
  const onCloseModalHideAuthor = () => setShowModalHideAuthor(false);

React.useEffect(()=> {
loadData();
},[])

  const loadData = async()=> {
    let a: any = await localStorage.getItem("@user");
    if (a != undefined) {
      a = JSON.parse(a);
      setUser(a.id);
    }

    console.log("user", user);
    console.log("user", postData.event_user_id);
  }

  
  const hanldeClickDropDown = (item: typeof actions[number]) => {
    if (item.id === "copylink") {
      navigator.clipboard.writeText(`localhost:3000`+window.location.pathname);
      setIsCopied(true);
      setTimeout(() => {
        setIsCopied(false);
      }, 1000);
      return;
    }
    if (item.id === "reportThisArticle") {
      return openModalReportPost();
    }
    if (item.id === "editEvent") {
      console.log("edit");
      history.push(`/edit-event/${postData.id}`)

      return openModalHideAuthor();
    }
    // if (item.id === "commentThisArticle") {
    //   return history.push(postData.href + "#comment");
    // }

    return;
  };

  const renderMenu = () => {
    if (isCopied) {
      actions = actions.map((item) => {
        if (item.id !== "copylink") return item;
        return {
          ...item,
          name: "Link Copied",
        };
      });
    }
    return (
      <NcDropDown
        className={`text-neutral-500 dark:text-neutral-400 flex items-center justify-center rounded-full  ${containerClassName} ${twFocusClass()}`}
        iconClass={iconClass}
        data={postData.event_user_id === user ? actions : actions2}
        panelMenusClass={
          dropdownPositon === "up" ? "origin-bottom-right bottom-0" : undefined
        }
        onClick={hanldeClickDropDown}
      />
    );
  };

  return (
    <div>
      {renderMenu()}

      <ModalReportItem
        show={isReporting}
        id={postData.id}
        onCloseModalReportItem={closeModalReportPost}
      />
      {/* <ModalHideAuthor
        show={showModalHideAuthor}
        auhthor={postData.author}
        onCloseModalHideAuthor={onCloseModalHideAuthor}
      /> */}
    </div>
  );
};

export default PostActionDropdown;
