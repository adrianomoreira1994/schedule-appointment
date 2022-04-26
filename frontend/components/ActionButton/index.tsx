import React, { ReactNode, ButtonHTMLAttributes } from "react";

import { Container } from "./styles";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  backgroundColor: string;
  color: string;
  children: ReactNode;
};

const ActionButton: React.FC<ButtonProps> = ({
  backgroundColor,
  color,
  children,
  ...rest
}) => {
  return (
    <Container {...rest} backgroundColor={backgroundColor} color={color}>
      {children}
    </Container>
  );
};

export default ActionButton;
