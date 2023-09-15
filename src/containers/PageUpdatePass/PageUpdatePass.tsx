import React, { FC } from "react";
import LayoutPage from "components/LayoutPage/LayoutPage";
import Input from "components/Input/Input";
import ButtonPrimary from "components/Button/ButtonPrimary";
import NcLink from "components/NcLink/NcLink";
import { Helmet } from "react-helmet";
import { updatePasswordFromLogin } from "actions/authAction";
import { toast, ToastContainer } from "react-toastify";

export interface PageUpdatePassProps {
  className?: string;
}

const PageUpdatePass: FC<PageUpdatePassProps> = ({ className = "" }) => {


  const [newPass, setNewPass] = React.useState("");
  const [confirmNewPass, setConfirmNewPass] = React.useState("");


const updatePassword = async(e:any)=> {


  e.preventDefault();



  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const email = urlParams.get('email')
  const token = urlParams.get('token')

console.log("fbjd", email)
console.log("fbjd", token)
  if(newPass.length === 0){

    alert("password cnt be blak")
  } else if(confirmNewPass.length ===0){
    alert("confim password cnt be blak")
    
   
  } else if(newPass.length< 8 ){
    alert("password should be 8 in length")
  } else if(newPass!= confirmNewPass){
    alert("password should match")
  } else{
    let action = await updatePasswordFromLogin(newPass,token ,email );
    console.log("actttt", action);
    
    toast.success("Password Updated", {
      autoClose: 10000,
    });
  }
}

  return (
    <div
      className={`nc-PageUpdatePass ${className}`}
      data-nc-id="PageUpdatePass"
    >
      <Helmet>
        <title>Update Password </title>
      </Helmet>
      <LayoutPage
        subHeading="Update password your new password."
        headingEmoji="🔐"
        heading="Update password"
      >
        <div className="max-w-md mx-auto space-y-6">
          {/* FORM */}
          <form className="grid grid-cols-1 gap-6" action="#" method="post">
            <label className="block">
              <span className="text-neutral-800 dark:text-neutral-200">
                New Password
              </span>
              <Input
                type="password"
                placeholder="Please enter a new password"
                className="mt-1"
                onChange={(e)=> setNewPass(e.target.value)}
                />
            </label>
            <label className="block">
              <span className="text-neutral-800 dark:text-neutral-200">
                Confirm Password
              </span>
              <Input
                type="password"
                placeholder="Please confirm entered password"
                className="mt-1"
                onChange={(e)=> setConfirmNewPass(e.target.value)}
              />
            </label>
            <ButtonPrimary onClick={(e)=> updatePassword(e)} type="submit">Update</ButtonPrimary>
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

export default PageUpdatePass;
