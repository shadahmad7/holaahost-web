import React, { FC, useState } from "react";
import Logo from "components/Logo/Logo";
import Navigation from "components/Navigation/Navigation";
import SearchDropdown from "./SearchDropdown";
import MenuBar from "components/MenuBar/MenuBar";
import { Link } from "react-router-dom";
import NotifyDropdown from "./NotifyDropdown";
import AvatarDropdown from "./AvatarDropdown";
import CreateDropdown from "./CreateDropdown";
import Drawer from "./Drawer";
import { logout } from "actions/authAction";

export interface MainNav1Props {
  isTop: boolean;
}

const MainNav1: FC<MainNav1Props> = ({ isTop }) => {
  const [isOpen, setOpen] = useState(false);
  const [logged, setLogged] = useState(false);

  React.useEffect(() => {
    check();
  }, []);

  const check = () => {
    let a = localStorage.getItem("@token");
    // console.log("MMMNNNN", a);
    if (a === undefined || a === null) {
      setLogged(false);
    } else {
      setLogged(true);
    }
  };

  const setIsOpen = async (e: any) => {
    setOpen(!isOpen);
  };

  const logoutt = async (e: any) => {
   e.preventDefault();
   let action = await logout();
  window.location.href="/login"
  };

  return (
    <div
      className={`nc-MainNav bg-gray-100 nc-MainNav1 relative z-10 ${
        isTop ? "onTop " : "notOnTop backdrop-filter"
      }`}
    >
      <div className="container py-3 relative flex justify-between items-center space-x-4 xl:space-x-8">
        <div className="flex  justify-start flex-grow items-center space-x-4 sm:space-x-10 2xl:space-x-14">
          <Drawer isOpen={isOpen} setIsOpen={setIsOpen}>
            <div className="px-2 py-2">
              <a href="/" className="ml-5">
                Dashboard
              </a>
            </div>

            {logged && (
              <>
            <div className="px-2 py-2">
              <a href="/profile/edit-profile" className="ml-5">
                Profile
              </a>
            </div>
            <div className="px-2 py-2">
              <a href="/chats" className="ml-5">
                Chats
              </a>
            </div>
            </>
            )}
            {logged && (
              <>
                <div className="px-2 py-2">
                  <a href="/create-group" className="ml-5">
                    Create Group
                  </a>
                </div>
                <div className="px-2 py-2">
                  <a href="/create-event" className="ml-5">
                    Create Event
                  </a>
                </div>
                <div className="px-2 py-2">
                  <a onClick={logoutt} className="ml-5">
                    Logout
                  </a>
                </div>
              </>
            )}
            {!logged && (
              <>
                <div className="px-2 py-2">
                  <a href="/signup" className="ml-5">
                    Sign Up
                  </a>
                </div>
                <div className="px-2 py-2">
                  <a href="/login" className="ml-5">
                    Login
                  </a>
                </div>
              </>
            )}
          </Drawer>
          <i
            className="nav-bar-top las la-bars text-black opacity-100 cursor-pointer  hover:bg-white rounded-full duration-100 px-3 py-3 text-2xl lg:hidden"
            onClick={() => setOpen(!isOpen)}
          ></i>
          <Logo />
          <SearchDropdown />
          <Navigation />
        </div>
        <div className="flex-shrink-0 flex items-center justify-end text-neutral-700 dark:text-neutral-100 space-x-1">
          <div className="hidden items-center xl:flex space-x-1">
            {logged && (
              <div className="mx-2 flex items-center">
                <Link to="/chats">
                  <div>
                    <i className="las la-comment text-black opacity-100 cursor-pointer  hover:bg-white rounded-full duration-100 px-3 py-3 text-2xl  "></i>
                  </div>
                </Link>

                {/* <NotifyDropdown /> */}
              </div>
            )}

            <CreateDropdown />

            <div className="px-3" />
            {logged ? (
              <>
                <AvatarDropdown />
                <div className="flex items-center space-x-3 xl:hidden">
                  <AvatarDropdown />
                  <MenuBar />
                </div>
              </>
            ) : (
              <>
                <div className="px-1">
                  <Link to="/login">Login</Link>
                </div>
                <div className="px-1">|</div>
                <div className="px-1">
                  <Link to="/signup">Sign up</Link>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainNav1;
