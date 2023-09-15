import { Popover, Transition } from "@headlessui/react";
import Avatar from "components/Avatar/Avatar";
import { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import React from "react";

export default function CreateDropdown() {
  const [open, setOpen] = useState(false);
  const [logged, setLogged] = useState(false);

  React.useEffect(() => {
    check();
  }, []);

  const check = async () => {
    let u: any;
    u = JSON.parse(localStorage.getItem("@token") || "{}");

    console.log("Token Found", u);
    if (u?.length > 0) {
      console.log("Token", u);
      setLogged(true);
    }
  };

  return (
    <div className="">
      <Popover className="relative">
        {({ open }) => (
          <>
            <Popover.Button
              className={`rounded-xl btnColor text-white`}
              onClick={() => setOpen(!open)}
            >
              Create
              {open ? (
                <i className="las la-angle-up px-1 text-xs  text-white opacity-100"></i>
              ) : (
                <i className="las la-angle-down px-1  text-xs  text-white opacity-100"></i>
              )}
            </Popover.Button>

            <Transition
              as={Fragment}
              enter="transition ease-out duration-200"
              enterFrom="opacity-0 translate-y-1"
              enterTo="opacity-100 translate-y-0"
              leave="transition ease-in duration-150"
              leaveFrom="opacity-100 translate-y-0"
              leaveTo="opacity-0 translate-y-1"
            >
              <Popover.Panel className="absolute z-10 w-screen max-w-[200px] px-2 mt-3 -right-10 sm:right-0 sm:px-0 opacity-100 translate-y-0">
                <div className="overflow-hidden rounded-2xl bg-white shadow-lg ring-1 ring-black ring-opacity-5">
                  <Link
                    to={logged ? "/create-group" : "/login"}
                    className="relative  grid gap-2 hover:bg-gray-200 rounded-md bg-white dark:bg-neutral-800 px-5 py-3 m-2"
                  >
                    <p className="text-md font-medium cursor-pointer text-gray-900  dark:text-gray-200">
                      Group
                    </p>
                  </Link>

                  <Link
                    to={logged ? "/create-event" : "/login"}
                    className="relative  grid gap-2 hover:bg-gray-200 rounded-md bg-white dark:bg-neutral-800 px-5 py-3 m-2"
                  >
                    <p className="text-md font-medium cursor-pointer text-gray-900 dark:text-gray-200">
                      Event
                    </p>
                  </Link>
                </div>
              </Popover.Panel>
            </Transition>
          </>
        )}
      </Popover>
    </div>
  );
}
