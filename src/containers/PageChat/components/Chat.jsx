import React, { useContext } from "react";
import More from "../img/more.png";
import Messages from "./Messages";
import Input from "./Input";
import { ChatContext } from "../context/ChatContext";
import "../style.scss";
import {
  deleteDoc,
  deleteField,
  doc,
  getDoc,
  serverTimestamp,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../config/firebase";
import { AuthContext } from "../context/AuthContext";

const Chat = () => {
  const [active, setActive] = React.useState(false);
  const [msg, setMsg] = React.useState("");
  const [parent, setParent] = React.useState(false);

  const { data } = useContext(ChatContext);
  const { currentUser } = useContext(AuthContext);

  React.useEffect(() => {
    checkBlock();
  });

  const checkBlock = async () => {
    const combinedId =
      currentUser.uid > data.user.uid
        ? currentUser.uid + data.user.uid
        : data.user.uid + currentUser.uid;

    const docRef = doc(db, "blockedUsers", combinedId);

    try {
      const docSnap = await getDoc(docRef);
      let d = docSnap.data();
      console.log("dataaaa", d);
      if (d != undefined) {
        console.log("kkkk", d[`${combinedId}`].blockInfo);
        d = d[`${combinedId}`].blockInfo;
        if (d.parentId === currentUser.uid) {
          setParent(true);
          setMsg("You have blocked this chat");
          console.log("msg", msg);
        } else {
          setParent(false);
          setMsg("You have been blocked by this chat");
          console.log("msg", msg);
        }
        console.log("block", docSnap.data());
      } else {
        setMsg("");
      }
    } catch (error) {
      console.log("err", error);
    }

    console.log("last  msg", msg);
  };

  const deleteChat = async () => {
    const docRef = doc(db, "chats", data.chatId);
    const opt = {
      messages: deleteField(),
    };
    updateDoc(docRef, opt)
      .then(() => {
        console.log("Chat History has been deleted successfully");
      })
      .catch(() => {
        console.log(error);
      });
  };

  const unblockChat = async () => {
    const combinedId =
      currentUser.uid > data.user.uid
        ? currentUser.uid + data.user.uid
        : data.user.uid + currentUser.uid;
    console.log("here id", combinedId);
    try {
      const res = await getDoc(doc(db, "blockedUsers", combinedId));
      console.log("RESSSS", res.exists());
      if (res.exists()) {
        const docRef = doc(db, "blockedUsers", combinedId);
        deleteDoc(docRef)
          .then(() => {
            console.log("Entire Document has been deleted successfully.");
          })
          .catch((error) => {
            console.log(error);
          });
      }
    } catch (err) {}
    checkBlock();
  };

  const blockChat = async () => {
    const combinedId =
      currentUser.uid > data.user.uid
        ? currentUser.uid + data.user.uid
        : data.user.uid + currentUser.uid;
    console.log("here id", currentUser.uid);
    try {
      const res = await getDoc(doc(db, "blockedUsers", currentUser.uid));
      console.log("RESSSS", res.exists());
      if (res.exists()) {
        await updateDoc(doc(db, "blockedUsers", combinedId), {
          [combinedId + ".blockInfo"]: {
            parentId: currentUser.uid,
            childId: data.user.uid,
          },
          [combinedId + ".date"]: serverTimestamp(),
        });
      } else {
        await setDoc(doc(db, "blockedUsers", combinedId), {});
        await updateDoc(doc(db, "blockedUsers", combinedId), {
          [combinedId + ".blockInfo"]: {
            parentId: currentUser.uid,
            childId: data.user.uid,
          },
          [combinedId + ".date"]: serverTimestamp(),
        });
      }
    } catch (err) {}
  };

  return (
    <div className="chat">
      <div className="chatInfo">
        <span>{data.user?.displayName}</span>
        <div className="chatIcons" onClick={() => setActive(!active)}>
          {/* <img src={Cam} alt="" />
          <img src={Add} alt="" /> */}
          <img src={More} alt="" />
        </div>
      </div>
      {active && (
        <div className="z-40 w-28 h-28 bg-red">
          <div className="w-44">
            <p className="cursor-pointer my-2" >
              Delete Chat
            </p>
            {parent ? (
              <p className="cursor-pointer my-2" >
                Unblock User
              </p>
            ) : (
              <p className="cursor-pointer my-2" >
                Block User
              </p>
            )}
          </div>
        </div>
      )}

      <Messages />
      {msg == "" ? (
        <Input />
      ) : (
        <div className="mb-10">
          <p>{msg}</p>
        </div>
      )}
    </div>
  );
};

export default Chat;
