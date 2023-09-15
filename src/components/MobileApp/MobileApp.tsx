import React, { FC } from "react";
import Mobile from "images/Mobile.png";
import AppStore from "images/appstore.png";
import PlayStore from "images/playstore.png";


export interface MobileAppProps {
  className?: string;
}

const MobileApp: FC<MobileAppProps> = ({ className = "" }) => {
  return (
    <div
      className={`nc-SectionSubscribe2 relative flex flex-col lg:flex-row items-center ${className}`}
      data-nc-id="SectionSubscribe2"
    >

<div className="flex-grow relative">
        <img src={Mobile}  />
        <div className="mobile-reference">
            <h1 className="text-3xl font-semibold">Keep communication.</h1>
            <h1 className="text-3xl font-semibold">Download <span className="text-4xl text-black font-bold">Holaa<span className="text-4xl text-yellow-600 font-bold">Host</span></span></h1>
        </div>
        <div className="flex gap-2 items-center mobile-reference-2">
            <img src={PlayStore}  width="150" height="15" className="cursor-pointer" />
            <img src={AppStore} width="150" height="13" className="cursor-pointer" />
        </div>
      </div>
     
      
    </div>
  );
};

export default MobileApp;
