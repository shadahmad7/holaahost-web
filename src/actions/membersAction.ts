import { any } from "prop-types";
import React from "react";
import { api } from "../config/api";
import { decrypt, logout } from "./authAction";

export const getAllMembers = async (id: any) => {
  let resData;
  var myHeaders = new Headers();
  var requestOptions: any = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };

  await fetch(api.url2 + `group/members/${id}`, requestOptions)
    .then((response) => response.json())
    .then(async (result) => {
      resData = result;
      console.log("res members", resData);
    })
    .catch((error) => console.log("error", error));

  return resData;
};



export const becomeMember = async (id: any) => {
  let resData;
  var a: any = localStorage.getItem("@user");
  console.log("token", a);
  a = JSON.parse(a);



  var b: any = localStorage.getItem("@token");
  b = JSON.parse(b);
  let token = await decrypt(b);
  var myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer` + token);

  var formdata = new FormData();
  formdata.append("user_id", a.id);
  formdata.append("group_id", id);

  var requestOptions: any = {
    method: "POST",
    headers: myHeaders,
    body: formdata,
    redirect: "follow",
  };

  await fetch(api.url2 + `groupMembers/create`, requestOptions)
    .then((response) => response.json())
    .then(async (result) => {
      if (result?.status === 401) {
        logout();
      }
      resData = result;
      console.log("res members", resData);
    })
    .catch((error) => console.log("error", error));

  return resData;
};

export const removeMember = async (id: any, gId: any) => {
  let resData;
  var a: any = localStorage.getItem("@token");
  a = JSON.parse(a);
  let token = await decrypt(a);
  var myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer` + token);
  var formdata = new FormData();
  formdata.append("user_id", id);
  formdata.append("group_id", gId);

  var requestOptions: any = {
    method: "DELETE",
    body: formdata,
    headers: myHeaders,
    redirect: "follow",
  };

  await fetch(api.url2 + `groupMembers/delete/${id}`, requestOptions)
    .then((response) => response.json())
    .then(async (result) => {
      if (result?.status === 401) {
        logout();
      }
      resData = result;
      console.log("res members", resData);
    })
    .catch((error) => console.log("error", error));

  return resData;
};







export const leaveGroupByUser = async (id: any) => {
  let resData;
  var a: any = localStorage.getItem("@token");
  a = JSON.parse(a);
  let token = await decrypt(a);
  let b: any = localStorage.getItem("@user");
  b = JSON.parse(b);
  var myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer` + token);


  var requestOptions: any = {
    method: "DELETE",
    headers: myHeaders,
    redirect: "follow",
  };

  await fetch(api.url2 + `groupMembers/delete/${id}`, requestOptions)
    .then((response) => response.json())
    .then(async (result) => {
      if (result?.status === 401) {
        logout();
      }
      resData = result;
      console.log("res members", resData);
    })
    .catch((error) => console.log("error", error));

  return resData;
};
