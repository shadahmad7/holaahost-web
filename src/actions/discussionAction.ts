import { url } from "inspector";
import { any } from "prop-types";
import React from "react";
import { api } from "../config/api";
import { decrypt, logout } from "./authAction";

export const getAllComments = async (id: any) => {
  let resData, url;

  var b: any = localStorage.getItem("@user");
  if (b != null) {
    b = JSON.parse(b);
    url = `comments/${id}/${b.id}`;
  } else {
    url = `comments/${id}/0`;
  }

  console.log("url", url)
  var myHeaders = new Headers();

  var requestOptions: any = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };

  await fetch(api.url2 + `${url}`, requestOptions)
    .then((response) => response.json())
    .then(async (result) => {
      resData = result;
      console.log("res comments", resData);
    })
    .catch((error) => console.log("error", error));

  return resData;
};

export const addComment = async (comment: any, group_id: any) => {
  let resData;
  var a: any = localStorage.getItem("@token");
  var b: any = localStorage.getItem("@user");
  console.log("token", a);
  a = JSON.parse(a);
  b = JSON.parse(b);
  console.log("user", b.id);
  let token = await decrypt(a);
  console.log("token", token);

  var myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer` + token);

  var formdata = new FormData();
  formdata.append("comment", comment);
  formdata.append("user_id", b.id);
  formdata.append("group_id", group_id);

  var requestOptions: any = {
    method: "POST",
    headers: myHeaders,
    body: formdata,
    redirect: "follow",
  };

  await fetch(api.url2 + `comment/create`, requestOptions)
    .then((response) => response.json())
    .then(async (result) => {
      if(result?.status === 401){
        logout();
      }
      resData = result;
      console.log("res comments", resData);
    })
    .catch((error) => console.log("error", error));

  return resData;
};

export const deleteComment = async (id: any) => {
  let resData;
  var a: any = localStorage.getItem("@token");
  var b: any = localStorage.getItem("@user");
  console.log("token", a);
  a = JSON.parse(a);
  b = JSON.parse(b);
  console.log("user", b.id);
  let token = await decrypt(a);
  console.log("token", token);

  var myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer` + token);

  var requestOptions: any = {
    method: "DELETE",
    redirect: "follow",
  };

  await fetch(api.url2 + `comment/delete/${id}`, requestOptions)
    .then((response) => response.json())
    .then(async (result) => {
      if(result?.status === 401){
        logout();
      }
      resData = result;
      console.log("res comments", resData);
    })
    .catch((error) => console.log("error", error));

  return resData;
};

export const likeComment = async (id: any) => {
  let resData;

  var a: any = localStorage.getItem("@token");
  a = JSON.parse(a);
  let token = await decrypt(a);

  var b: any = localStorage.getItem("@user");
  b = JSON.parse(b);
  console.log("user", b.id);
  console.log("data sent", b.id, id);

  var myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer` + token);

  var formdata = new FormData();
  formdata.append("user_id", b.id);
  formdata.append("comment_id", id);

  var requestOptions: any = {
    method: "POST",
    body: formdata,
    redirect: "follow",
  };

  await fetch(api.url2 + `comment/likes/${id}`, requestOptions)
    .then((response) => response.json())
    .then(async (result) => {
      if(result?.status === 401){
        logout();
      }
      resData = result;
      console.log("res comments", resData);
    })
    .catch((error) => console.log("error", error));

  return resData;
};

export const unlikeComment = async (id: any) => {
  let resData;
  var a: any = localStorage.getItem("@token");
  var b: any = localStorage.getItem("@user");
  console.log("token", a);
  a = JSON.parse(a);
  b = JSON.parse(b);
  console.log("user", b.id);
  let token = await decrypt(a);
  console.log("token", token);

  var myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer` + token);

  var formdata = new FormData();
  formdata.append("user_id", b.id);
  formdata.append("comment_id", id);

  var requestOptions: any = {
    method: "POST",
    body: formdata,
    redirect: "follow",
  };

  await fetch(api.url2 + `comment/unlikes`, requestOptions)
    .then((response) => response.json())
    .then(async (result) => {
      if(result?.status === 401){
        logout();
      }
      resData = result;
      console.log("res comments", resData);
    })
    .catch((error) => console.log("error", error));

  return resData;
};

export const addCommentReply = async (id: any, comment: any, group_id: any) => {
  let resData;
  var a: any = localStorage.getItem("@token");
  var b: any = localStorage.getItem("@user");
  console.log("token", a);
  a = JSON.parse(a);
  b = JSON.parse(b);
  console.log("user", b.id);
  let token = await decrypt(a);
  console.log("token", token);

  var myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer` + token);

  var formdata = new FormData();
  formdata.append("comment", comment);
  formdata.append("user_id", b.id);
  formdata.append("group_id", group_id);
  formdata.append("parent_comment_id", id);

  var requestOptions: any = {
    method: "POST",
    headers: myHeaders,
    body: formdata,
    redirect: "follow",
  };

  await fetch(api.url2 + `comment/reply?comment`, requestOptions)
    .then((response) => response.json())
    .then(async (result) => {
      if(result?.status === 401){
        logout();
      }
      resData = result;
      console.log("res comments", resData);
    })
    .catch((error) => console.log("error", error));

  return resData;
};

export const updateComment = async (id: any, comment: any, group_id: any) => {
  let resData;
  var a: any = localStorage.getItem("@token");
  var b: any = localStorage.getItem("@user");
  console.log("token", a);
  a = JSON.parse(a);
  b = JSON.parse(b);
  console.log("user", b.id);
  let token = await decrypt(a);
  console.log("token", token);

  var myHeaders = new Headers();
  myHeaders.append(
    "Authorization",
    `Bearer`+token
      );

  myHeaders.append("Cookie", "mode=day");

  var formdata = new FormData();
  formdata.append("comment", comment);
  formdata.append("user_id", b.id);
  formdata.append("group_id", group_id);
  formdata.append("comment_id", id);

  var requestOptions: any = {
    method: "POST",
    headers: myHeaders,
    body: formdata,
    redirect: "follow",
  };

  await fetch(api.url2 + `comment/update/${id}`, requestOptions)
    .then((response) => response.json())
    .then(async (result) => {
      if(result?.status === 401){
        logout();
      }
      resData = result;
      console.log("res comments", resData);
    })
    .catch((error) => console.log("error", error));

  return resData;
};

export const updateCommentReply = async (
  id: any,
  comment: any,
  group_id: any
) => {
  let resData;
  var a: any = localStorage.getItem("@token");
  var b: any = localStorage.getItem("@user");
  console.log("token", a);
  a = JSON.parse(a);
  b = JSON.parse(b);
  console.log("user", b.id);
  let token = await decrypt(a);
  console.log("token", token);

  var myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer` + token);
  myHeaders.append("Cookie", "mode=day");

  var formdata = new FormData();
  formdata.append("comment", comment);
  formdata.append("user_id", b.id);
  formdata.append("group_id", group_id);
  formdata.append("comment_id", id);

  var requestOptions: any = {
    method: "POST",
    headers: myHeaders,
    body: formdata,
    redirect: "follow",
  };

  await fetch(api.url2 + `comment/reply/update/${id}`, requestOptions)
    .then((response) => response.json())
    .then(async (result) => {
      if(result?.status === 401){
        logout();
      }
      resData = result;
      console.log("res comments", resData);
    })
    .catch((error) => console.log("error", error));

  return resData;
};
