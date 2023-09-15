import LogoSvg from "components/Logo/LogoSvg";
import React, { FC, useEffect, useRef, useState } from "react";

export interface DrawerProps {
  children: any;
  isOpen: boolean;
  setIsOpen: (e: any) => void;
}

const Drawer: FC<DrawerProps> = ({ children, isOpen, setIsOpen }) => {
  React.useEffect(() => {
    console.log("herrgfhfe", isOpen, setIsOpen, children);
  }, []);
  return (
    <main
      className={
        " fixed overflow-hidden z-10 bg-gray-900 bg-opacity-25 inset-0 transform ease-in-out " +
        (isOpen
          ? " transition-opacity opacity-100 duration-500 translate-x-0  "
          : " transition-all delay-500 opacity-0 translate-x-full  ")
      }
    >
      <section
        className={
          " w-full max-w-lg right-0 absolute bg-white h-full shadow-xl delay-400 duration-500 ease-in-out transition-all transform  " +
          (isOpen ? " translate-x-0 " : " translate-x-full ")
        }
      >
        <article className="relative w-screen max-w-lg pb-10 flex flex-col space-y-6 overflow-y-scroll h-full">
          <div
            className="ml-5 mt-3 mx-2 flex  items-center "
            onClick={() => {
              setIsOpen(false), console.log("FFFF", isOpen);
            }}
          >
            <span className="mr-5">x</span>
            <LogoSvg />
          </div>
          {children}
        </article>
      </section>
      <section
        className=" w-screen h-full cursor-pointer "
        onClick={() => {
          setIsOpen(false), console.log("FFFF", isOpen);
        }}
      ></section>
    </main>
  );
};

export default Drawer;
