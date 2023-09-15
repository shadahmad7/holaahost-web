import { any } from "prop-types";
import React from "react";
import { api } from "../config/api";
import { decrypt, logout } from "./authAction";

export const getAllEvents = async () => {
  let resData;
  const url = `${api.url2}events`;

  let response = await fetch(url);

  resData = response.json();

  console.log("Event", resData);
  return resData;
};

export const createEvent = async (
  event_name: any,
  event_location: any,
  lat: any,
  long: any,
  event_type: any,
  event_catgeory_id: any,
  event_rsvp: any,
  event_free: any,
  event_price: any,
  event_seats: any,
  event_start_time: any,
  event_end_time: any,
  event_image: any,
  event_description: any
) => {
  console.log(
    "KKKKK",
    event_name,
    event_location,
    lat,
    long,
    event_type,
    event_catgeory_id,
    event_rsvp,
    event_free,
    event_price,
    event_seats,
    event_start_time,
    event_end_time,
    event_image,
    event_description
  );
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
  formdata.append("event_name", event_name);
  formdata.append("event_type", event_type);
  formdata.append("event_location", event_location);
  formdata.append("event_lat", lat);
  formdata.append("event_long", long);
  formdata.append("event_start_time", event_start_time);
  formdata.append("event_end_time", event_end_time);
  formdata.append("event_seats", event_seats);
  formdata.append("event_free", event_free);
  formdata.append("event_rsvp", event_rsvp);
  formdata.append("event_user_id", b.id);
  formdata.append("event_category_id", event_catgeory_id);
  formdata.append("event_image", event_image);
  formdata.append("event_description", event_description);

  var requestOptions: any = {
    method: "POST",
    headers: myHeaders,
    body: formdata,
    redirect: "follow",
  };

  await fetch(api.url2 + "/events/create", requestOptions)
    .then((response) => response.json())
    .then(async (result) => {
      if (result?.status === 401) {
        logout();
      }
      resData = result.data;
      console.log("event add", result);
    })
    .catch((error) => console.log("error", error));

  return resData;
};

export const updateEvent = async (
  id: any,
  event_name: any,
  event_location: any,
  lat: any,
  long: any,
  event_type: any,
  event_catgeory_id: any,
  event_rsvp: any,
  event_free: any,
  event_price: any,
  event_seats: any,
  event_start_time: any,
  event_end_time: any,
  event_image: any,
  event_description: any
) => {
  console.log(
    "KKKKK",
    event_name,
    event_location,
    lat,
    long,
    event_type,
    event_catgeory_id,
    event_rsvp,
    event_free,
    event_price,
    event_seats,
    event_start_time,
    event_end_time,
    event_image,
    event_description
  );
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
  formdata.append("event_name", event_name);
  formdata.append("event_type", event_type);
  formdata.append("event_location", event_location);
  formdata.append("event_lat", lat);
  formdata.append("event_long", long);
  formdata.append("event_start_time", event_start_time);
  formdata.append("event_end_time", event_end_time);
  formdata.append("event_seats", event_seats);
  formdata.append("event_free", event_free);
  formdata.append("event_rsvp", event_rsvp);
  formdata.append("event_user_id", b.id);
  formdata.append("event_category_id", event_catgeory_id);
  formdata.append("event_image", event_image);
  formdata.append("event_description", event_description);

  var requestOptions: any = {
    method: "POST",
    headers: myHeaders,
    body: formdata,
    redirect: "follow",
  };

  await fetch(api.url2 + `/events/update/${id}`, requestOptions)
    .then((response) => response.json())
    .then(async (result) => {
      if (result?.status === 401) {
        logout();
      }
      resData = result.data;
      console.log("event add", result);
    })
    .catch((error) => console.log("error", error));

  return resData;
};

export const getAllFilteredEvents = async (
  eventCat: any,
  eventDay: any,
  eventDistance: any,
  eventType: any
) => {
  let resData, i, j, k, l;
  console.log("data here", eventCat, eventDay, eventDistance, eventType);

  var formdata = new FormData();
  for (i = 0; i < eventCat.length; i++) {
    formdata.append("event_category_ids[]", eventCat[i]);
  }
  for (j = 0; j < eventDay.length; j++) {
    formdata.append("day[]", eventDay[j]);
  }
  for (k = 0; k < eventType.length; k++) {
    formdata.append("event_type[]", eventType[k]);
  }
  for (l = 0; l < eventDistance.length; l++) {
    formdata.append("event_distance[]", eventDistance[l]);
  }

  var requestOptions: any = {
    method: "POST",
    body: formdata,
    redirect: "follow",
  };

  await fetch(`${api.url2}event/filters`, requestOptions)
    .then((response) => response.json())
    .then((result) => {
      resData = result;
    })
    .catch((error) => console.log("error", error));

  return resData;
};

export const eventById = async (id: any) => {
  console.log("eventt id for eventById", id);

  let resData;
  let b: any = localStorage.getItem("@user");
  var formdata = new FormData();
  console.log("userrrrr", b);

  if (b != null) {
    b = JSON.parse(b);
    formdata.append("user_id", b.id);
  }

  var requestOptions: any = {
    method: "POST",
    body: formdata,
    redirect: "follow",
  };

  await fetch(`${api.url2}events/user/${id}`, requestOptions)
    .then((response) => response.json())
    .then((result) => {
      console.log("resss detail page", result);
      resData = result;
      console.log("resss detail page 2", resData);
    })
    .catch((error) => console.log("error", error));

  return resData;
};

export const addBookmarkEvent = async (id: any) => {
  let resData;

  let b: any = localStorage.getItem("@user");
  b = JSON.parse(b);
  console.log("user", b.id);

  var a: any = localStorage.getItem("@token");
  a = JSON.parse(a);
  let token = await decrypt(a);

  var myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer` + token);

  var formdata = new FormData();
  formdata.append("event_user_id", b.id);
  formdata.append("event_id", id);

  var requestOptions: any = {
    method: "POST",
    body: formdata,
    redirect: "follow",
  };

  await fetch(`${api.url2}profile/eventstore`, requestOptions)
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

export const removeBookmarkEvent = async (id: any) => {
  let resData;

  var a: any = localStorage.getItem("@token");
  console.log("token", a);
  a = JSON.parse(a);
  let token = await decrypt(a);
  console.log("token", token);
  var myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer` + token);

  var requestOptions: any = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };

  await fetch(`${api.url2}profile/eventunsaved/${id}`, requestOptions)
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

export const getAllUpcomingEvents = async (id: any, catId: any) => {
  let resData;

  var formdata = new FormData();
  formdata.append("event_id", id);
  formdata.append("event_category_id", catId);

  var requestOptions: any = {
    method: "POST",
    body: formdata,
    redirect: "follow",
  };

  await fetch(`${api.url2}event/upcoming`, requestOptions)
    .then((response) => response.json())
    .then((result) => {
      resData = result;
    })
    .catch((error) => console.log("error", error));

  return resData;
};
