import React, { ComponentType, FC, useContext, useState } from "react";
import { DEMO_POSTS } from "data/posts";
import { PostAuthorType, PostDataType } from "data/types";
import { DEMO_AUTHORS } from "data/authors";
import Avatar from "components/Avatar/Avatar";
import SocialsList from "components/SocialsList/SocialsList";
import { Helmet } from "react-helmet";

import {
  NavLink,
  Switch,
  Redirect,
  Route,
  useRouteMatch,
} from "react-router-dom";
import DashboardEditProfile from "containers/PageDashboard/DashboardEditProfile";
import DashboardRoot from "containers/PageDashboard/DashboardRoot";
import DashboardSubcription from "containers/PageDashboard/DashboardSubcription";
import DashboardChangePassword from "containers/PageDashboard/DashboardChangePassword";
import DashboardRootEvent from "containers/PageDashboard/DashboardRootEvent";
import {
 
  myProfile,
  
  updateProfilePIc,
} from "actions/profileAction";
import { api } from "config/api";
import { SocialType } from "components/SocialsShare/SocialsShare";
import { toast, ToastContainer } from "react-toastify";
import { doc, setDoc, updateDoc } from "firebase/firestore";
import { db } from "config/firebase.config";


export interface PageProfileProps {
  className?: string;
}

let socialsDemo: SocialType[] = [
  {
    id: "Facebook",
    name: "Facebook",
    icon: "lab la-facebook-square",
    href: "#",
  },
  { id: "Twitter", name: "Twitter", icon: "lab la-twitter", href: "#" },
  { id: "Youtube", name: "Youtube", icon: "lab la-youtube", href: "#" },
  { id: "Instagram", name: "Instagram", icon: "lab la-instagram", href: "#" },
];

const posts: PostDataType[] = DEMO_POSTS.filter((_, i) => i < 12);
const AUTHOR: PostAuthorType = DEMO_AUTHORS[0];
const FILTERS = [
  { name: "Most Recent" },
  { name: "Curated by Admin" },
  { name: "Most Appreciated" },
  { name: "Most Discussed" },
  { name: "Most Viewed" },
];
interface DashboardLocationState {
  "/my-profile"?: {};
  "/edit-profile"?: {};
  "/change-password"?: {};
  "/groups"?: {};
  "/events"?: {};
  "/payments"?: {};
}

interface DashboardPage {
  sPath: keyof DashboardLocationState;
  exact?: boolean;
  component: ComponentType<Object>;
  pageName: string;
}

const subPages: DashboardPage[] = [
 
  {
    sPath: "/edit-profile",
    component: DashboardEditProfile,
    pageName: "Edit Profile",
  },
  {
    sPath: "/change-password",
    component: DashboardChangePassword,
    pageName: "Change Password",
  },
  {
    sPath: "/groups",
    component: DashboardRoot,
    pageName: "Groups",
  },
  {
    sPath: "/events",
    component: DashboardRootEvent,
    pageName: "Events",
  },
  {
    sPath: "/payments",
    component: DashboardSubcription,
    pageName: "Payments",
  },
];

const TABS = ["Groups", "Events", "Saved"];

const PageProfile: FC<PageProfileProps> = ({ className = "" }) => {
  let { path, url } = useRouteMatch();
  const [tabActive, setTabActive] = useState<string>(TABS[0]);
  const [loader, setLoader] = useState(true);
  const [data, setData] = useState({});


  React.useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    let loadProfileRes: any = await myProfile();
    setData(loadProfileRes);
    console.log("res profile", loadProfileRes);

    console.log("data bio", loadProfileRes);
    socialsDemo[0].href = loadProfileRes.facebook_link;
    socialsDemo[1].href = loadProfileRes.twitter;
    socialsDemo[2].href = loadProfileRes.youtube;
    socialsDemo[3].href = loadProfileRes.instagram_link;
    setTimeout(() => {
      setLoader(false);
    }, 2000);
  };
  const handleClickTab = (item: string) => {
    if (item === tabActive) {
      return;
    }
    setTabActive(item);
  };

  const updatePic = async (e: any) => {
    
    console.log("res update pic", e.target.files[0]);
    let action:any = await updateProfilePIc(e.target.files[0]);
    await localStorage.setItem("@user", JSON.stringify({id:action?.data.id, email:action?.data.email, name:action?.data.name, social:action?.data.social,photoUrl:action?.data.photoUrl}));
    let a: any = localStorage.getItem("@firebaseUser");
     a = JSON.parse(a);
     console.log("here id is", a);
     console.log("hssss", action);
    await updateDoc(doc(db, "users", a.user.uid), {
      photoURL: api.imageUrl2+action?.data.photoUrl,
    });


    toast.success("Profile Picture Updated Successfully!", {
      autoClose: 10000,
    });
    loadData();
    console.log("res update pic", action);
  };

  return (
    <>
      {!loader ? (
        <div className={`nc-PageAuthor  ${className}`} data-nc-id="PageAuthor">
          <Helmet>
            <title>HolaaHost</title>
          </Helmet>

          {/* HEADER */}
          <div className="w-screen lg:pt-56 px-2 xl:max-w-screen-2xl mx-auto">
            <div className="relative container mt-20 lg:-mt-48">
              <div className="profile-info bg-white  dark:bg-neutral-900 dark:border dark:border-neutral-700 p-5 lg:p-16 rounded-[40px] shadow-2xl flex flex-col sm:flex-row sm:items-center">
                <div className="relative">
                  <Avatar
                    containerClassName="ring-4 ring-white dark:ring-0 shadow-2xl"
                    imgUrl={data?.photoUrl === null ? "https://cdn-icons-png.flaticon.com/128/149/149071.png" : api.imageUrl2 + data?.photoUrl}
                    sizeClass="w-20 h-20 text-xl lg:text-2xl lg:w-36 lg:h-36"
                    radius="rounded-full"
                  />
                                <ToastContainer />

                  <div className="pic-change-logo   flex  items-center absolute top-4 cursor-pointer right-0 bg-slate-300 p-1 rounded-2xl	 justify-center flex-shrink-0 text-neutral-500 dark:text-neutral-300">
                    <label htmlFor="file" className="cursor-pointer">
                      <svg
                        width="16 "
                        height="16  "
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M12 12C14.7614 12 17 9.76142 17 7C17 4.23858 14.7614 2 12 2C9.23858 2 7 4.23858 7 7C7 9.76142 9.23858 12 12 12Z"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M19.2101 15.74L15.67 19.2801C15.53 19.4201 15.4 19.68 15.37 19.87L15.18 21.22C15.11 21.71 15.45 22.05 15.94 21.98L17.29 21.79C17.48 21.76 17.75 21.63 17.88 21.49L21.42 17.95C22.03 17.34 22.32 16.63 21.42 15.73C20.53 14.84 19.8201 15.13 19.2101 15.74Z"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeMiterlimit="10"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M18.7001 16.25C19.0001 17.33 19.84 18.17 20.92 18.47"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeMiterlimit="10"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M3.40991 22C3.40991 18.13 7.25994 15 11.9999 15C13.0399 15 14.0399 15.15 14.9699 15.43"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      <input
                        type="file"
                        id="file"
                        className="hidden"
                        name="image"
                        accept="image/jpeg,image/jpg,image/png,image/PNG"
                        data-original-title="upload photos"
                        onChange={(e) => updatePic(e)}
                      />
                    </label>
                  </div>
                </div>

                <div className="mt-5 sm:mt-0 sm:ml-8 space-y-4 max-w-lg">
                  <h2 className="sm: flex sm: justify-center	 lg:inline-block text-2xl sm:text-3xl md:text-4xl font-semibold">
                    {data?.name}
                  </h2>
                  <span className="block text-sm text-neutral-6000 dark:text-neutral-300 md:text-base">
                    {data?.bio}
                  </span>
                  <SocialsList socials={socialsDemo} />
                </div>
              </div>
            </div>
          </div>
          {/* ====================== END HEADER ====================== */}

          <div className="flex mx-10 my-10 mt-20 justify-center flex-col space-y-8 xl:space-y-0 xl:flex-row">
            {/* SIDEBAR */}
            <div className="sm:w-full lg:w-3/4">
              <div className="sidebar-profile flex flex-col space-y-8 xl:space-y-0 xl:flex-row">
                {/* SIDEBAR */}

                <div className="flex-shrink-0 max-w-xl xl:w-80 xl:pr-8">
                  <ul className="text-base space-y-1 text-neutral-6000 dark:text-neutral-400">
                    {subPages.map(({ sPath, pageName }, index) => {
                      return (
                        <li key={index}>
                          <NavLink
                            className="flex px-6 py-2.5 font-medium rounded-lg hover:text-neutral-800 hover:bg-neutral-100 dark:hover:bg-neutral-800 dark:hover:text-neutral-100"
                            to={`${url}${sPath}`}
                            activeClassName="bg-neutral-100 dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100"
                          >
                            {pageName}
                          </NavLink>
                        </li>
                      );
                    })}
                    <li>
                      <NavLink
                        className="flex px-6 py-2.5 font-medium rounded-lg hover:text-neutral-800 hover:bg-neutral-100 dark:hover:bg-neutral-800 dark:hover:text-neutral-100"
                        to={"/login"}
                        activeClassName="bg-neutral-100 dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100"
                      >
                        Log out
                      </NavLink>
                    </li>
                  </ul>
                </div>
                <div className="border border-neutral-100 dark:border-neutral-800 md:hidden"></div>
                <div className="flex-grow">
                  <Switch>
                    {subPages.map(({ component, sPath, exact }, index) => {
                      return (
                        <Route
                          key={index}
                          exact={exact}
                          component={component}
                          path={!!sPath ? `${path}${sPath}` : path}
                        />
                      );
                    })}
                    <Redirect to={path + "/my-profile"} />
                  </Switch>
                </div>
              </div>
            </div>

            {/* SIDEBAR */}
          </div>
        </div>
      ) : (
        <div className="sm:w-full justify-center items-center">
          <div className=" sm:w-96 items-center flex mx-5       lg:w-7/12  justify-self-center	 h-56 lg:mx-auto border-2 rounded-2xl  mt-20">
            <div className="flex animate-pulse flex-row items-center h-full  justify-start space-x-5">
              <div className="sm: w-20 lg:w-32 ml-12 bg-gray-300 sm: h-20 lg:h-32 rounded-full "></div>
              <div className="flex flex-col  space-y-3">
                <div className="w-36 bg-gray-300 h-6 rounded-md "></div>
                <div className="sm: w-40 lg:w-72  bg-gray-300 h-12 rounded-md "></div>
                <div className="flex space-x-3">
                  <div className="w-6 bg-gray-300 h-6 rounded-md "></div>
                  <div className="w-6 bg-gray-300 h-6 rounded-md "></div>
                  <div className="w-6 bg-gray-300 h-6 rounded-md "></div>
                  <div className="w-6 bg-gray-300 h-6 rounded-md "></div>
                </div>
              </div>
            </div>
          </div>

          <div className="sm: w-full  lg:flex w-8/12 my-10 mx-auto justify-between">
            <div className="  flex flex-col sm: mb-10  items-center">
              <div className="w-64 my-2 bg-gray-200 h-10 rounded-md "></div>
              <div className="w-64 my-2 bg-gray-200 h-10 rounded-md "></div>
              <div className="w-64 my-2 bg-gray-200 h-10 rounded-md "></div>
              <div className="w-64 my-2 bg-gray-200 h-10 rounded-md "></div>
              <div className="w-64 my-2 bg-gray-200 h-10 rounded-md "></div>
            </div>
            <div className="sm: w-full lg:w-9/12 mx-auto h-full px-10 py-5 mx-10 grid grid-cols-3 gap-3 border-2 rounded-2xl">
              <div className="sm:w-40 lg:w-60 bg-gray-300 sm: h-52	 lg: h-72 rounded-md "></div>
              <div className="sm:w-40 lg:w-60 bg-gray-300 sm: h-52	 lg: h-72 rounded-md "></div>
              <div className="sm:w-40 lg:w-60 bg-gray-300 sm: h-52	 lg: h-72 rounded-md "></div>
           
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default PageProfile;
