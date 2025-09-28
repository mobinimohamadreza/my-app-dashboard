import styled from "@emotion/styled";

type ButtonProps = {
    variant?: "primary" | "secondary" | "outline";
    size?: "small" | "medium" | "large" | "circle";
};

const UiButton = styled.button<ButtonProps>`
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 16px;
  font-weight: 500;

  ${({ size }) =>
    size === "small" &&
    `
      padding: 6px 12px;
      font-size: 20px;
      border-radius: 30px;
      min-width: 116px;
  `}
  ${({ size }) =>
    size === "medium" &&
    `
      padding: 10px 20px;
      font-size: 20px;
      border-radius: 40px;
      min-width: 140px;
  `}
  ${({ size }) =>
    size === "large" &&
    `
      padding: 15px 30px;
      font-size: 24px;
      border-radius: 60px;
      min-width: 200px;
      height: 70px;
  `}
  ${({ size }) =>
    size === "circle" &&
    `
      width: 70px;
      height: 70px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
  `}

  ${({ variant }) =>
    variant === "primary" &&
    `
      background: #000;
      color: #fff;
      gap: 16px;
      display: flex;
      align-items: center;
      justify-content: center;
      &:hover {
        background: gray;
      }
  `}
  ${({ variant }) =>
    variant === "secondary" &&
    `
      background: transparent;
      border: 1px solid #000;
      color: #000;
      &:hover {
        background: rgba(0,0,0,0.05);
      }
  `}
  ${({ variant }) =>
    variant === "outline" &&
    `
      background: transparent;
      border: 2px dashed #000;
      color: #000;
      &:hover {
        background: rgba(0,0,0,0.1);
      }
  `}
`;
export default UiButton;
