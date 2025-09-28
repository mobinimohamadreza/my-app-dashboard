import styled from "@emotion/styled";
import {useTranslation} from "react-i18next";
import {useEffect, useState} from "react";
import {useUserStore} from "../../../Auth/Store/userStore.ts";
import {useNavigate} from "react-router-dom";
import {UiButton} from "../../../DesignSystem/Component/UiButton";

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
`;
const WrapperHeader = styled.div`
    display: flex;
    flex-direction: row;
    width: 100%;
    justify-content: space-between;
    align-items: center;
`;
const Title = styled.h1`
    font-size: 32px;
    font-weight: bold;
    margin-bottom: 30px;
    color: #333;
`;

const TableWrapper = styled.div`
    border-radius: 40px;
    overflow: hidden;
    border: 1px solid #fff;
    background: #fff;
    margin: 20px 0;
`;

const Table = styled.table`
    width: 100%;
    border-collapse: collapse;
    border-style: hidden;
`;

const TableHeader = styled.th`
    background: #efefef;
    padding: 20px 15px;
    text-align: center;
    font-weight: 600;
    color: #333;
    border: 1px solid #fff;
    font-size: 18px;

    &:first-of-type {
        border-left: none;
    }

    &:last-of-type {
        border-right: none;
    }
`;

const TableCell = styled.td`
    padding: 20px 15px;
    text-align: center;
    color: #000;
    font-size: 16px;
    background: rgba(0, 0, 0, 0.02);
    border: 1px solid #fff;

    &:first-of-type {
        border-left: none;
    }

    &:last-of-type {
        border-right: none;
    }
`;

const TableRow = styled.tr`
    &:hover {
        background: rgba(248, 249, 250, 0.5);
    }

    &:last-child {
        td {
            border-bottom: none;
        }
    }

    &:first-child {
        th {
            border-top: none;
        }
    }
`;

const ValuesList = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
`;

const NoData = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    font-size: 40px;
`;

const ValueTag = styled.span`
    font-size: 14px;
    color: #333;
`;


const LoadingText = styled.div`
    text-align: center;
    padding: 40px;
    color: #666;
    font-size: 18px;
`;

const ErrorText = styled.div`
    text-align: center;
    padding: 40px;
    color: #dc3545;
    font-size: 18px;
`;


interface Attribute {
    key: string;
    name: string;
    values: string[];
}

export function AttributesContainer() {
    const {t} = useTranslation();
    const navigate = useNavigate();
    const [attributes, setAttributes] = useState<Attribute[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchAttributes = async () => {
        try {
            setLoading(true);
            setError(null);
            const token = useUserStore.getState().user?.access_token;


            if (!token) {
                throw new Error(`${t("common.tokenNotFound")}`);
            }

            const response = await fetch("https://nak-interview.darkube.app/attributes", {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            });


            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`${t("common.errorReceiving")} ${response.status} - ${errorText}`);
            }

            const data = await response.json();

            setAttributes(data);
        } catch (err) {
            setError(err instanceof Error ? err.message : `${t("common.error")}`);
        } finally {
            setLoading(false);
        }
    };


    useEffect(() => {
        fetchAttributes();
    }, []);

    const handleAddAttribute = () => {
        navigate("/dashboard/attributes/create");
    };

    if (loading) {
        return (
            <Wrapper>
                <Title>{t("attributes.attributes")}</Title>
                <LoadingText>{t("Loading")}</LoadingText>
            </Wrapper>
        );
    }

    if (error) {
        return (
            <Wrapper>
                <Title>{t("attributes.attributes")}</Title>
                <ErrorText>{error}</ErrorText>
            </Wrapper>
        );
    }

    return (
        <Wrapper>
            <WrapperHeader>
                <Title>{t("attributes.attributes")}</Title>
                <UiButton variant="primary" size="medium" onClick={handleAddAttribute}>
                    {t("attributes.attributes")}
                    <svg  width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M7 14C6.44 14 6 13.56 6 13V1C6 0.44 6.44 0 7 0C7.56 0 8 0.44 8 1V13C8 13.56 7.56 14 7 14Z"
                            fill="white"/>
                        <path
                            d="M13 8.00006H1C0.44 8.00006 0 7.56006 0 7.00006C0 6.44006 0.44 6.00006 1 6.00006H13C13.56 6.00006 14 6.44006 14 7.00006C14 7.56006 13.56 8.00006 13 8.00006Z"
                            fill="white"/>
                    </svg>
                </UiButton>
            </WrapperHeader>
            <TableWrapper>
                <Table>
                    <thead>
                    <tr>
                        <TableHeader></TableHeader>
                        <TableHeader>{t("attributes.name")}</TableHeader>
                        <TableHeader>{t("attributes.values")}</TableHeader>
                    </tr>
                    </thead>
                    <tbody>
                    {attributes.map((attribute, index) => (
                        <TableRow key={attribute.key}>
                            <TableCell>{index + 1}</TableCell>
                            <TableCell>{attribute.name}</TableCell>
                            <TableCell>
                                <ValuesList>
                                    {attribute.values.map((value) => (
                                        <ValueTag key={value}>{value},</ValueTag>
                                    ))}
                                </ValuesList>
                            </TableCell>
                        </TableRow>
                    ))}
                    </tbody>
                </Table>

            </TableWrapper>
            {!attributes.length  && <NoData>no data</NoData> }

        </Wrapper>
    );
}
