import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { Page } from "./types";
import ScrollToTop from "./ScrollToTop";
import Footer from "components/Footer/Footer";
import Page404 from "containers/Page404/Page404";
import PageArchive from "containers/PageArchive/PageArchive";
import PageAuthor from "containers/PageAuthor/PageAuthor";
import PageSingle from "containers/PageSingle/PageSingle";

import PageSingleTemp3Sidebar from "containers/PageSingle/PageSingleTemp3Sidebar";
import PageAbout from "containers/PageAbout/PageAbout";
import PageContact from "containers/PageContact/PageContact";
import PageLogin from "containers/PageLogin/PageLogin";
import PageSignUp from "containers/PageSignUp/PageSignUp";
import PageForgotPass from "containers/PageForgotPass/PageForgotPass";

import HeaderContainer from "containers/HeaderContainer/HeaderContainer";
import PageHome from "containers/PageHome/PageHome";

import PageAuthorV2 from "containers/PageAuthor/PageAuthorV2";
import MediaRunningContainer from "containers/MediaRunningContainer/MediaRunningContainer";

import MediaRunningContainerForSafari from "containers/MediaRunningContainer/MediaRunningContainerForSafari";
import isSafariBrowser from "utils/isSafariBrowser";

import PageProfile from "containers/PageProfile/PageProfile";
import PageCreateEvent from "containers/PageCreateEvent/PageCreateEvent";
import PageCreateGroup from "containers/PageCreateGroup/PageCreateGroup";
import PageChat from "containers/PageChat/PageChat";
import PageUpdatePass from "containers/PageUpdatePass/PageUpdatePass";
import PageEditGroup from "containers/PageEditGroup/PageEditGroup";
import PageEditEvent from "containers/PageEditEvent/PageEditEvent";
import PageSearchContent from "containers/PageHome/PageSearchContent";
import PagePrivacyPolicy from "containers/PagePrivacyPolicy/PagePrivacyPolicy";
import PageTermsCondition from "containers/PageTermsCondition/PageTermsCondition";

export const pages: Page[] = [
  { path: "/", exact: true, component: PageHome },
  { path: "/search", exact: true, component: PageSearchContent },
  //
  { path: "/profile", component: PageProfile },
  { path: "/groups", component: PageAuthor },
  { path: "/group", component: PageAuthorV2 },
  { path: "/create-group", component: PageCreateGroup},
  { path: "/create-event", component: PageCreateEvent },
  //
  { path: "/edit-group", component: PageEditGroup},
  { path: "/edit-event", component: PageEditEvent },
  //
  { path: "/event", component: PageSingleTemp3Sidebar },
  { path: "/events", component: PageArchive },
  { path: "/chats", component: PageChat },
  //


  {
    path: "/blog",
    component: PageSingle,
  },
  
 


  

  { path: "/terms-condition", component: PageTermsCondition },
  { path: "/privacy-policy", component: PagePrivacyPolicy },
  { path: "/about", component: PageAbout },
  { path: "/contact", component: PageContact },
  { path: "/page404", component: Page404 },
  { path: "/login", component: PageLogin },
  { path: "/signup", component: PageSignUp },
  { path: "/forgot-pass", component: PageForgotPass },
  { path: "/password-reset", component: PageUpdatePass },
  //
];

const Routes = () => {
  return (
    <BrowserRouter
      basename={
        import.meta.env.VITE_LRT_OR_RTL === "rtl" ? "/ncmaz-rtl" : ""
      }
    >
      <ScrollToTop />
      <HeaderContainer />
      <Switch>
        {pages.map(({ component, path, exact }) => {
          return (
            <Route
              key={path}
              component={component}
              exact={!!exact}
              path={path}
            />
          );
        })}
        <Route component={Page404} />
      </Switch>
      <Footer />
      {/* MEDIA */}

      {/* //is Safari on an apple touch-screen device */}
      {isSafariBrowser() ? (
        <MediaRunningContainerForSafari />
      ) : (
        <MediaRunningContainer />
      )}
    </BrowserRouter>
  );
};

export default Routes;
