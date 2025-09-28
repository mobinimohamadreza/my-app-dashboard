import styled from "@emotion/styled";
import { useTranslation } from "react-i18next";
import { useUserStore } from "../../../Auth/Store/userStore.ts";
import { jwtDecode } from 'jwt-decode';

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    flex: 1;
    height: fit-content;
    width: 100%;
    background: rgba(255,255,255,0.4);
    align-items: start;
    border-radius: 7px;
    padding: 40px;
`;

const Title = styled.h1`
    font-size: 32px;
    font-weight: bold;
    margin-bottom: 30px;
    color: #333;
`;

const Description = styled.div`
    font-size: 18px;
    line-height: 1.6;
    color: #666;
    margin-bottom: 20px;
`;

export function DashboardMain() {
    const { t } = useTranslation();
    const user = useUserStore((state) => state.user);
    if (!user) {
        return null;
    }
    const decoded:{username:string} = jwtDecode(user.access_token) || '';

    return (
        <Wrapper>
            <Title>
                {t("Hello")}, {decoded.username} 👋🏻
            </Title>
            <Description>
                {t("Welcome")}! I'm very happy you are here,
            </Description>
            <Description>
                I hope you find this dashboard easy and useful to use ☺️
            </Description>
        </Wrapper>
    );
}
