import React, { FC } from "react";
import Heading from "components/Heading/Heading";
import Card12 from "components/Card12/Card12";
import {  getAllUpcomingEvents } from "actions/eventAction";

export interface SingleRelatedPostsProps {
  className?: string;
id?: number;
catId?:number;
}



const SingleRelatedPosts: FC<SingleRelatedPostsProps> = ({
id, catId
}) => {
  const [eventData, setEventData] = React.useState([]);


  React.useEffect(() => {
    openModal();
  }, []);

  const openModal = async() => {
    let action:any = await getAllUpcomingEvents(id, catId);
    console.log("EventData Beforre set", action);
    setEventData(action.data);
    console.log("EventData After set", eventData);
  };



  return (
    <div className="relative bg-neutral-100 dark:bg-neutral-800 py-16 lg:py-28 mt-16 lg:mt-28">
      {/* RELATED  */}
      <div className="container">
        <div>
          <Heading
            className="mb-10 text-neutral-900 dark:text-neutral-50"
            desc=""
          >
            Upcoming events
          </Heading>
          {eventData.length != 0 ? ( 
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
            {eventData.slice(0,4).map((post) => (
              <Card12 key={post.id} post={post} />
            ))}
          </div>
          ):(
            <div>
              <p>Sorry, No results found.</p>
            </div>
          )}
        </div>

   
      </div>
    </div>
  );
};

export default SingleRelatedPosts;
