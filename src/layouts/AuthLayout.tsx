import styled from "@emotion/styled";
import { Outlet } from "react-router-dom";

const Wrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
`;



export function AuthLayout() {
    return (
        <Wrapper>
                <Outlet />
        </Wrapper>
    );
}
