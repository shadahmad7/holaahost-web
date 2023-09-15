import React, { FC, ReactNode, useEffect } from "react";
import { PostDataType, TaxonomyType } from "data/types";

import { CommentType } from "components/CommentCard/CommentCard";

import parse from "html-react-parser";
import { api } from "config/api";
import { useLocation } from "react-router-dom";
import moment from "moment";
import ReactAudioPlayer from 'react-audio-player';
import ReactPlayer from "react-player";
import ButtonSecondary from "components/Button/ButtonSecondary";
import { deleteBlog } from "actions/blogsAction";



export interface LocationState {
  from: {
    pathname: any;
    state: any;
  };
}

export interface PageSingleProps {
  className?: string;
}


let fileEx: any="image" ;
export interface SinglePageType extends PostDataType {
  tags: TaxonomyType[];
  content: string | ReactNode;
  comments: CommentType[];
}

const PageSingle: FC<PageSingleProps> = ({ className = "" }) => {
  let a = `<html>
<head>
  <title>Href Attribute Example</title>
</head>
<body>
  <h1>Href Attribute Example</h1>
  <p>
    <a href="https://www.freecodecamp.org/contribute/">The freeCodeCamp Contribution Page</a> shows you how and where you can contribute to freeCodeCamp's community and growth.
  </p>
</body>
</html>`;
const location = useLocation<LocationState>();

const [loader, setLoader ] = React.useState(false);
const [data, setData ] = React.useState({});
const [blog, setBlog ] = React.useState("");
const [user, setUser ] = React.useState("");
  useEffect(() => {
    loadAll();
  }, []);

  const loadAll = async()=> {
    setLoader(true);
    var a:any = localStorage.getItem("@user");
    a = JSON.parse(a);
    setUser(a.name);
    let resData:any;
    let id = location.state?.blogId;
    console.log("id", id);
    var myHeaders = new Headers();
    myHeaders.append("Cookie", "mode=day");
    
    var requestOptions:any = {
      method: 'GET',
      
      redirect: 'follow'
    };
    
    await fetch(api.url2+`blog/${id}`, requestOptions)
    .then(response => response.json())
    .then(result =>{
      resData = result.data.blog_image;
      console.log("result blog", result)
      setData(result.data);
      setBlog(result.data.blog_desc);
      console.log("type", fileEx)
      })
      .catch(error => console.log('error', error));
      setTimeout(()=> {
      setLoader(false);
      },2000)


      fileEx = resData.split('.').pop();
console.log("user", user);
  }



  const removeBlog= async(id:any, gId:any)=> {
    setLoader(true);
    let deleteBlogRes = await deleteBlog(id);
    console.log("blog delete", deleteBlogRes)
    setTimeout(()=> {
      setLoader(false);
      },2000)
      window.location.href = `/group/${gId}`
  }

  return (
    <>
    {!loader ? ( 
      <div
        className={`nc-PageSingle pt-8 lg:pt-16 ${className}`}
        data-nc-id="PageSingle"
      >
        {/* SINGLE HEADER */}
        <header className="container rounded-xl">
          <div className="">
            <div className="flex justify-between">
              <h1 className="text-4xl">{data?.blog_title}</h1>
              <h1 className="text-md ">Posted on {moment(data?.created_at).format('YYYY-MM-DD HH:mm')}</h1>
            </div>
            <h1 className="text-md py-2">by {data?.admin}</h1>
          </div>
        </header>

        {/* FEATURED IMAGE */}
        {/* <NcImage
          containerClassName="container  my-10 sm:my-12"
          className="object-cover w-1/2 h-1/2 rounded-xl"
          src={SINGLE.featuredImage}
        /> */}
        {fileEx === "mp3" && ( 
        <div className="flex justify-center">
        <ReactAudioPlayer
          src={api.imageUrl2+data?.blog_image}
          autoPlay
          controls
        />
        </div>
        )}
        {fileEx === "mp4" && ( 
        <div className="flex justify-center">
       <ReactPlayer
            url={api.imageUrl2+data?.blog_image}
            playing={true}
            controls={true}
            loop={true}
            muted={true}
            playsinline={true}
            onReady={loader}
          />
        </div>
        )}
         {(fileEx != "mp3" && fileEx!="mp4") && (
         <div className="flex justify-center">
         <img
            className="block object-cover"
            src={api.imageUrl2 + data?.blog_image}
            alt={data?.blog_name}
          />
        </div>
         )}
        <div className="container my-10">
          <p className="py-2">{parse(blog)}</p>
        </div>
        {data?.admin === user && (
        <div className="container  flex justify-end my-10">
<ButtonSecondary className="delete-blog-style text-white text-md" onClick={()=> removeBlog(data?.id, data?.group_id)}>Delete Blog</ButtonSecondary>
        </div>
        )}
      </div>
      ):(
        <div className="w-full h-full  rounded-md px-10 mt-20">
  <div className=" animate-pulse  h-full ">


   <div className="flex w-full justify-between">
      <div className="w-80  bg-gray-300 h-12 rounded-md ">
        </div>
      <div className="w-32 mb-4 bg-gray-300 h-6 rounded-md ">
        </div>
   </div>


     <div className=" my-4  space-y-3">
        <div className="w-16 bg-gray-300 h-6 rounded-md ">
        </div>
        <div className="w-full h-96 bg-gray-300 rounded-md ">
        </div>
    </div>


  </div>
</div>

      )}
    </>
  );
};

export default PageSingle;
function getFileExtension(blog_image: any): any {
  throw new Error("Function not implemented.");
}

