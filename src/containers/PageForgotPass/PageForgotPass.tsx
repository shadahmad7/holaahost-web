import React, { FC } from "react";
import LayoutPage from "components/LayoutPage/LayoutPage";
import Input from "components/Input/Input";
import ButtonPrimary from "components/Button/ButtonPrimary";
import NcLink from "components/NcLink/NcLink";
import { Helmet } from "react-helmet";
import { forgotPassword } from "actions/authAction";
import { toast, ToastContainer } from "react-toastify";

export interface PageForgotPassProps {
  className?: string;
}

const PageForgotPass: FC<PageForgotPassProps> = ({ className = "" }) => {
  const [email, setEmail] = React.useState("");

  const forgotPassFunc = async (e: any) => {
    e.preventDefault();
    let action = await forgotPassword(email);
    console.log("RESSSS", action);
    toast.success("Password Reset link has been send", {
      autoClose: 10000,
    });
  };

  return (
    <div
      className={`nc-PageForgotPass ${className}`}
      data-nc-id="PageForgotPass"
    >
      <Helmet>
        <title>Forgot Password || HolaaHost</title>
      </Helmet>
      <LayoutPage
        subHeading="We will sent reset password instruction to your email"
        headingEmoji="🔐"
        heading="Forgot password"
      >
        <div className="max-w-md mx-auto space-y-6">
          {/* FORM */}
          <form
            className="grid grid-cols-1 gap-6"
            action="/password-reset"
            method="post"
          >
            <label className="block">
              <span className="text-neutral-800 dark:text-neutral-200">
                Email address
              </span>
              <Input
                type="email"
                placeholder="example@example.com"
                className="mt-1"
                onChange={(e) => setEmail("")}
              />
            </label>
            <ButtonPrimary type="submit" onClick={() => forgotPassFunc(e)}>
              Continue
            </ButtonPrimary>
            <ToastContainer />
          </form>

          {/* ==== */}
          <span className="block text-center text-neutral-700 dark:text-neutral-300">
            Go back for {` `}
            <NcLink to="/login">Sign in</NcLink>
            {` / `}
            <NcLink to="/signup">Sign up</NcLink>
          </span>
        </div>
      </LayoutPage>
    </div>
  );
};

export default PageForgotPass;
