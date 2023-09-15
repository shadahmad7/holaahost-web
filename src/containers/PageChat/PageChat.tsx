import React, { FC } from "react";
import { PostDataType } from "data/types";
import NcImage from "components/NcImage/NcImage";
import ButtonSecondary from "components/Button/ButtonSecondary";
import Card5 from "components/Card5/Card5";

export interface PageChatProps {
  className?: string;
}

const PageChat: FC<PageChatProps> = ({ className = "" }) => {
  const [active, setActive] = React.useState(1);
  const users = [
    {
      id: 1,
      name: "Shad Ahmad",
      last: "Mon",
      pic: "https://indiehoy.com/wp-content/uploads/2022/06/spider-man.jpg",
    },
    {
      id: 2,
      name: "Shad Ahmad",
      last: "Mon",
      pic: "https://indiehoy.com/wp-content/uploads/2022/06/spider-man.jpg",
    },
    {
      id: 3,
      name: "Shad Ahmad",
      last: "Mon",
      pic: "https://indiehoy.com/wp-content/uploads/2022/06/spider-man.jpg",
    },
    {
      id: 4,
      name: "Shad Ahmad",
      last: "Mon",
      pic: "https://indiehoy.com/wp-content/uploads/2022/06/spider-man.jpg",
    },
    {
      id: 5,
      name: "Shad Ahmad",
      last: "Mon",
      pic: "https://indiehoy.com/wp-content/uploads/2022/06/spider-man.jpg",
    },
    {
      id: 6,
      name: "Shad Ahmad",
      last: "Mon",
      pic: "https://indiehoy.com/wp-content/uploads/2022/06/spider-man.jpg",
    },
    {
      id: 7,
      name: "Shad Ahmad",
      last: "Mon",
      pic: "https://indiehoy.com/wp-content/uploads/2022/06/spider-man.jpg",
    },
    {
      id: 8,
      name: "Shad Ahmad",
      last: "Mon",
      pic: "https://indiehoy.com/wp-content/uploads/2022/06/spider-man.jpg",
    },
    {
      id: 9,
      name: "Shad Ahmad",
      last: "Mon",
      pic: "https://indiehoy.com/wp-content/uploads/2022/06/spider-man.jpg",
    },
    {
      id: 10,
      name: "Shad Ahmad",
      last: "Mon",
      pic: "https://indiehoy.com/wp-content/uploads/2022/06/spider-man.jpg",
    },
    {
      id: 11,
      name: "Shad Ahmad",
      last: "Mon",
      pic: "https://indiehoy.com/wp-content/uploads/2022/06/spider-man.jpg",
    },
    {
      id: 12,
      name: "Shad Ahmad",
      last: "Mon",
      pic: "https://indiehoy.com/wp-content/uploads/2022/06/spider-man.jpg",
    },
    {
      id: 13,
      name: "Shad Ahmad",
      last: "Mon",
      pic: "https://indiehoy.com/wp-content/uploads/2022/06/spider-man.jpg",
    },
    {
      id: 14,
      name: "Shad Ahmad",
      last: "Mon",
      pic: "https://indiehoy.com/wp-content/uploads/2022/06/spider-man.jpg",
    },
    {
      id: 15,
      name: "Shad Ahmad",
      last: "Mon",
      pic: "https://indiehoy.com/wp-content/uploads/2022/06/spider-man.jpg",
    },
    {
      id: 16,
      name: "Shad Ahmad",
      last: "Mon",
      pic: "https://indiehoy.com/wp-content/uploads/2022/06/spider-man.jpg",
    },
  ];

  return (
    <div className="aspect-h-8 aspect-w-8 sm:aspect-w-10 lg:aspect-w-16 ">
      <div className="flex mb-4 my-5 justify-between">
        {/* Chat Section */}
        <div className="w-1/5 px-5 overflow-y-scroll">
          <div className="mt-10">
            <h1 className="text-sm text-slate-500	">Recent Chats</h1>
          </div>
          <div>
            {users.map((user, index) => (
              <div
                className="flex cursor-pointer chat-card"
                style={{
                  background: active === user.id ? "#80e4ed" : "",
                  borderRadius: active === user.id ? "10px" : "",
                  paddingInline: "10px",
                }}
                onClick={() => setActive(user.id)}
              >
                <div className="flex items-center">
                  <img src={user.pic} className="chat-image" />
                  <h1 className="ml-5 ">{user.name}</h1>
                </div>
                <p className="text-xs">{user.last}</p>
              </div>
            ))}
          </div>
        </div>
        {/* Chat Section */}

        {/* Chat Details */}
        <div className="w-4/5">
          <div className="chat-area">
            {/* Section-header */}
            <div className=" flex  items-center justify-between chat-section-header">
              <div className="flex items-center">
                <img
                  src={
                    "https://indiehoy.com/wp-content/uploads/2022/06/spider-man.jpg"
                  }
                  className="chat-image"
                />
                <h1 className="ml-5 ">Shad Ahmad</h1>
              </div>
              <div>
                <i className="las la-ellipsis-v mx-1  text-2xl  text-black opacity-100"></i>
              </div>
            </div>
            {/* Section-header */}
            {/* Section-tools */}
            <div>
              <div className="flex absolute bottom-10 z-40	  right-10  items-center">
                <div className="">
                  <i className="las la-smile ml-2  text-3xl absolute l-0 mt-2  text-black opacity-100"></i>
                  <input className="msg-input" placeholder="Type a message" />
                </div>
                <i className="las la-paper-plane mx-1 cursor-pointer	 text-4xl  text-black opacity-100"></i>
              </div>
            </div>
            {/* Section-tools */}
          </div>
        </div>
        {/* Chat Details */}
      </div>
    </div>
  );
};

export default PageChat;
