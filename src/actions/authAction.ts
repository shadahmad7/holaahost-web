import { any } from "prop-types";
import React from "react";
import { api } from "../config/api";
import CryptoJs from "crypto-js";

export const loginAction = async (email: any, password: any) => {
  let resData;
  console.log("KKKKK", email, password);
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("Cookie", "mode=day");

  var raw = JSON.stringify({
    email,
    password,
  });

  var requestOptions: any = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  await fetch(api.url2 + "api/login", requestOptions)
    .then((response) => response.json())
    .then(async (result) => {
      resData = result, 
      resData.access_token = await encrypt(resData.access_token);

      await localStorage.setItem("@token", JSON.stringify(resData.access_token));
      await localStorage.setItem("@user", JSON.stringify(resData.user));
    })
    .catch((error) => console.log("error", error));

  return resData;
};

export const registerAction = async (name: any, email: any, password: any, photoUrl:any, social:any) => {
  let resData;
  console.log("NEWWWW", name, email, password, photoUrl, social);
  var myHeaders = new Headers();
myHeaders.append("Cookie", "mode=day");

var formdata = new FormData();
formdata.append("email", email);
formdata.append("password", password);
formdata.append("name", name);
formdata.append("photoUrl", photoUrl);
formdata.append("social", social);

var requestOptions:any = {
  method: 'POST',
  headers: myHeaders,
  body: formdata,
  redirect: 'follow'
};

  await fetch(api.url2 + "api/register", requestOptions)
    .then((response) => response.json())
    .then(async (result) => {
      console.log("Register", result);

      resData = result;
    })
    .catch((error) => console.log("error", error));

  return resData;
};



export const encrypt = async (token: any) => {
  var encrypted = CryptoJs.AES.encrypt(token, api.key).toString();
  console.log("ENC", encrypted);
  return encrypted;
};

export const decrypt = async (token: any) => {
  var decrypted = CryptoJs.AES.decrypt(token, api.key).toString(
    CryptoJs.enc.Utf8
  );
  console.log("DEC", decrypted);
  return decrypted;
};





export const updatePasswordFromLogin = async ( newPass:any, token:any, email:any) => {
  let resData;
  var myHeaders = new Headers();
  myHeaders.append(
    "Authorization",
    `Bearer`+token
      );
  var formdata = new FormData();
formdata.append("email", email);
formdata.append("password", newPass);

var requestOptions:any = {
  method: 'POST',
  headers: myHeaders,
  body: formdata,
  redirect: 'follow'
};
  await fetch(api.url2 + `password/reset`, requestOptions)
    .then((response) => response.json())
    .then(async (result) => {
      resData = result
    })
    .catch((error) => console.log("error", error));

  return resData;
};


export const forgotPassword = async ( email:any) => {
  let resData;
  var myHeaders = new Headers();
  myHeaders.append("Cookie", "mode=day");
  
  var formdata = new FormData();
  formdata.append("email", email);
  
  var requestOptions:any = {
    method: 'POST',
    headers: myHeaders,
    body: formdata,
    redirect: 'follow'
  };

  await fetch(api.url2 + `password/email`, requestOptions)
    .then((response) => response.json())
    .then(async (result) => {
      resData = result
    })
    .catch((error) => console.log("error", error));

  return resData;
};


export const logout = async ( ) => {
  localStorage.removeItem("@token");
  localStorage.removeItem("@user");
  localStorage.removeItem("@firebaseUser");
  localStorage.removeItem("@chatUser");
  window.location.href =  "/login"
};
