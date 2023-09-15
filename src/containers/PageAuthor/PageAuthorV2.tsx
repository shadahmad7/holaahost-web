import React, { FC,  useRef, useState } from "react";
import { GroupHeaderType } from "data/types";
import ButtonPrimary from "components/Button/ButtonPrimary";
import Nav from "components/Nav/Nav";
import NavItem from "components/NavItem/NavItem";

import { Helmet } from "react-helmet";

import { SINGLE } from "data/single";
import SingleCommentForm from "containers/PageSingle/SingleCommentForm";
import SingleCommentLists from "containers/PageSingle/SingleCommentLists";
import FooterCard from "components/FooterCard/FooterCard";
import SingleHeader2 from "containers/PageSingle/SingleHeader2";
import { Link, useHistory, useLocation} from "react-router-dom";
import SingleRelatedPosts2 from "containers/PageSingle/SingleRelatedPosts2";
import Card5 from "components/Card5/Card5";
import { getGroupById } from "actions/groupsAction";
import { createBlog, getAllBlogs } from "actions/blogsAction";
import { api } from "config/api";
import { addComment, getAllComments } from "actions/discussionAction";
import { getAllMembers, removeMember } from "actions/membersAction";
import JoditEditor from "jodit-react";
import Input from "components/Input/Input";
import RemoveMember from "./RemoveMember";

let detail: GroupHeaderType;

export interface LocationState {
  from: {
    pathname: string;
    state: any;
  };
}

export interface PageAuthorV2Props {
  className?: string;
}

const TABS = ["Info", "Blogs", "Members", "Discussions"];


const PageAuthorV2: FC<PageAuthorV2Props> = ({ className = "" }) => {
  const [tabActive, setTabActive] = useState<string>(TABS[0]);
  const location = useLocation<LocationState>();

  const textareaRef = useRef(null);
const history = useHistory();
  const [active, setActive] = React.useState(false);
  const [blogsData, setBlogsData] = React.useState([]);
  const [details, setDetails] = React.useState({});
  const [groupId, setGroupId] = React.useState("");

  const [membersData, setMembersData] = React.useState([]);
  const [commentsData, setCommentsData] = React.useState([]);
  const [value, setValue] = useState("");
  const [loader, setLoader] = useState(false);
  const [comment, setComment] = useState("");
  const [logged, setLogged] = useState(false);
  const [user, setUser] = useState(0);

  const editor = useRef(null);
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");

  const [commentCounter, setCommentCounter] = useState(10);
  const [blogCounter, setBlogCounter] = useState(10);
  const [memberCounter, setMemberCounter] = useState(10);

  const onChange = (value: any) => {
    setValue(value);
    if (onChange) {
      onChange(value.toString("html"));
    }
  };

  React.useEffect(() => {
    openModal();
  }, []);

  const openModal = async () => {
    setLoader(true);
    let a: any = await localStorage.getItem("@user");
    console.log("userr", a)

    if (a != null) {
      a = JSON.parse(a);
      setLogged(true);
      setUser(a.id);
    }
    let id: any = window.location.pathname;
    id = id.split("/").pop();
    setGroupId(id);
    console.log("Group id ", id);


    let getGroupByIdRes: any = await getGroupById(id);
    let blogsRes: any = await getAllBlogs(id);
    console.log("Group detail ", getGroupByIdRes);
    blogsRes = blogsRes.data.data;
    setBlogsData([...blogsRes]);
    let discussionsRes: any = await getAllComments(id);
    discussionsRes = discussionsRes.data;
    setCommentsData([...discussionsRes]);
    console.log("comments new", discussionsRes);
    let membersRes: any = await getAllMembers(id);
    membersRes = membersRes.data.data;
    setMembersData([...membersRes]);
    getGroupByIdRes = await getGroupByIdRes.data;
    detail = await getGroupByIdRes;

    window.addEventListener("storage", () => {
      callFunc();
    });
    setDetails(detail);
    setActive(true);
    setLoader(false);
  };

  const callFunc = async () => {
    setLoader(true);
    let a: any = await localStorage.getItem("@user");
    if (a != undefined) {
      a = JSON.parse(a);
      setLogged(true);
      setUser(a.id);
    }
    let id: any = window.location.pathname;
    id = id.split("/").pop();
    setGroupId(id);
    let getGroupByIdRes: any = await getGroupById(id, a.id);
    let blogsRes: any = await getAllBlogs(id);
    console.log("Group detail ", getGroupByIdRes);
    blogsRes = blogsRes.data.data;
    setBlogsData([...blogsRes]);
    let discussionsRes: any = await getAllComments(id);
    discussionsRes = discussionsRes.data;
    setCommentsData([...discussionsRes]);
    console.log("comments new", discussionsRes);
    let membersRes: any = await getAllMembers(id);
    membersRes = membersRes.data.data;
    setMembersData([...membersRes]);
    getGroupByIdRes = await getGroupByIdRes.data;
    detail = await getGroupByIdRes;
    setDetails(detail);
    setActive(true);
    setLoader(false);
  };
  const handleClickTab = (item: string) => {
    if (item === tabActive) {
      return;
    }
    setTabActive(item);
    openModal();
  };
  const createComment = async () => {
    setLoader(true);
    console.log("comment params", textareaRef.current.value, groupId);
    let createCommentRes = await addComment(textareaRef.current.value, groupId);
    console.log("ressss", createCommentRes);
    openModal();
  };

  const fileChangedHandler = (event: any) => {
    let file = event.target.files[0];
   
    setImage(file);
   

    if (file.size > 20e6) {
      window.alert("Please upload a file smaller than 20 MB");
      return false;
    }
  };

  const memberRemove = async (id: any) => {
    let removeMemberRes = await removeMember(id, groupId);
    console.log("removed member", removeMemberRes);
    window.localStorage.setItem("isThisInLocalStorage", "true");
    window.dispatchEvent(new Event("storage"));
  };

  const blogPost = async () => {
    setLoader(true);
    console.log("data", groupId, content, title, image);
    let createBlogRes = await createBlog(groupId, content, title, image);
    console.log("ressss", createBlogRes);
    setContent("");
    openModal();
  };


  const redirectChat = async(res:any) => {
    // res = "Shad Ahmad"
    await localStorage.setItem("@chatUser", JSON.stringify(res));
    history.push("/chats");
  };

  return (
    <div className={`nc-PageAuthorV2  ${className}`} data-nc-id="PageAuthorV2">
      <Helmet>
        <title>HolaaHost</title>
      </Helmet>

      <header className="relative pt-16 z-10 md:py-20 lg:py-28 bg-neutral-900 dark:bg-black">
        {/* SINGLE HEADER */}
        <div className="dark container relative z-10">
          <div className="max-w-screen-md">
            {active && (
              <SingleHeader2
                hiddenDesc
                metaActionStyle="style2"
                pageData={SINGLE}
                headerData={detail}
              />
            )}
          </div>
        </div>

        {/* FEATURED IMAGE */}
        <div className="mt-8 md:mt-0 md:absolute md:top-0 md:right-0 md:bottom-0 md:w-1/2 lg:w-2/5 2xl:w-1/3">
          <div className="hidden md:block absolute top-0 left-0 bottom-0 w-1/5 from-neutral-900 dark:from-black bg-gradient-to-r"></div>
          <img
            className="block w-full h-full object-cover"
            src={api.imageUrl2 + details?.group_image}
            alt=""
          />
        </div>
      </header>
      {/* ====================== END HEADER ====================== */}

      {!loader ? (
        <div className="container event-div py-16 lg:pb-28 lg:pt-20 space-y-16 lg:space-y-28">
          <div className="lg:flex mb-4 justify-between">
            {/* side 2 */}
            {/* filters */}
            <div className="lg:w-1/3 sm:w-full ">
              {/* members */}
              <div className="mx-6 py-5">
                <div className="flex items-center mx-2 mb-8 mt-2  justify-between">
                  <h1 className="text-xl font-semibold">Members</h1>
                  <span
                    onClick={() => setTabActive("Members")}
                    className="text-md underline cursor-pointer"
                  >
                    See all
                  </span>
                </div>

                {membersData.length != 0 ? (
                  <div className=" grid grid-cols-3">
                    {membersData.map((pic, index) => (
                      <div className="mx-2 rounded-3xl  border-2 my-2">
                        <img
                          className="rounded-lg"
                          src={api.imageUrl2 + pic?.photoUrl}
                          alt="img"
                          height="150"
                          width="150"
                        />
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="ml-2">
                    <p>No members found.</p>
                  </div>
                )}
              </div>
              {/* members */}
            </div>
            {/* sidebar ends */}

            {/* side 1 */}

            {/* side 2 */}
            <div className="lg:w-2/3 pb-2 lg:px-5 sm:px-2 sm:w-full ">
              {/* TABS FILTER */}
              <div className="lg:flex lg:mx-20  mb-5 flex-col sm:items-center sm:justify-between sm:flex-row  overflow-x-scroll ">
                <Nav className="sm:space-x-2">
                  {TABS.map((item, index) => (
                    <NavItem
                      key={index}
                      isActive={tabActive === item}
                      onClick={() => handleClickTab(item)}
                    >
                      {item}
                    </NavItem>
                  ))}
                </Nav>
              </div>
              <div className=" lg:mx-20  mb-5 flex-col sm:items-center sm:justify-between sm:flex-row">
                {/* about */}
                {tabActive === "Info" && (
                  <div className="justify-center  pt-2  md:py-2 lg:pb-10 lg:pt-2 ">
                    <h4 className="text-xl text-black font-semibold">
                      what we're about
                    </h4>

                    <div className="text-lg my-5 text-black font-normal">
                      {detail?.group_description}
                    </div>

                    <div className="max-w-screen-md mt-10 mx-auto">
                      <h2 className="text-black text-lg font-semibold">
                        Responses
                      </h2>
                      {/* about */}
                      <SingleCommentForm
                        textareaRef={textareaRef}
                        className=" my-3"
                        onClickSubmit={() => createComment()}
                        onClickCancel={() => (textareaRef.current.value = "")}
                      />
                      <SingleCommentLists
                        commentss={commentsData.slice(0, 1)}
                        comments={SINGLE.comments.slice(0, 1)}
                      />
                      {commentsData.length > 2 && (
                        <ButtonPrimary
                          onClick={() => setTabActive("Discussions")}
                          className="dark:bg-primary-700 w-full"
                        >
                          View Full comments (+{commentsData.length - 2}{" "}
                          comments)
                        </ButtonPrimary>
                      )}
                    </div>
                  </div>
                )}

                {tabActive === "Members" && (
                  <>
                    {/* members */}
                    {logged ? (
                      <div className=" py-5">
                        <div className="flex items-center mb-8 mt-2  justify-between">
                          <h1 className="text-2xl font-semibold">
                            Members (+{membersData.length})
                          </h1>
                        </div>

                        {membersData.length != 0 ? (
                          <div className="sm:w-full">
                            {membersData
                              .slice(0, detail?.is_member ? memberCounter : 6)
                              .filter((x) => x.id != user)
                              .map((mem, index) => (
                                <div
                                  className={`sm:w-full lg:flex items-center justify-between	 relative my-5 lg:px-10 w-full member-card  p-5 group bg-white dark:bg-neutral-800 shadow-2xl rounded-2xl}`}
                                >
                                  <div className="flex  items-center">
                                    <img
                                      className="rounded-full"
                                      src={api.imageUrl2 + mem?.photoUrl}
                                      alt="img"
                                      height="70"
                                      width="70"
                                    />
                                    <div className="ml-10 ">
                                      <h2 className=" lg:text-lg sm:text-xs">{mem?.name}</h2>
                                    </div>
                                  </div>
                                  <div className="px-5 ml-10 flex items-center mx-5">
                                  
                                    <button className="mx-2 member-card-button">
                                      <span className="text-sm text-white" onClick={()=> redirectChat(mem?.name)}>
                                        Chat
                                      </span>
                                    </button>
                                    {detail?.group_user_id == user && (
                                      <div
                                        className="ml-3 cursor-pointer"
                                        onClick={() => memberRemove(mem?.id)}
                                      >
                                        <RemoveMember />
                                      </div>
                                    )}
                                    <>
                                      {detail?.group_user_id == mem?.id && (
                                        <div className="ml-3">
                                          <p>Admin</p>
                                        </div>
                                      )}
                                    </>
                                  </div>

                                </div>
                              ))}
                          </div>
                        ) : (
                          <div className="">
                            <p>No members found.</p>
                          </div>
                        )}

                        {membersData.length > 10 &&
                          membersData.length > memberCounter && (
                            <ButtonPrimary
                              className="dark:bg-primary-700 my-10 w-full"
                              onClick={() =>
                                setMemberCounter(memberCounter + 10)
                              }
                            >
                              View more members (+
                              {membersData.length - memberCounter}members)
                            </ButtonPrimary>
                          )}
                      </div>
                    ) : (
                      <div className=" justify-center pt-5 ">
                        <p className="text-center text-xl bold">
                          Please login to continue
                        </p>
                        <Link to={"/login"}>
                          <ButtonPrimary className="dark:bg-primary-700 my-10 w-full">
                            Login
                          </ButtonPrimary>
                        </Link>
                      </div>
                    )}
                    {/* members */}
                  </>
                )}
                {tabActive === "Discussions" && (
                  <>
                    {logged ? (
                      <>
                        <h2 className="text-black text-lg font-semibold">
                          Responses
                        </h2>
                        {/* about */}

                        {detail?.is_member != null ? (
                          <>
                            <SingleCommentForm
                              className=" my-2"
                              textareaRef={textareaRef}
                              onClickSubmit={() => createComment()}
                              onClickCancel={function (
                                id?: number | undefined
                              ): void {
                                throw new Error("Function not implemented.");
                              }}
                            />

                            <>
                              {commentsData.length != 0 ? (
                                <div className="max-w-screen-md mt-10 mx-auto">
                                  <SingleCommentLists
                                    commentss={commentsData.slice(
                                      0,
                                      commentCounter
                                    )}
                                    comments={SINGLE.comments.slice(0, 4)}
                                  />
                                </div>
                              ) : (
                                <div className="">
                                  <p>No comments found.</p>
                                </div>
                              )}
                            </>
                          </>
                        ) : (
                          <div>
                            <p>Join group to see discussions</p>
                          </div>
                        )}
                        {detail?.is_member != null && (
                          <>
                            {commentsData.length > 10 &&
                              commentsData.length > commentCounter && (
                                <ButtonPrimary
                                  className="dark:bg-primary-700 my-10 w-full"
                                  onClick={() =>
                                    setCommentCounter(commentCounter + 10)
                                  }
                                >
                                  View more comments (+
                                  {commentsData.length - commentCounter}{" "}
                                  comments)
                                </ButtonPrimary>
                              )}
                          </>
                        )}
                      </>
                    ) : (
                      <div className=" justify-center  pt-5 ">
                        <p className="text-center text-xl bold">
                          Please login to continue
                        </p>
                        <Link to={"/login"}>
                          <ButtonPrimary className="dark:bg-primary-700 my-10 w-full">
                            Login
                          </ButtonPrimary>
                        </Link>
                      </div>
                    )}
                  </>
                )}
                {tabActive === "Blogs" && (
                  <div>
                    {detail?.group_user_id === user && (
                      <div className="my-4 border-2 rounded-md px-5 py-4">
                        <div className="my-5">
                          <label className="block">
                            <Input
                              type="text"
                              placeholder="Title"
                              className="mt-1 "
                              onChange={(e) => setTitle(e.target.value)}
                              required
                            />
                          </label>
                        </div>
                        <div className="my-2">
                          <input
                            type="file"
                            name="file"
                            accept="image/png, image/gif, image/jpeg, video/mp4,video/x-m4v,video/*, .mp3,audio/*"
                            onChange={fileChangedHandler}
                          />
                        </div>

                        <JoditEditor
                          ref={editor}
                          value={content}
                          onChange={(newContent) => {
                            setContent(newContent),
                              console.log("contenr", newContent);
                          }}
                        />
                        <div className="w-30">
                          <ButtonPrimary
                            className="col-span-4 w-30 my-10 create-event-button"
                            type="submit"
                            onClick={() => blogPost()}
                          >
                            POST
                          </ButtonPrimary>
                        </div>
                      </div>
                    )}

                    <h2 className="text-3xl pb-10">Blogs</h2>
                    {blogsData.length != 0 ? (
                      <div className=" grid lg:grid-cols-2 sm:grid-cols-1  gap-4  transform  ">
                        {!logged ? (
                          <>
                            {blogsData.slice(0, 2).map((blog, index) => (
                              <Card5
                                className="bg-white dark:bg-neutral-800 shadow-2xl rounded-3xl"
                                key={index}
                                blog={blog}
                              />
                            ))}
                          </>
                        ) : (
                          <>
                            {blogsData
                              .slice(0, detail?.is_member ? blogCounter : 3)
                              .map((blog, index) => (
                                <Card5
                                  className="bg-white dark:bg-neutral-800 shadow-2xl rounded-3xl"
                                  key={index}
                                  blog={blog}
                                />
                              ))}
                          </>
                        )}
                      </div>
                    ) : (
                      <div className="">
                        <p>No blogs found.</p>
                      </div>
                    )}
                    {blogsData.length > 10 &&
                      blogsData.length > blogCounter && (
                        <ButtonPrimary
                          className="dark:bg-primary-700 my-10 w-full"
                          onClick={() => setBlogCounter(blogCounter + 10)}
                        >
                          View more blogs (+{blogsData.length - 10} blogs)
                        </ButtonPrimary>
                      )}
                  </div>
                )}
              </div>
            </div>

            {/* side 2 */}
          </div>
        </div>
      ) : (
        <div className="w-full  lg:px-10 h-full lg:flex rounded-md justify-between  mt-20">
          {/* member section */}
          <div className="member-loader-section-margin lg:w-4/12 sm:px-4  sm:w-full lg:ml-20 lg:pl-20 lg:mx-10 pt-5 animate-pulse flex-row  h-full  ">
            <div className=" lg:flex  justify-between ">
              <div>
                <div className="flex justify-between">
                  <div className="w-20 bg-gray-300 h-6 rounded-md "></div>
                  <div className="flex flex-col space-y-3">
                    <div className="w-16 bg-gray-300 h-6 rounded-md "></div>
                  </div>
                </div>
                <div className="member-loader-section lg:pt-5 ">
                  <div className="flex">
                    <div className="w-32 h-32 mx-1 rounded-xl bg-gray-300   "></div>
                    <div className="w-32 h-32 mx-1 bg-gray-300 rounded-xl "></div>
                    <div className="w-32 h-32 mx-1 bg-gray-300  rounded-xl "></div>
                  </div>
                  <div className="flex lg:mt-2 ">
                    <div className="w-32 h-32 mx-1 bg-gray-300  rounded-xl "></div>
                    <div className="w-32 h-32 mx-1 bg-gray-300  rounded-xl "></div>
                    <div className="w-32 h-32 mx-1 bg-gray-300  rounded-xl "></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* member section */}

          <div className=" lg:w-8/12 sm:w-full  animate-pulse flex-row h-full  ">
            <div className="flex ">
              <div className="w-24 h-10 mx-5 bg-gray-300  rounded-md "></div>
              <div className="w-24 mx-5  bg-gray-300 h-10 rounded-md "></div>
              <div className="w-24  mx-5  bg-gray-300 h-10 rounded-md "></div>
              <div className="w-24 mx-5  bg-gray-300 h-10 rounded-md "></div>
            </div>
            <div className="lg:ml-2 mt-5">
              <div className="lg:w-10/12 sm:w-full my-2 h-24 mx-2  bg-gray-300 rounded-md "></div>
              <div className="lg:w-10/12 sm:w-full my-2 h-24 mx-2  bg-gray-300 rounded-md "></div>
              <div className="lg:w-10/12 sm:w-full my-2 h-24 mx-2  bg-gray-300 rounded-md "></div>
            </div>
          </div>
        </div>
      )}
      {!loader ? (
        <SingleRelatedPosts2
          id={details?.id}
          cat={details?.group_category_id}
        />
      ) : (
        <div className="w-full h-96  flex justify-center  rounded-md mt-20 sm: overflow-x-scroll">
          <div className="flex animate-pulse flex-row items-center h-full mx-20 space-x-5">
            <div className="flex flex-col space-y-3">
              <div className="w-56 bg-gray-300 h-10 my-4 ml-4 rounded-md sm:hidden"></div>
              <div className="flex items-center related-post-loader-mobile">
                <div className=" w-56 bg-gray-300 h-56 mx-4 rounded-xl "></div>
                <div className="w-56 bg-gray-300 h-56 mx-4 rounded-xl "></div>
                <div className="w-56 bg-gray-300 h-56 mx-4 rounded-xl "></div>
                <div className="w-56 bg-gray-300 h-56  mx-4 rounded-xl "></div>
              </div>
            </div>
          </div>
        </div>
      )}
      <FooterCard />
    </div>
  );
};

export default PageAuthorV2;
