import { CustomLink } from "data/types";
import React, { FC, useState } from "react";
import { Link } from "react-router-dom";
import twFocusClass from "utils/twFocusClass";


export interface PaginationProps {
  className?: string;
  data?: any
}

const Pagination: FC<PaginationProps> = ({ className = "", data }) => {
  const [page, setPage] = useState(1);
  console.log("Hello Events", data);
  
  const pages = [1,2,3];
 return (
  <nav
  className={`nc-Pagination inline-flex space-x-1 text-base font-medium ${className}`}
>
  {pages.map(pgNumber => (
    <>
       {pgNumber === page ? ( 
          <span
            key={pgNumber}
            className={`inline-flex w-11 h-11 items-center justify-center rounded-full bg-primary-6000 text-white ${twFocusClass()}`}
          >
            {pgNumber}
          </span>
        ):(
    <span
          key={pgNumber}
          className={`inline-flex w-11 h-11 items-center justify-center rounded-full
           bg-white hover:bg-neutral-100 border border-neutral-200 text-neutral-6000
            dark:text-neutral-400 dark:bg-neutral-900 dark:hover:bg-neutral-800 dark:border-neutral-700 ${twFocusClass()}`}
        onClick={() => setPage(pgNumber)}
        >
          {pgNumber}
        </span>
        )}

        </>

  ))}
 
</nav>
  )
}

export default Pagination
