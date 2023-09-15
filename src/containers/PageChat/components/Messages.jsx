import { doc, getDoc, onSnapshot } from "firebase/firestore";
import React, { useContext, useEffect, useState } from "react";
import { ChatContext } from "../context/ChatContext";
import { db } from "../config/firebase";
import Message from "./Message";
import "../style.scss";
import { AuthContext } from "../context/AuthContext";

const Messages = () => {
  const [messages, setMessages] = useState([]);
  const { data } = useContext(ChatContext);
  const { currentUser } = useContext(AuthContext);
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    setLoader(true);

    loadData();
    console.log("www data", data);

    const unSub = onSnapshot(doc(db, "chats", data.chatId), (doc) => {
      console.log("messsageee data", doc.data());
      if (doc.data().hasOwnProperty('messages')) {
        console.log("here1")
        setMessages(doc.data().messages);
      } else {
        setMessages([]);
        console.log("here2")
      }
    });
    setTimeout(() => {
      setLoader(false);
    }, 2000);
    return () => {
      unSub();
    };
  }, [data.chatId]);

  const loadData = async () => {
    console.log("klmnfklfn", messages, messages.length);
  };

  return (
    <>
      <div className="messages">
        {!loader ? (
          <>
            {messages.length > 0 && (
              <>
                {messages.map((m) => (
                  <Message message={m} key={m.id} />
                ))}
              </>
            )}
          </>
        ) : (
          <div className="flex flex-col justify-center items-center align-center">
            <p className=" justify-center items-center align-center text-center">
              Loading...
            </p>
          </div>
        )}
      </div>
    </>
  );
};

export default Messages;
