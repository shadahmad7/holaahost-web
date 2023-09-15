import { any } from "prop-types";
import React from "react";
import { api } from "../config/api";
import { decrypt, logout } from "./authAction";

export const getAllBlogs = async (id:any) => {
  let resData;
 

  var myHeaders = new Headers();
  console.log("token",myHeaders);

var requestOptions:any = {
  method: 'GET',
  headers: myHeaders,
  redirect: 'follow'
};

await fetch(api.url2 + `group/blogs/${id}`, requestOptions)
.then((response) => response.json())
.then(async (result) => {
  resData = result;
  console.log("res blog", resData);
})
.catch((error) => console.log("error", error));

  return resData;
};






export const createBlog = async (id:any, blog:any, title:any, image:any) => {
  let resData;
  var a:any = localStorage.getItem("@token");
  a = JSON.parse(a);
  console.log("token",a);
  let token = await decrypt(a);
   
  
  var myHeaders = new Headers();
    myHeaders.append(
    "Authorization",
    `Bearer`+token
  );
myHeaders.append("Cookie", "mode=day");

var formdata = new FormData();
formdata.append("blog_title", title);
formdata.append("blog_desc", blog);
formdata.append("group_id", id);
formdata.append("blog_image", image);


  console.log("token",myHeaders);


  var requestOptions:any = {
    method: 'POST',
    headers: myHeaders,
    body: formdata,
    redirect: 'follow'
  };


await fetch(api.url2 + `/blog/create`, requestOptions)
.then((response) => response.json())
.then(async (result) => {
  if(result?.status === 401){
    logout();
  }
  resData = result;
  console.log("res blog", resData);
})
.catch((error) => console.log("error", error));

  return resData;
};


export const deleteBlog = async (id:any) => {
  let resData;
  var a:any = localStorage.getItem("@token");
  a = JSON.parse(a);
  console.log("token",a);
  let token = await decrypt(a);


  var myHeaders = new Headers();
  myHeaders.append(
  "Authorization",
  `Bearer`+token
);


  var requestOptions:any = {
    method: 'DELETE',
    headers: myHeaders,
    redirect: 'follow'
  };
  

await fetch(api.url2 + `blog/delete/${id}`, requestOptions)
.then((response) => response.json())
.then(async (result) => {
  if(result?.status === 401){
    logout();
  }
  resData = result;
  console.log("res del blog", resData);
})
.catch((error) => console.log("error", error));

  return resData;
};