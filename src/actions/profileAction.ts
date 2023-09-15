import { any } from "prop-types";
import React from "react";
import { api } from "../config/api";
import CryptoJs from "crypto-js";
import { decrypt, logout } from "./authAction";

export const myProfile = async () => {
  let resData;



  var a: any = localStorage.getItem("@token");
  a = JSON.parse(a);
  let token = await decrypt(a);



  var myHeaders = new Headers();
  myHeaders.append(
    "Authorization",
    `Bearer` + token
  );



  var requestOptions: any = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
  };



  await fetch(api.url2 + "api/me", requestOptions)
    .then((response) => response.json())
    .then(async (result) => {
      if (result?.status === 401) {
        logout();
      }
      resData = result
    })
    .catch((error) => console.log("error", error));

  return resData;
};


export const myGroups = async () => {
  let resData;



  let b: any = localStorage.getItem("@user");
  b = JSON.parse(b);

  var a: any = localStorage.getItem("@token");
  a = JSON.parse(a);
  let token = await decrypt(a);



  var myHeaders = new Headers();
  myHeaders.append(
    "Authorization",
    `Bearer` + token
  );



  var requestOptions: any = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
  };
  await fetch(api.url2 + `group-by-user/${b.id}`, requestOptions)
    .then((response) => response.json())
    .then(async (result) => {
      if (result?.status === 401) {
        logout();
      }
      resData = result
    })
    .catch((error) => console.log("error", error));

  return resData;
};


export const myEvents = async () => {
  let resData;


  let b: any = localStorage.getItem("@user");
  b = JSON.parse(b);

  var a: any = localStorage.getItem("@token");
  a = JSON.parse(a);
  let token = await decrypt(a);



  var myHeaders = new Headers();
  myHeaders.append(
    "Authorization",
    `Bearer` + token
  );



  var requestOptions: any = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
  };
  await fetch(api.url2 + `event-by-user/${b.id}`, requestOptions)
    .then((response) => response.json())
    .then(async (result) => {
      if (result?.status === 401) {
        logout();
      }
      resData = result
    })
    .catch((error) => console.log("error", error));

  return resData;
};


export const savedGroups = async () => {
  let resData;



  var a: any = localStorage.getItem("@token");
  a = JSON.parse(a);
  let token = await decrypt(a);
  let b: any = localStorage.getItem("@user");
  b = JSON.parse(b);
  var myHeaders = new Headers();
  myHeaders.append(
    "Authorization",
    `Bearer` + token
  );


  var formdata = new FormData();

  var requestOptions:any = {
    method: 'POST',
    headers: myHeaders,
    body: formdata,
    redirect: 'follow'
  };

  
  await fetch(api.url2 + `profile/savedgroup/${b.id}`, requestOptions)
    .then((response) => response.json())
    .then(async (result) => {
      if (result?.status === 401) {
        logout();
      }
      resData = result
    })
    .catch((error) => console.log("error", error));

  return resData;
};


export const savedEvents = async () => {
  let resData;


 
  var a: any = localStorage.getItem("@token");
  a = JSON.parse(a);
  let token = await decrypt(a);
  let b: any = localStorage.getItem("@user");
  b = JSON.parse(b);
  var myHeaders = new Headers();
  myHeaders.append(
    "Authorization",
    `Bearer` + token
  );

  var formdata = new FormData();

  var requestOptions:any = {
    method: 'POST',
    headers: myHeaders,
    body: formdata,
    redirect: 'follow'
  };
  
  await fetch(api.url2 + `profile/eventsaved/${b.id}`, requestOptions)
    .then((response) => response.json())
    .then(async (result) => {
      if (result?.status === 401) {
        logout();
      }
      resData = result
    })
    .catch((error) => console.log("error", error));

  return resData;
};





export const updateProfile = async (firstName:any, lastName:any, bio:any, facebook:any, instagram:any, twitter:any, youtube:any) => {
  let resData;



  var a: any = localStorage.getItem("@token");
  a = JSON.parse(a);
  let token = await decrypt(a);
  let b: any = localStorage.getItem("@user");
  b = JSON.parse(b);

 
  var myHeaders = new Headers();
  myHeaders.append(
    "Authorization",
    `Bearer` + token
  );

  myHeaders.append("Cookie", "mode=day");
  
  var formdata = new FormData();
  formdata.append("first_name", firstName);
  formdata.append("last_name", lastName);
  formdata.append("bio", bio);
  formdata.append("facebook_link", facebook);
  formdata.append("instagram_link", instagram);
  formdata.append("twitter", twitter);
  formdata.append("youtube", youtube);
  
  var requestOptions:any = {
    method: 'POST',
    headers: myHeaders,
    body: formdata,
    redirect: 'follow'
  };

  
  await fetch(api.url2 + `update-profile/${b.id}`, requestOptions)
    .then((response) => response.json())
    .then(async (result) => {
      if (result?.status === 401) {
        logout();
      }
      resData = result
    })
    .catch((error) => console.log("error", error));

  return resData;
};


export const updateProfilePIc = async (image:any) => {
  let resData;



  var a: any = localStorage.getItem("@token");
  a = JSON.parse(a);
  let token = await decrypt(a);
  let b: any = localStorage.getItem("@user");
  b = JSON.parse(b);

 
  var myHeaders = new Headers();
  myHeaders.append(
    "Authorization",
    `Bearer` + token
  );

  myHeaders.append("Cookie", "mode=day");
  
  var formdata = new FormData();
  formdata.append("photoUrl", image);
  
  var requestOptions:any = {
    method: 'POST',
    headers: myHeaders,
    body: formdata,
    redirect: 'follow'
  };

  await fetch(api.url2 + `update-profileimage/${b.id}`, requestOptions)
    .then((response) => response.json())
    .then(async (result) => {
      if (result?.status === 401) {
        logout();
      }
      resData = result;
      result = result.data;
      console.log("dataat", resData);
      let obj = {id: result.id, name: result.name, email: result.email, photoUrl: result.photoUrl, social: result.social};
      console.log("ddddddd", obj);
      await localStorage.setItem("@user", JSON.stringify(obj));
    })
    .catch((error) => console.log("error", error));

  return resData;
};




export const updatePassword = async (oldPass:any, newPass:any) => {
  let resData;




  var a: any = localStorage.getItem("@token");
  a = JSON.parse(a);
  let token = await decrypt(a);
  let b: any = localStorage.getItem("@user");
  b = JSON.parse(b);

  var myHeaders = new Headers();
  myHeaders.append(
    "Authorization",
    `Bearer` + token
  );


 
  var formdata = new FormData();
formdata.append("old_password", oldPass);
formdata.append("new_password", newPass);
formdata.append("id", b.id);

var requestOptions:any = {
  method: 'POST',
  body: formdata,
  redirect: 'follow'
};
  
  await fetch(api.url2 + `profile/changepassword`, requestOptions)
    .then((response) => response.json())
    .then(async (result) => {
      if (result?.status === 401) {
        logout();
      }
      resData = result
    })
    .catch((error) => console.log("error", error));

  return resData;
};


export const searchGlobal = async (word:any) => {
  let resData;



  var formdata = new FormData();
formdata.append("search", word);

var requestOptions:any = {
  method: 'POST',
  body: formdata,
  redirect: 'follow'
};
  
  await fetch(api.url2 + `search`, requestOptions)
    .then((response) => response.json())
    .then(async (result) => {
      resData = result
    })
    .catch((error) => console.log("error", error));

  return resData;
};