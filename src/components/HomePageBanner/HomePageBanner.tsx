import { url } from "inspector";
import React, { FC,Fragment, ReactNode, useState } from "react";
import Banner from "images/Banner.png";
import ButtonPrimary from "components/Button/ButtonPrimary";
import Dots from "images/dots.svg";

export interface HomePageBannerProps {
  className?: string;

  
}

const HomePageBanner: FC<HomePageBannerProps> = ({
  className = "",
 
}) => {

  const [open, setOpen] = useState(false);

  React.useEffect(()=> {
loadData();
  },[])

  const loadData = async()=> {
    let a: any = await localStorage.getItem("@user");
    if (a != null) {
setOpen(true)
    }
  }

 
  return (

    
    <div className="flex  justify-center mb-4 pt-2 md:py-2 lg:pb-20 lg:pt-2 ">
      
      {/* column 1 */}
    <div className="w-full">
     <div className="main-banner-box">
      <a href="/create-group" className="lg: cursor-pointer w-190 h-50 main-banner-btn2  ">Create Group</a>
     <div className="dot-1"></div>
     <div className="dot-2"></div>
     <img src={Banner} />
      <div className="box">
        <h1 className="text-6xl h1-color font-bold">Meet New Individuals </h1>
        <p className="pt-5">Who are Intrested In The same things as you.</p>
        {!open && ( 
        <ButtonPrimary className="mt-5 px-50 w-190 h-10 main-banner-btn" href="/login">Join Now</ButtonPrimary>
        )}
      <div className="events-btn">
      <a href="/events" className="mt-5 px-50 w-190 h-10 main-banner-btn1">Events</a>
      </div>

<div className="dot-image">
  <img src={Dots} />
     <div className="dot-3"></div>
</div>
     


      </div>
     </div>
      </div>

      {/* <div className="bg-primary-6000 h-20 w-20 rounded-full"></div>

      <div className="bg-yellow-600 h-8 w-8 rounded-full"></div>


      

      <div className=" items-center h-50 rounded-full main-circle border-primary-6000">
      <div className="bg-primary-6000 p-5  rounded-full inner-circle  border-white">
        
      </div>
      </div> */}

     
      
    

   


     

  </div>

  );
};

export default HomePageBanner;
