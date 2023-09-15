import React, { FC, useState } from "react";
import LayoutPage from "components/LayoutPage/LayoutPage";
import facebookSvg from "images/Facebook.svg";
import twitterSvg from "images/Twitter.svg";
import googleSvg from "images/Google.svg";
import Input from "components/Input/Input";
import ButtonPrimary from "components/Button/ButtonPrimary";
import NcLink from "components/NcLink/NcLink";
import { Helmet } from "react-helmet";

import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  FacebookAuthProvider,
  ProviderId,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import LoginGradient from "images/LoginGradient.png";

import Lottie from "react-lottie";
import Boy from "lottiefiles/boy.json";
import Plant from "lottiefiles/plant.json";
import { app, auth, db } from "config/firebase.config";
import { Link, useHistory } from "react-router-dom";
import { loginAction, registerAction } from "actions/authAction";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { any } from "prop-types";
import { doc, setDoc } from "firebase/firestore";

export interface PageSignUpProps {
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

const PageSignUp: FC<PageSignUpProps> = ({ className = "" }) => {
  const history = useHistory();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [cpass, setCpass] = useState("");
  const [loading, setLoading] = useState(false);
  const firebaseAuth = getAuth(app);
  const provider = new GoogleAuthProvider();
  const provider2 = new FacebookAuthProvider();

  React.useEffect(() => {
    loadAll();
  }, []);

  const loadAll = async () => {
    let u: any;
    u = JSON.parse(localStorage.getItem("@token") || "{}");

    console.log("Token Found", u);
    if (u?.length > 0) {
      console.log("Token", u);
      window.location.href = "/";
      history.push("/");
    }
  };

  const register = async (e: any) => {
    e.preventDefault();
    console.log("MMMMM", name, email, pass, cpass);
    if (!name) {
      toast.warning('Name can"t be empty', { autoClose: 10000 });
    } else if (!email) {
      toast.warning('Email can"t be empty', { autoClose: 10000 });
    } else if (!validateEmail(email)) {
      toast.warning("Invalid Email", { autoClose: 10000 });
    } else if (!pass) {
      toast.warning('Password can"t be empty', { autoClose: 10000 });
    } else if (pass.length < 8) {
      toast.warning('Password can"t be less than 8 in length', {
        autoClose: 10000,
      });
    } else if (pass != cpass) {
      toast.warning('Password don"t match', { autoClose: 10000 });
    } else {
      let action: any = await registerAction(name, email, pass, "", "");
      //Firebase registeration starts
      let displayName = name;
      const res = await createUserWithEmailAndPassword(auth, email, pass);
      await localStorage.setItem("@firebaseUser", JSON.stringify(res));
      await updateProfile(res.user, {
        displayName,
        photoURL: "https://cdn-icons-png.flaticon.com/128/149/149071.png",
      });

      await setDoc(doc(db, "users", res.user.uid), {
        uid: res.user.uid,
        displayName,
        email,
        photoURL: "https://cdn-icons-png.flaticon.com/128/149/149071.png",
      });
      await setDoc(doc(db, "userChats", res.user.uid), {});

      //Firebase registeration ends
      console.log("res", action);
      if (action.hasOwnProperty("email")) {
        if (action?.email[0].status === "409") {
          toast.error("Email already exists", { autoClose: 10000 });
        }
      } else if (action.status === 200) {
        let action2: any = await loginAction(email, pass);

        if (action2?.token === undefined) {
          window.location.href = "/signup";
          // history.push("/login")
        } else {
          toast.success("Registered Successfully! Redirecting...", {
            autoClose: 10000,
          });
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
      let action: any = await registerAction(
        user.displayName,
        user.email,
        pass,
        user.photoURL,
        "Google"
      );
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
  return (
    <div className={`nc-PageSignUp ${className}`} data-nc-id="PageSignUp">
      <Helmet>
        <title>Sign up || HolaaHost</title>
      </Helmet>

      <div className="lg:flex container justify-center py-10 my-20  items-center">
        {/* 1st grid */}

        <div className="lg:w-2/3">
          <div className="text-container">
            <div className="sm: flex justify-center">
              
            <h1 className="sm:text-2xl sm:justify-center lg:text-4xl font-bold leading-10">
              Sign Up to explore<span className="block"> things.</span>
              <h4 className="sm:text-md  lg:text-lg my-5 font-normal  leading-7 z-20">
                Already have an account
                <span className="block">
                  You can{" "}
                  <Link to="/login" className="text-primary-6000 font-semibold">
                    Login!
                  </Link>
                </span>
              </h4>
            </h1>
            </div>
            <img
              className="img-banner-gradient"
              src={LoginGradient}
              alt="Not found"
            />
          </div>

          <div className="flex absolute 	 lotti-img-1 left-13 z-10 sm:hidden">
            <Lottie options={defaultOptions2} height={120} width={120} />
          </div>

          <div className="lotti-img flex absolute  z-10 sm:hidden">
            <Lottie options={defaultOptions} height={300} width={300} />
          </div>
        </div>

        {/* 1st grid */}

        {/* 2nd grid */}
        <div className="register-form sm:z-50  lg:w-1/3 lg:p-10 ">
          <div className="max-w-md mx-7 space-y-6">
            {/* FORM */}
            <form className="grid grid-cols-1 gap-8" action="#" method="post">
              <label className="block">
                <Input
                  type="text"
                  placeholder="Name"
                  className="mt-1"
                  onChange={(e) => setName(e.target.value)}
                />
              </label>
              <label className="block">
                <Input
                  type="email"
                  placeholder="Email Address"
                  className="mt-1"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </label>
              <label className="block ">
                <Input
                  type="password"
                  placeholder="Password"
                  className="mt-1 "
                  onChange={(e) => setPass(e.target.value)}
                />
              </label>
              <label className="block ">
                <Input
                  type="password"
                  placeholder="Confirm Password"
                  className="mt-1"
                  onChange={(e) => setCpass(e.target.value)}
                />
              </label>

              <ButtonPrimary type="submit" onClick={() => register(event)}>
                Create
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
                  onClick={() => signUp(item.name)}
                  className="nc-will-change-transform flex justify-center w-full rounded-lg bg-primary-50 dark:bg-neutral-800 px-4 py-3 transform transition-transform sm:px-6 hover:translate-y-[-2px]"
                >
                  <img
                    className="flex-shrink-0"
                    src={item.icon}
                    alt={item.name}
                  />
                  {/* <h3 className="flex-grow text-center text-sm font-medium text-neutral-700 dark:text-neutral-300 sm:text-sm">
                  {item.name}
                </h3> */}
                </a>
              ))}
            </div>

            {/* ==== */}
            {/* <span className="block text-center text-neutral-700 dark:text-neutral-300">
              New user? {` `}
              <NcLink to="/signup">Create an account</NcLink>
            </span> */}
          </div>
        </div>
        {/* 2nd grid */}
      </div>
    </div>
  );
};

export default PageSignUp;
