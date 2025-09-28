import styled from "@emotion/styled";
import { CreateAttribute } from "../AttributesContainer/CreateAttribute.tsx";

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    flex: 1;
    height: 100%;
    padding: 100px 70px 40px;
    align-items: start;
`;

export function CreateAttributePage() {
    return (
        <Wrapper>
            <CreateAttribute />
        </Wrapper>
    );
}
