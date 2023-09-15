import React from "react";
import Input from "components/Input/Input";
import ButtonPrimary from "components/Button/ButtonPrimary";
import Select from "components/Select/Select";
import Label from "components/Label/Label";

const DashboardBillingAddress = () => {
  return (
    <div className="rounded-xl md:border md:border-neutral-100 dark:border-neutral-800 md:p-6">
      <form className="grid md:grid-cols-2 gap-6" action="#" method="post">
        <label className="flex items-center">
          <Label>First Name: </Label>
         <p className="text-sm ml-2">Alan</p>
        </label>
        <label className="flex items-center">
          <Label>Last Name: </Label>
         <p className="text-sm ml-2">Walker</p>
        </label>
        <label className="flex items-center">
          <Label>Email: </Label>
         <p className="text-sm ml-2">alan@gmail.com</p>
        </label>
        <label className="flex items-center">
          <Label>Joined: </Label>
         <p className="text-sm ml-2">12 Dec 2022</p>
        </label>
      
       
        {/* <ButtonPrimary className="md:col-span-2" type="submit">
          Update Billing address
        </ButtonPrimary> */}
      </form>
    </div>
  );
};

export default DashboardBillingAddress;
