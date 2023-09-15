import { SOCIALS_2 } from "components/SocialsList/SocialsList";
import { SocialType } from "components/SocialsShare/SocialsShare";
import React, { FC } from "react";

export interface SocialsList1Props {
  className?: string;
}

const socials: SocialType[] = SOCIALS_2;

const SocialsList1: FC<SocialsList1Props> = ({ className = "space-y-6" }) => {
  const renderItem = (item: SocialType, index: number) => {
    return (
      <a
        href={item.href}
        className="flex items-center text-3xl text-white hover:text-yellow-600  dark:text-neutral-300 dark:hover:text-white leading-none space-x-6  footer-social-2 group"
        key={index}
      >
        <i className={item.icon}></i>
        <span className="hidden lg:block text-xs ">{item.name}</span>
      </a>
    );
  };

  return (
    <div className={`nc-SocialsList1 ${className}`}  data-nc-id="SocialsList1">
      {socials.map(renderItem)}
    </div>
  );
};

export default SocialsList1;
