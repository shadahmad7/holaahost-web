import React, { FC,Fragment, ReactNode, useState } from "react";

export interface AccordionProps {
  className?: string;
  handleValue:any;
}

const Accordion: FC<AccordionProps> = ({
  className = "",
  handleValue
}) => {

  const [open, setOpen] = useState(1);
 
  const handleOpen = (value:any) => {
    setOpen(open === value ? 0 : value);
   
        let a = value;
        handleValue(a);  
    
   
  };


  return (

    <div className="accordion" id="accordionExample5">

{/* item 1 */}

  <div className="accordion-item my-3 bg-white border border-gray-200">
    <h2 className="accordion-header mb-0" id="headingOne5">
      <button className="
        accordion-button
        relative
        flex
        items-center
        w-full
        py-4
        px-5
        text-base text-gray-800 text-left
        bg-white
        border-0
        
        transition
        focus:outline-none
        justify-between
      " type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne5" aria-expanded="true"
        aria-controls="collapseOne5" onClick={() => handleOpen(1)}>
          <p className="text-lg"><strong>Create an event</strong></p> {open === 1 ? ( <i className="las la-angle-up mx-1  text-sm  text-black opacity-100"></i> ):
          (<i className="las la-angle-down mx-1  text-sm  text-black opacity-100"></i>)}
      </button>
    </h2>

    {open === 1 && ( 
    <div id="collapseOne5" className="accordion-collapse  show" aria-labelledby="headingOne5">
      <div className="accordion-body py-4 px-5">
        <p className="text-black">
          
        This is the first item's accordion body. It is shown by default,
        until the collapse plugin adds the appropriate classes that we use to style each
        element. 
        </p>
      </div>
    </div>
    )}
  </div>

{/* item 1 */}


{/* item 2 */}

  <div className="accordion-item my-3 bg-white border border-gray-200">
    <h2 className="accordion-header mb-0" id="headingTwo5">
      <button className="
        accordion-button
        collapsed
        relative
        flex
        items-center
        w-full
        py-4
        px-5
        text-base text-gray-800 text-left
        bg-white
        border-0
        rounded-none
        transition
        focus:outline-none
        justify-between
      " type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo5" aria-expanded="false"
        aria-controls="collapseTwo5" onClick={() => handleOpen(2)}>
          <p className="text-lg"><strong>Create a group</strong></p>{open === 2 ? ( <i className="las la-angle-up mx-1  text-sm  text-black opacity-100"></i> ):
          (<i className="las la-angle-down mx-1  text-sm  text-black opacity-100"></i>)}
      </button>
    </h2>
    {open === 2 && ( 
    <div id="collapseTwo5" className="accordion-collapse " aria-labelledby="headingTwo5">
      <div className="accordion-body py-4 px-5">
        This is the second item's accordion body. It is hidden by default,
        until the collapse plugin adds the appropriate classes that we use to style each
        element. 
      </div>
    </div>
    )}
  </div>

  {/* item 2 */}


{/* item 3 */}

  <div className="accordion-item my-3 bg-white border border-gray-200">
    <h2 className="accordion-header mb-0" id="headingThree5">
      <button className="
        accordion-button
        collapsed
        relative
        flex
        items-center
        w-full
        py-4
        px-5
        text-base text-gray-800 text-left
        bg-white
        border-0
        rounded-none
        transition
        focus:outline-none
        justify-between
      " type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree5" aria-expanded="false"
        aria-controls="collapseThree5" onClick={() => handleOpen(3)}>
           <p className="text-lg"><strong>Join a group</strong></p>{open === 3 ? ( <i className="las la-angle-up mx-1  text-sm  text-black opacity-100"></i> ):
          (<i className="las la-angle-down mx-1  text-sm  text-black opacity-100"></i>)}
      </button>
    </h2>
    
{open === 3 && ( 
    <div id="collapseThree5" className="accordion-collapse " aria-labelledby="headingThree5">
      <div className="accordion-body py-4 px-5">
        This is the third item's accordion body. It is hidden by default,
        until the collapse plugin adds the appropriate classes that we use to style each
        element. 
      </div>
    </div>
    )}
  </div>

  {/* item 3 */}

</div>

  );
};

export default Accordion;
