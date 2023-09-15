import ButtonPrimary from "components/Button/ButtonPrimary";
import React, { FC,Fragment, ReactNode, useState } from "react";
import Carousel from "react-elastic-carousel";
import Accordion from "components/Accordion/Accordion"
import { api } from "config/api";

export interface SectionHeroProps {
  className?: string;
  rightImg: string;
  heading: ReactNode;
  subHeading: string;
  btnText: string;
  curr: any;
  imageData:any;
 
}

const SectionHero: FC<SectionHeroProps> = ({
  className = "",
  rightImg,
  heading,
  subHeading,
  btnText,

  
imageData = [
  {
    id:1, 
    name:"Create an event",
    img:api.imageUrl2+`cra1.jpg`,

  },
  {
    id:2,
    name:"Create a group",
    img:api.imageUrl2+`cra2.jpg`,


  },
  {
    id:3,
    name:"Join a group",
    img:api.imageUrl2+`cra3.jpg`,

  },
  
]
}) => {

  const [open, setOpen] = useState(1);
  const [curr, setCurr] = useState(0);
 
  const handleValue = (value:any) => {
   
    setCurr(--value);
    console.log("OOOOO", curr);
    
  };

  return (
    <div
      className={`nc-SectionHero relative ${className} grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 gap-3 md:gap-6`}
      data-nc-id="SectionHero"
    >
      <div>
        <div className="w-screen max-w-full xl:max-w-lg space-y-5 lg:space-y-7 text-sm">
            <h4 className="  text-3xl !leading-tight font-semibold text-neutral-900 md:text-4xl xl:text-3xl dark:text-neutral-100">
              {heading}
            </h4>
            <span className="block text-xl  xs:text-lg text-neutral-6000 dark:text-neutral-400">
              {subHeading}
            </span>
          </div>




<Accordion className="w-100 h-100" handleValue={handleValue}/>
    
{/* accordian */}


          {!!btnText && <ButtonPrimary href="/about">{btnText}</ButtonPrimary>}
      </div>

      <div  className="caraosel">
      <Carousel
        itemsToShow={3}
        // onNextStart={onChange}
        // onPrevStart={onChange}
       
      >
        {imageData.map((pic:any, index:any) => (
          <img
            style={{
              transition:
                curr === index 
                  ? " 700ms ease"
                  : " 300ms ease",
               
              height: curr === index ? "300px" : "250px",
              // width: curr === index ? "500px" : "auto"
            }}
            key={index}
            src={pic.img}
            className="caraousel-img"
           />
        ))}
      </Carousel>
      </div>
    </div>
  );
};

export default SectionHero;
