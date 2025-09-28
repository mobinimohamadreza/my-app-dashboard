import styled from "@emotion/styled";
import { ProductsContainer } from "../ProductsContainer/ProductsContainer.tsx";

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    flex: 1;
    height: fit-content;
    margin: 100px 70px;
    align-items: start;
`;

export function ProductsPage() {
    return (
        <Wrapper>
            <ProductsContainer />
        </Wrapper>
    );
}
