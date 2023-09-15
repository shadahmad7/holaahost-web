import { any } from "prop-types";
import React from "react";
import { api } from "../config/api";
import { decrypt, logout } from "./authAction";

export const getAllGroups = async () => {
  let resData;
 
  var myHeaders = new Headers();
  

  var requestOptions: any = {
    method: "GET",
    
    headers: myHeaders,
    redirect: "follow",
  };

  resData = fetch(`${api.url2}groups`, requestOptions)
    .then((response) => response.json())
    .then((result) => {
   
      return result;
    })
    .catch((error) => console.log("error", error));

  return resData;
};






export const createGroup = async (
  groupName: any,
  groupImage: any,
  groupLocation: any,
  groupLat:any,
  groupLong:any,
  groupCategory: any,
  groupDescription: any,
) => {
  let resData;
  console.log(
    "KKKKK",
    groupName,
    groupImage,
    groupLocation,
    groupLat,
    groupLong,
    groupCategory,
    groupDescription,
  );

  let a: any = localStorage.getItem("@token");
   a = JSON.parse(a);
  let token = await decrypt(a);
  console.log("token",token);
  let b: any = localStorage.getItem("@user");
  b = JSON.parse(b);
  var myHeaders = new Headers();
  myHeaders.append(
    "Authorization",
    `Bearer`+token
      );

  var formdata = new FormData();
formdata.append("group_name", groupName);
formdata.append("group_image", groupImage);
formdata.append("group_location", groupLocation);
formdata.append("group_description", groupLocation);
formdata.append("group_user_id", b.id);
formdata.append("group_category_id", groupCategory);
formdata.append("group_lat", groupLat);
formdata.append("group_long", groupLong);

var requestOptions:any = {
  method: 'POST',
  headers: myHeaders,
  body: formdata,
  redirect: 'follow'
};

  await fetch(api.url2 + "group/create", requestOptions)
    .then((response) => response.json())
    .then(async (result) => {
      if (result?.status === 401) {
        logout();
      }
      resData = result;
      //  console.log("JKNJK", result);
    })
    .catch((error) => console.log("error", error));

  return resData;
};




export const updateGroup = async (
  id:any,
  groupName: any,
  groupImage: any,
  groupLocation: any,
  groupLat:any,
  groupLong:any,
  groupCategory: any,
  groupDescription: any,
) => {
  let resData;
  console.log(
    "KKKKK",
    groupName,
    groupImage,
    groupLocation,
    groupLat,
    groupLong,
    groupCategory,
    groupDescription,
  );

  let a: any = localStorage.getItem("@token");
   a = JSON.parse(a);
  let token = await decrypt(a);
  console.log("token",token);
  let b: any = localStorage.getItem("@user");
  b = JSON.parse(b);
  var myHeaders = new Headers();
  myHeaders.append(
    "Authorization",
    `Bearer`+token
      );

  var formdata = new FormData();
formdata.append("group_name", groupName);
formdata.append("group_image", groupImage);
formdata.append("group_location", groupLocation);
formdata.append("group_description", groupLocation);
formdata.append("group_user_id", b.id);
formdata.append("group_category_id", groupCategory);
formdata.append("group_lat", groupLat);
formdata.append("group_long", groupLong);

var requestOptions:any = {
  method: 'POST',
  headers: myHeaders,
  body: formdata,
  redirect: 'follow'
};

  await fetch(api.url2 + `group/update/${id}`, requestOptions)
    .then((response) => response.json())
    .then(async (result) => {
      if (result?.status === 401) {
        logout();
      }
      resData = result;
      //  console.log("JKNJK", result);
    })
    .catch((error) => console.log("error", error));

  return resData;
};






export const getGroupById = async (id: any) => {



  let resData, requestOptions:any;
  let a: any = await localStorage.getItem("@user");
    console.log("userr", a)
    let formdata = new FormData();

    if (a != null) {
      a = JSON.parse(a);
      formdata.append("user_id", a.id);

    }

    requestOptions = {
      method: "POST",
      body: formdata,
      redirect: "follow",
    };

    console.log("fomr", formdata)

await fetch(`${api.url2}group/user/${id}`, requestOptions)
    .then((response) => response.json())
    .then((result) => {
      console.log("Group Detail", result);
      resData = result;
    })
    .catch((error) => console.log("error", error));

  return resData;
};

export const getAllFilteredGroups = async (
  groupCat: any,
  groupDistance: any
) => {
  let resData, i, j;
  console.log("dta here", groupCat, groupDistance);

  var formdata = new FormData();
  for (i = 0; i < groupCat.length; i++) {
    formdata.append("group_category_ids[]", groupCat[i].catId);
    console.log("hhh", groupCat[i].catId);
  }
  for (j = 0; j < groupDistance.length; j++) {
    formdata.append("group_distance[]", groupDistance[j]);
    console.log("hhh", groupDistance[j]);
  }

  var requestOptions: any = {
    method: "POST",
    body: formdata,
    redirect: "follow",
  };

  await fetch(`${api.url2}group/filters`, requestOptions)
    .then((response) => response.json())
    .then((result) => {
      resData = result;
    })
    .catch((error) => console.log("error", error));

  return resData;
};

export const getAllRelatedGroups = async (id: any, cat: any) => {
  let resData;
  var formdata = new FormData();
  formdata.append("group_id", id);
  formdata.append("group_category_id", cat);

  var requestOptions: any = {
    method: "POST",
    body: formdata,
    redirect: "follow",
  };

  resData = fetch(`${api.url2}relatedgroups`, requestOptions)
    .then((response) => response.json())
    .then((result) => {
      // if (!(result.status === 200)) {
      //   return {
      //     status: 0,
      //     message: "Group data not found",
      //   };
      // }
      return result;
    })
    .catch((error) => console.log("error", error));

  return resData;
};


export const addBookmark = async (id: any) => {
  let resData;

  let b: any = localStorage.getItem("@user");
  b = JSON.parse(b);
console.log("user", b.id)


var a: any = localStorage.getItem("@token");
a = JSON.parse(a);
let token = await decrypt(a);
var myHeaders = new Headers();
myHeaders.append("Authorization", `Bearer` + token);


  var formdata = new FormData();
  formdata.append("group_id", id);
  formdata.append("group_user_id", b.id);

 
  var requestOptions:any = {
    method: 'POST',
    headers: myHeaders,
    body: formdata,
    redirect: 'follow'
  };

  await fetch(`${api.url2}profile/groupstore`, requestOptions)
  .then((response) => response.json())
  .then((result) => {
    if (result?.status === 401) {
      logout();
    }
    resData = result;
  })
  .catch((error) => console.log("error", error));

  return resData;
};


export const removeBookmark = async (id: any) => {
  let resData;


   var a:any = localStorage.getItem("@token");
  console.log("token",a);
  a = JSON.parse(a);
  let token = await decrypt(a);
  console.log("token",token);
  var myHeaders = new Headers();
  myHeaders.append(
    "Authorization",
    `Bearer`+token
      );

  var requestOptions:any = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
  };

  await fetch(`${api.url2}profile/groupunsaved/${id}`, requestOptions)
  .then((response) => response.json())
  .then((result) => {
    if (result?.status === 401) {
      logout();
    }
    resData = result;
  })
  .catch((error) => console.log("error", error));

  return resData;
};
