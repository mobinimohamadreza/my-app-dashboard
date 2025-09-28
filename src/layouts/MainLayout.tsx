import styled from "@emotion/styled";
import { Outlet } from "react-router-dom";
import { Sidebar } from "../Module/Dashboard/Component/Sidebar/Sidebar.tsx";

const Wrapper = styled.div`
    display: flex;
    flex-direction: row;
    width: 100%;
    height: 100vh;
    overflow: hidden;
`;

const MainArea = styled.div`
    flex: 1;
    margin-left: 300px;
    overflow-y: auto;
`;

export function MainLayout() {
    return (
        <Wrapper>
            <Sidebar />
            <MainArea>
                <Outlet />
            </MainArea>
        </Wrapper>
    );
}
