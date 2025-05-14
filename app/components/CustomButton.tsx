import React from "react";
import { Button as AntdButton, ButtonProps } from "antd";

interface CustomButtonProps extends ButtonProps {}

const CustomButton: React.FC<CustomButtonProps> = (props) => {
  return (
    <AntdButton
      {...props}
      className={` ${props.className || ""}`}
      style={{
        // You can override inline styles, for example:
        backgroundColor: "#e2e8f0",
        borderColor: "#7188A0FF",
        color: "#000000",
        ...props.style
      }}
    >
      <span className="transition-colors hover:text-orange-600 flex flex-row">{props.children}</span>
    </AntdButton>
  );
};

export default CustomButton;
