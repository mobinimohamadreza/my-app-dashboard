import {useTranslation} from "react-i18next";
import styled from "@emotion/styled";
import useNetworkStatus from "../Hook/useNetworkStatus.ts";

const NetworkStatusWrapper = styled.div<{ isOnline: boolean }>`
    position: fixed;
    top: 20px;
    right: 20px;
    padding: 12px 20px;
    border-radius: 8px;
    color: white;
    font-weight: bold;
    z-index: 1000;
    transition: all 0.3s ease;
    background: ${props => props.isOnline ? '#4CAF50' : '#f44336'};
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
    display: ${props => props.isOnline ? 'none' : 'block'};
`;

const StatusText = styled.span`
    display: flex;
    align-items: center;
    gap: 8px;
`;

export function NetworkStatus() {
    const online = useNetworkStatus();
    const {t} = useTranslation();

    return (
        <NetworkStatusWrapper isOnline={online}>
            <StatusText>
                {t("common.internetConnectionLost")}
            </StatusText>
        </NetworkStatusWrapper>
    );
}
