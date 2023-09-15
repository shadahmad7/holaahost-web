import React, { FC } from "react";
import { Link } from "react-router-dom";


export interface FooterCardProps {
  className?: string;

  
}

const FooterCard: FC<FooterCardProps> = ({
  className = "",
 
}) => {

 
  return (

    
    <div className="footer-card ">
        <div className="container items-center flex justify-between">
      <div className="text-xl">
        Create your own Holaa group.
        </div>
        <div>
<Link to="/create-group" className="footer-card-btn text-md">Create</Link>
        </div>
     </div>
     

  </div>

  );
};

export default FooterCard;
