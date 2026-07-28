import React from "react";

type buttonProps = {
  data: string;
  action: () => void;
};

const Button = ({ data, action }: buttonProps) => {
  return <div>Button</div>;
};

export default Button;
