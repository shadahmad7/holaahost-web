import LayoutPage from "components/LayoutPage/LayoutPage";
import React, { FC, useEffect, useState } from "react";
import facebookSvg from "images/Facebook.svg";
import twitterSvg from "images/Twitter.svg";
import googleSvg from "images/Google.svg";
import Input from "components/Input/Input";
import ButtonPrimary from "components/Button/ButtonPrimary";
import NcLink from "components/NcLink/NcLink";
import { Helmet } from "react-helmet";
import LoginGradient from "images/LoginGradient.png";

import Lottie from "react-lottie";
import Boy from "lottiefiles/boy.json";
import Plant from "lottiefiles/plant.json";
import { Link, Redirect, useHistory } from "react-router-dom";
import { loginAction } from "actions/authAction";
import { sendSignInLinkToEmail } from "@firebase/auth";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { userData } from "interfaces/userData";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  FacebookAuthProvider,
  ProviderId,
} from "firebase/auth";
import { app, auth } from "config/firebase.config";
import { signInWithEmailAndPassword } from "firebase/auth";

export interface PageLoginProps {
  className?: string;
}

const loginSocials = [
  {
    name: "Facebook",
    href: "#",
    icon: facebookSvg,
  },

  {
    name: "Google",
    href: "#",
    icon: googleSvg,
  },
];

const PageLogin: FC<PageLoginProps> = ({ className = "" }) => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: Boy,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  const defaultOptions2 = {
    loop: true,
    autoplay: true,
    animationData: Plant,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  const history = useHistory();
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [loading, setLoading] = useState(false);
  const firebaseAuth = getAuth(app);
  const provider = new GoogleAuthProvider();
  const provider2 = new FacebookAuthProvider();

  useEffect(() => {
    check();
  }, []);

  const check = async () => {
    let u: any;
    u = JSON.parse(localStorage.getItem("@token") || "{}");

    console.log("Token Found", u);
    if (u?.length > 0) {
      console.log("Token", u);

      window.location.href = "/";
      history.push("/");
    }
  };

  const login = async (e: any) => {
    e.preventDefault();
    if (!email) {
      toast.warning('Email can"t be empty', { autoClose: 10000 });
    } else if (!validateEmail(email)) {
      toast.warning("Invalid Email", { autoClose: 10000 });
    } else if (!pass) {
      toast.warning('Password can"t be empty', { autoClose: 10000 });
    } else {
      let action: any = await loginAction(email, pass);
      console.log("JHBVJHVJH", action);

      if (action.status === 404) {
        toast.error("User not found", { autoClose: 10000 });
      } else if (action.status === 409) {
        toast.error("Password is wrong", { autoClose: 10000 });
      } else if (action.status === 200) {
        try {
          let res = await signInWithEmailAndPassword(auth, email, pass);
          await localStorage.setItem("@firebaseUser", JSON.stringify(res));
          console.log("ress", res);
        } catch (err) {
          console.log("err", err);
        }

        toast.success("Login Successfully! Redirecting...", {
          autoClose: 10000,
        });

        if (action.token === undefined) {
          window.location.href = "/login";
          // history.push("/login")
        } else {
          setTimeout(() => {
            window.location.href = "/";
          }, 2000);
          // history.push("/")
        }
      } else {
        toast.warning("Something went wrong", { autoClose: 10000 });
      }
    }
  };

  const validateEmail = (email: any) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  const signUp = async (name: any) => {
    if (name === "Google") {
      const {
        user: { refreshToken, providerData },
      } = await signInWithPopup(firebaseAuth, provider);
      console.log("Google", providerData[0]);
      let user = providerData[0];
      let action: any = await login(user.email, "");
      console.log("YYYYY", action.email[0].status);
      if (action.email[0].status === "409") {
        toast.error("Email already exists", { autoClose: 10000 });
      } else if (action.status === 200) {
        if (action.data.access_token === undefined) {
          window.location.href = "/signup";
        } else {
          toast.success("Registered Successfully! Redirecting...", {
            autoClose: 10000,
          });
          setTimeout(() => {
            window.location.href = "/";
          }, 2000);
        }
      } else {
        toast.warning("Something went wrong", { autoClose: 10000 });
      }
    } else {
      const {
        user: { refreshToken, providerData },
      } = await signInWithPopup(firebaseAuth, provider2);
      console.log("FBB", providerData[0]);
    }
  };

  return (
    <div className={`nc-PageLogin ${className}`} data-nc-id="PageLogin">
      <Helmet>
        <title>Login || HolaaHost</title>
      </Helmet>

      <div className="flex container justify-center cust_flex py-10 my-20  items-center">
        {/* 1st grid */}

        <div className="w-2/3 sm:w-100">
          <div className="text-container sm:w-full">
            <h1 className=" text-md lg:text-4xl font-bold leading-10">
              Sign In to connect with<span className="block">new peoples.</span>
              <h4 className=" block login-page-banner-text-2 text-lg my-5 font-normal  leading-7 z-20">
                If you don't have account
                <span className="block login-page-banner-text-2">
                  You can{" "}
                  <Link
                    to="/signup"
                    className="text-primary-6000 font-semibold"
                  >
                    Register Here!
                  </Link>
                </span>
              </h4>
            </h1>
            <img
              className="img-banner-gradient"
              src={LoginGradient}
              alt="Not found"
            />
          </div>
          <div className="sm:w-100">
            <div className="flex absolute lotti-img-1 left-13 z-100 ">
              <Lottie options={defaultOptions2} height={160} width={160} />
            </div>

            <div className="lotti-img flex absolute  z-10">
              <Lottie options={defaultOptions} height={300} width={300} />
            </div>
          </div>
        </div>

        {/* 1st grid */}

        {/* 2nd grid */}
        <div className=" sm:w-full lg:p-10 sm:p-5 z-10 login_form ">
          <div className="max-w-md mx-7 space-y-6">
            {/* FORM */}
            <form className="grid grid-cols-1 gap-6" action="#" method="post">
              <label className="block">
                <Input
                  type="email"
                  placeholder="Email Address"
                  className="mt-1"
                  required
                  onChange={(e) => setEmail(e.target.value)}
                />
              </label>
              <label className="block ">
                <Input
                  type="password"
                  placeholder="Password"
                  className="mt-1 "
                  onChange={(e) => setPass(e.target.value)}
                  required
                />
              </label>
              <NcLink to="/forgot-pass" className="text-xs text-end">
                Forgot password?
              </NcLink>
              <ButtonPrimary type="submit" onClick={() => login(event)}>
                Continue
              </ButtonPrimary>
              <ToastContainer />
            </form>

            {/* OR */}
            <div className="relative text-center">
              <span className="relative z-10 inline-block px-4 font-medium text-sm bg-white dark:text-neutral-400 dark:bg-neutral-900">
                OR
              </span>
              <div className="absolute left-0 w-full top-1/2 transform -translate-y-1/2 border border-neutral-100 dark:border-neutral-800"></div>
            </div>
            <div className="gap-2 flex">
              {loginSocials.map((item, index) => (
                <a
                  key={index}
                  href={item.href}
                  className="nc-will-change-transform flex justify-center w-full rounded-lg bg-primary-50 dark:bg-neutral-800 px-4 py-3 transform transition-transform sm:px-6 hover:translate-y-[-2px]"
                >
                  <img
                    className="flex-shrink-0"
                    src={item.icon}
                    alt={item.name}
                  />
                </a>
              ))}
            </div>
          </div>
        </div>
        {/* 2nd grid */}
      </div>
    </div>
  );
};

export default PageLogin;
