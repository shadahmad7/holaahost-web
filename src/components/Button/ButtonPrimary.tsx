import Button, { ButtonProps } from "components/Button/Button";
import React from "react";

export interface ButtonPrimaryProps extends ButtonProps {}

const ButtonPrimary: React.FC<ButtonPrimaryProps> = ({
  className = "",
  ...args
}) => {
  return (
    <Button
      className={`ttnc-ButtonPrimary disabled:bg-opacity-70 bg-primary-6000 hover:bg-yellow-600   text-neutral-50 ${className}`}
      {...args}
    />
  );
};

export default ButtonPrimary;



