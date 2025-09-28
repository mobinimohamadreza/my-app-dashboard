import styled from "@emotion/styled";
import { AttributesContainer } from "./AttributesContainer.tsx";

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    flex: 1;
    height: 100%;
    padding: 100px 70px;
`;

export function AttributesPage() {
    return (
        <Wrapper>
            <AttributesContainer />
        </Wrapper>
    );
}
