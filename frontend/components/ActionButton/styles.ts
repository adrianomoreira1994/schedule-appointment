import styled from "styled-components";
import { shade } from "polished";

type ButtonStyleProps = {
  backgroundColor: string;
  color: string;
};

export const Container = styled.button<ButtonStyleProps>`
  margin-top: 10px;
  margin-right: 5px;
  margin-left: 5px;
  width: auto;
  padding: 10px 15px;
  border-radius: 6px;
  display: flex;
  align-items: center;
  font-weight: bold;
  justify-content: center;
  background-color: ${(p) => p.backgroundColor};
  transition: background-color 0.2s;
  color: ${(p) => p.color};

  &:hover {
    background: ${(p) => shade(0.2, p.backgroundColor)};
  }
`;
