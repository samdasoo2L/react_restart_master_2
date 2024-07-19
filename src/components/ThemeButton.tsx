import { useState } from "react";
import { styled } from "styled-components";

const Button = styled.button`
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 25px;
  top: 10px;
  left: 10px;
  height: 45px;
  width: 45px;
  margin: 10px;
  background-color: ${(props) => props.theme.textBoxColor};
  border-radius: 50%;
  border: 1px solid ${(props) => props.theme.textBoxColor};
`;

interface ITheme {
  theme: boolean;
  onClick: () => void;
}

function ThemeButton({ theme, onClick }: ITheme) {
  return <Button onClick={onClick}>{theme ? "🌝" : "🌚"}</Button>;
}

export default ThemeButton;
