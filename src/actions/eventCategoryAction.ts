import { any } from "prop-types";
import React from "react";
import { api } from "../config/api";
import { decrypt } from "./authAction";

export const getAllEventCategories = async () => {
  let resData;
  // var a:any = localStorage.getItem("@token");
  // a = JSON.parse(a);
  // let token = await decrypt(a);
  


  var myHeaders = new Headers();
  // myHeaders.append(
  //   "Authorization",
  //   `Bearer`+token
  // );

  var requestOptions: any = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };

   resData = await fetch(`${api.url2}eventcategory`, requestOptions)
    .then((response) => response.json())
    .then((result) => {
      // if (!(result.status === 200)) {
      //   return {
      //     status: 0,
      //     message: "Category data not found",
      //   };
      // }
      // resData = result;
      console.log("Event Category----", result);
      return result;
    })
    .catch((error) => console.log("error", error));

    return resData;
};
