import { EventDataType } from "data/types";
import moment from "moment";
import React, { FC,Fragment, ReactNode, useState } from "react";

export interface EventDetailPageProps {
  className?: string;
post?:EventDataType;
  
}

const EventDetailPage: FC<EventDetailPageProps> = ({
  className = "",
 post
}) => {


  const [open, setOpen] = useState(1);

  React.useEffect(()=> {
console.log("data over her", post);
  },[])
 
  return (

    
    <div className="justify-center mb-4 pt-2 pb-16 md:py-2 lg:pb-20 lg:pt-2 ">

     <h4 className="text-xl text-black font-semibold">what we're about</h4>

      <div className="text-lg my-5 text-black font-normal">
        {post?.event_description}</div>
      

<div className="event-time">
      <div className="flex justify-start ">
    <div>
    <i className="las la-clock mx-1  text-2xl  text-black opacity-100"></i>
    </div>
    <div className="mx-10">
        <div><strong>Start Date: </strong>  {moment(post?.event_start_time).format('LLLL')} IST</div>
        <div></div>
    </div>
</div>
<div className="mt-2 ml-3">
  <div>
    <p>.</p>
    <p>.</p>
    <p>.</p>
  </div>
</div>
<div className="flex justify-start py-5">
    <div>
    <i className="las la-calendar mx-1  text-2xl  text-black opacity-100"></i>
    </div>
    <div className="mx-10 ">
        <div></div>
        <div><strong>End Date: </strong>{moment(post?.event_end_time).format('LLLL')} IST</div>
    </div>
</div>
</div>

  </div>

  );
};

export default EventDetailPage;
