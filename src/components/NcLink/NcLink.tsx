import React, { FC } from "react";
import { Link, LinkProps } from "react-router-dom";

export interface NcLinkProps extends LinkProps {
  className?: string;
  colorClass?: string;
}

const NcLink: FC<NcLinkProps> = ({
  className = "font-medium",
  colorClass = "main-color ",
  children,
  ...args
}) => {
  return (
    <Link
      className={`nc-NcLink ${colorClass} ${className}`}
      data-nc-id="NcLink"
      {...args}
    >
      {children}
    </Link>
  );
};

export default NcLink;
