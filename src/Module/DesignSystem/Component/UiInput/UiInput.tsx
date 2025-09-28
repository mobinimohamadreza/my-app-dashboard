import styled from "@emotion/styled";
const UiInput = styled.input`
    width: 100%;
    margin-bottom: 20px;
    padding: 15px 40px;
    border-radius: 40px;
    height: 70px;
    background: rgba(0, 0, 0, 0.02);
    transition: all 0.3s ease-in-out;
    border: 0;
    color: #000;

    &::placeholder {
        color: rgba(0, 0, 0, 0.2);
        font-weight: bold;
    }

    &:focus {
        outline: none;
        box-shadow: 0 3px 3px rgba(0, 0, 0, 0.2);
    }
`;

export default UiInput;
