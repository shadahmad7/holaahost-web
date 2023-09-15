import { any } from "prop-types";
import React from "react";
import { api } from "../config/api";
import { decrypt, logout } from "./authAction";




export const getAllAttendees = async (id: any) => {
  console.log("event id", id);
  let resData;
  var requestOptions: any = {
    method: "GET",
    redirect: "follow",
  };
  await fetch(`${api.url2}event/attendees/${id}`, requestOptions)
    .then((response) => response.json())
    .then((result) => {
      resData = result;
      console.log("resss", result);
    })
    .catch((error) => console.log("error", error));

  return resData;
};





export const getAllRequestedAttendees = async (id: any) => {
  console.log("id", id);

  let resData;
  var a: any = localStorage.getItem("@token");
  a = JSON.parse(a);
  let token = await decrypt(a);
  var myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer` + token);
  myHeaders.append("Cookie", "mode=day");


  var requestOptions: any = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };


  await fetch(`${api.url2}event/pendingattendees/${id}`, requestOptions)
    .then((response) => response.json())
    .then((result) => {
      resData = result;
      console.log("resss", result);
      if(result?.status === 401){
        logout();
      }
    })
    .catch((error) => console.log("error", error));

  return resData;
};


//Used to accept request of event claims


export const acceptRequest = async (id: any) => {
  console.log("id", id);

  let resData;
  var a: any = localStorage.getItem("@token");
  a = JSON.parse(a);
  let token = await decrypt(a);
  var myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer` + token);
  myHeaders.append("Cookie", "mode=day");

  var requestOptions: any = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };
  await fetch(`${api.url2}event/acceptattendess/${id}`, requestOptions)
    .then((response) => response.json())
    .then((result) => {
      resData = result;
      if(result?.status === 401){
        logout();
      }
      console.log("resss", result);
    })
    .catch((error) => console.log("error", error));

  return resData;
};

//Used to delet request of event 

export const rejectRequest = async (id: any) => {
  console.log("id", id);
  let resData;
  var a: any = localStorage.getItem("@token");
  a = JSON.parse(a);
  let token = await decrypt(a);
  var myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer` + token);
  myHeaders.append("Cookie", "mode=day");

  var requestOptions: any = {
    method: "DELETE",
    headers: myHeaders,
    redirect: "follow",
  };

  await fetch(`${api.url2}attendees/delete/${id}`, requestOptions)
    .then((response) => response.json())
    .then((result) => {
      resData = result;
      if(result?.status === 401){
        logout();
      }
      console.log("resss", result);
    })
    .catch((error) => console.log("error", error));

  return resData;
};




//Used to claim for the seat


export const claimRequest = async (id: any) => {
  console.log("id", id);

  let resData;

  var a: any = localStorage.getItem("@token");
  a = JSON.parse(a);
  let token = await decrypt(a);
  let b: any = localStorage.getItem("@user");
  b = JSON.parse(b);

  var myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer` + token);
  myHeaders.append("Cookie", "mode=day");

  var formdata = new FormData();
  formdata.append("attendees_role", "Staff");
  formdata.append("attendees_user_id", b.id);
  formdata.append("attendees_event_id", id);

  var requestOptions:any = {
    method: "POST",
    headers: myHeaders,
    body: formdata,
    redirect: "follow",
  };

  await fetch(`${api.url2}attendees/create`, requestOptions)
    .then((response) => response.json())
    .then((result) => {
      if(result?.status === 401){
        logout();
      }
      resData = result;
      console.log("resss", result);
    })
    .catch((error) => console.log("error", error));

  return resData;
};
