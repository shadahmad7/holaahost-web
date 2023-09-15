import { updatePassword } from "actions/profileAction";
import ButtonPrimary from "components/Button/ButtonPrimary";
import Input from "components/Input/Input";
import Label from "components/Label/Label";
import React from "react";
import { toast, ToastContainer } from "react-toastify";

const DashboardChangePassword = () => {
  const [oldPass, setOldPass] = React.useState("");
  const [newPass, setNewPass] = React.useState("");
  const [confirmNewPass, setConfirmNewPass] = React.useState("");
  const [loader, setLoader] = React.useState(false);

  const onSubmit = async (e: any) => {
    e.preventDefault();
    setLoader(true);
    if (newPass.length < 8) {
      toast.error("Password should be 8 characters in length", {
        autoClose: 10000,
      });
    } else if (newPass != confirmNewPass) {
      toast.error("Passwords don't match", { autoClose: 10000 });
    } else {
      let updatePassRes:any = await updatePassword(oldPass, newPass);

      if(updatePassRes.status === 200){
        console.log("res update profile", updatePassRes);

        toast.success("Password Updated Successfully!", {
          autoClose: 10000,
        });
        localStorage.removeItem("@token");
        localStorage.removeItem("@user");
        window.location.href = "/login";
      } else {
        toast.error("Passwords is wrong", { autoClose: 10000 });

      }
    
    }
    setTimeout(() => {
      setLoader(false);
    }, 2000);
  };

  return (
    <div className="rounded-xl md:border md:border-neutral-100 dark:border-neutral-800 md:p-6">
      <form className="grid md:grid-cols-2 gap-6" action="#" method="post">
        <label className="block">
          <Label>Current password</Label>
          <Input
            placeholder="********"
            type="password"
            className="mt-1"
            onChange={(e) => setOldPass(e.target.value)}
          />
        </label>
        <label className="block">
          <Label>New password</Label>
          <Input
            type="password"
            placeholder="********"
            className="mt-1"
            onChange={(e) => setNewPass(e.target.value)}
          />
        </label>
        <label className="block">
          <Label>Confirm New password</Label>
          <Input
            type="password"
            placeholder="********"
            className="mt-1"
            onChange={(e) => setConfirmNewPass(e.target.value)}
          />
        </label>
      </form>
      <div className=" flex mt-8 mb-4 justify-start">
        <ButtonPrimary className="col-span-4 create-event-button" type="submit" onClick={()=> onSubmit(event)}>
          Update
        </ButtonPrimary>
        <ToastContainer />
      </div>
    </div>
  );
};

export default DashboardChangePassword;
