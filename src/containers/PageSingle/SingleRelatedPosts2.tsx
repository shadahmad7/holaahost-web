import React, { FC } from "react";
import Heading from "components/Heading/Heading";
import Card11 from "components/Card11/Card11";

import {  getAllRelatedGroups } from "actions/groupsAction";

export interface SingleRelatedPostsProps {
  className?: string;
id? : number;
cat?: number;
}



const SingleRelatedPosts2: FC<SingleRelatedPostsProps> = ({
  className,
id,
cat
}) => {
  const [groupData, setGroupData] = React.useState([]);


  React.useEffect(() => {
    openModal();
  }, []);

  const openModal = async() => {
    let action = await getAllRelatedGroups(id, cat);
    console.log(" related GroupData Beforre set", action);
    setGroupData(action.data.data);
    console.log("related GroupData After set", groupData);
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
            Related groups
          </Heading>
          {groupData.length != 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
            {groupData.slice(0,4).map((post) => (
                
              <Card11 key={post.id} post={post} />
            ))}
          </div>
          ):(
            <div>
              <p>Sorry, no results found</p>
              </div>
          )}
        </div>

   
      </div>
    </div>
  );
};

export default SingleRelatedPosts2;
