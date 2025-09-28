import styled from "@emotion/styled";
import { useTranslation } from "react-i18next";

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;

`;

const Title = styled.h1`
    font-size: 32px;
    font-weight: bold;
    margin-bottom: 30px;
    color: #333;
`;


export function ProductsContainer() {
    const { t } = useTranslation();

    return (
        <Wrapper>
            <Title>{t("Products")}</Title>
        </Wrapper>
    );
}
