import Logo from "components/Logo/Logo";
import SocialsList1 from "components/SocialsList1/SocialsList1";
import { CustomLink } from "data/types";
import React from "react";

export interface WidgetFooterMenu {
  id: string;
  title: string;
  menus: CustomLink[];
}

const widgetMenus: WidgetFooterMenu[] = [
  {
    id: "5",
    title: "",
    menus: [
      { href: "/profile/edit-profile", label: "Profile" },
      { href: "/groups", label: "Groups" },
      { href: "/events", label: "Online Events" },
      { href: "/about", label: "How we work" },
      // { href: "#", label: "Local Guides" },
    ],
  },
  {
    id: "1",
    title: "",
    menus: [
      // { href: "/privacy-policy", label: "Privacy Policy" },
      // { href: "/refund-policy", label: "Refund Policy" },
      { href: "/terms-condition", label: "Terms and Condition" },
      { href: "/privacy-policy", label: "Privacy Policy" },
      { href: "/contact", label: "Contact Us" },
      { href: "/about", label: "About Us" },
    ],
  },
  {
    id: "2",
    title: "",
    menus: [
      { href: "/signup", label: "Sign Up" },
      { href: "/login", label: "Login" },
      // { href: "#", label: "Developers" },
      // { href: "#", label: "Learn design" },
      // { href: "#", label: "What's new" },
      // { href: "#", label: "Releases" },
      // { href: "#", label: "Careers" },
      // { href: "#", label: "About us" },
    ],
  },
  // {
  //   id: "4",
  //   title: "Community",
  //   menus: [
  //     { href: "#", label: "Discussion Forums" },
  //     { href: "#", label: "Code of Conduct" },
  //     { href: "#", label: "Community Resources" },
  //     { href: "#", label: "Contributing" },
  //     { href: "#", label: "Concurrent Mode" },
  //     { href: "#", label: "API Reference" },
  //     { href: "#", label: "Advanced Guides" },
  //     { href: "#", label: "Main Concepts" },
  //   ],
  // },
];

const Footer: React.FC = () => {
  const renderWidgetMenuItem = (menu: WidgetFooterMenu, index: number) => {
    return (
      <div key={index} className="text-sm">
        <h2 className="font-semibold text-neutral-700 dark:text-neutral-200">
          {menu.title}
        </h2>
        <ul className="mt-5 space-y-7">
          {menu.menus.map((item, index) => (
            <li key={index}>
              <a
                key={index}
                className="text-white dark:text-neutral-300 hover:text-yellow-600 dark:hover:text-white"
                href={item.href}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    );
  };

  return (
    <div className="nc-Footer relative pt-16 pb-[-10] bg-color-footer footer border-neutral-200 dark:border-neutral-700">
      <div className="container grid grid-cols-2 gap-y-20 my-10 gap-x-5 sm:gap-x-8 md:grid-cols-4 lg:gap-x-10 ">
        <div className="grid sm:grid-cols-4  gap-5 col-span-2 md:col-span-4 lg:md:col-span-1 lg:flex lg:flex-col">
          <div className="col-span-2 mtm-20  md:col-span-1">
            <Logo />
          </div>

          <div className="col-span-2 footer-social flex items-center  md:col-span-3">
            <SocialsList1 className="flex items-center space-x-3 lg:space-x-0 lg:flex-col lg:space-y-0 lg:items-start" />
          </div>
        </div>
        {widgetMenus.map(renderWidgetMenuItem)}
      </div>{" "}
      <div className="container grid grid-cols-1 gap-y-20 my-5 gap-x-5 sm:gap-x-8 md:grid-cols-1 lg:gap-x-10 ">
        <div className="grid grid-cols-1  gap-5 col-span-1 md:col-span-1 lg:md:col-span-1 lg:flex lg:flex-col">
          <hr />
        </div>
      </div>

      <div className="container grid grid-cols-1 gap-y-20 mt-5 pb-5 gap-x-5 sm:gap-x-8 md:grid-cols-1 lg:gap-x-10  footer-end">
        <div>
          <p className="text-white  text-sm">All rights reserved &copy; 2023 HolaaHost</p>
        </div>
        <div>
          <p className="text-white text-sm">Design by <a href="https://excitetemplate.com/" >E<span className="excite">x</span>cite Systems</a></p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
