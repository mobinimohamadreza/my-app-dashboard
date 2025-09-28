import styled from "@emotion/styled";
import { DashboardMain } from "./DashboardMain.tsx";

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    flex: 1;
    height: fit-content;
    margin: 100px 70px;
    align-items: start;
`;

export function DashboardMainPage() {
    return (
        <Wrapper>
            <DashboardMain />
        </Wrapper>
    );
}
