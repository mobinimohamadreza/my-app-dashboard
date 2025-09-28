import styled from "@emotion/styled";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm, useFieldArray } from "react-hook-form";
import { useUserStore } from "../../../Auth/Store/userStore.ts";
import {useTranslation} from "react-i18next";
const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    margin: 0 auto;
    height: 100%;
`;

const Header = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 30px;
`;

const Title = styled.h1`
    font-size: 32px;
    font-weight: bold;
    color: #333;
    margin: 0;
`;


const Form = styled.form`
    display: flex;
    flex-direction: column;
    gap: 25px;
    height: 100%;
    padding: 30px;
    flex:1;
`;

const InputGroup = styled.div`
    display: flex;
    flex-direction: row;
    gap: 10px;
`;

const InputWrapper = styled.div`
    position: relative;width: 100%;
    max-width: 400px;

`;

const Input = styled.input`
    width: 100%;
    padding: 16px 50px;
    border: 1px solid rgba(0,0,0,0.4);
    font-size: 16px;
    border-radius: 40px;
    background: #efefef;
    color: rgba(0,0,0,1);
    position: relative;
    height: 70px;

    &:focus {
        outline: none;
    }
`;

const Label = styled.label`
    position: absolute;
    left: 40px;
    color: #888;
    pointer-events: none;
    transition: 0.2s ease all;
    top: -10px;
    font-size: 14px;
    color: rgba(0,0,0,0.4);
    background: #efefef;
    padding: 0 10px;
    font-weight: bold;
    &::before{
        height: 28px;
        width: 2px;
        background: #000;
        content: "";
        top: 30px;
        left: 0;
        position: absolute;
    }
`;
const ValuesContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 15px;
    max-width: 400px;
    flex: 1;
`;

const ValueInputGroup = styled.div`
    display: flex;
    gap: 12px;
    align-items: center;
    width: 100%;
`;


const AddValueButton = styled.button`
    background: transparent;
    color: #000;
    padding: 15px 20px;
    border-radius: 50%;
    font-size: 16px;
    cursor: pointer;
    transition: all 0.3s ease;
    min-width: 60px;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 70px;
    height: 70px;
    border:1px solid #000;
    align-self: flex-end;
    &:hover {
        background: gray;
        border:1px solid #000;
    }
`;


const ButtonGroup = styled.div`
    display: flex;
    gap: 20px;
    justify-content: space-between;
    margin-top: 30px;
    height: 100%;
    align-items: end;
`;

const Button = styled.button<{ variant?: 'primary' | 'secondary' }>`
    padding: 15px 30px;
    border-radius: 90px;
    font-size: 16px;
    cursor: pointer;
    transition: all 0.3s ease;
    min-width: 200px;
    height: 70px;
    ${props => props.variant === 'primary' ? `
        background: #000;
        color: #fff;
        
        &:hover {
            background: gray;
            border:0;
        }
    ` : `
        background: transparent;
        color: #000;
        border:1px solid #000;
        &:hover {
            background: gray;
                    border:1px solid #000;
        }
    `}
`;

const ErrorMessage = styled.div`
    background: #f8d7da;
    color: #721c24;
    padding: 12px 16px;
    border-radius: 8px;
    border: 1px solid #f5c6cb;
    margin-bottom: 20px;
`;

const SuccessMessage = styled.div`
    background: #d4edda;
    color: #155724;
    padding: 12px 16px;
    border-radius: 8px;
    border: 1px solid #c3e6cb;
    margin-bottom: 20px;
`;

interface FormData {
    name: string;
    values: { value: string }[];
}

interface CreateAttributeProps {
    onSave?: (name: string, values: string[]) => Promise<void>;
}

export function CreateAttribute({ onSave }: CreateAttributeProps) {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);
    const { t } = useTranslation();
    const { register, control, handleSubmit, formState: { errors }, reset } = useForm<FormData>({
        defaultValues: {
            name: "",
            values: [{ value: "" }]
        }
    });

    const { fields, append } = useFieldArray({
        control,
        name: "values"
    });

    const handleAddValue = () => {
        append({ value: "" });
    };

    const onSubmit = async (data: FormData) => {
        setError(null);
        setSuccess(false);

        const filteredValues = data.values
            .map(item => item.value.trim())
            .filter(value => value !== "");

        if (filteredValues.length === 0) {
            setError("At least one value is required.");
            return;
        }

        try {
            setLoading(true);

            const token = useUserStore.getState().user?.access_token;
            if (!token) {
                throw new Error("Token not found");
            }

            const response = await fetch("https://nak-interview.darkube.app/attributes", {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name: data.name,
                    values: filteredValues
                }),
            });

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`${t("Error receiving")} ${response.status} - ${errorText}`);
            }

            setSuccess(true);
            reset();

            if (onSave) {
                await onSave(data.name, filteredValues);
            }

            setTimeout(() => {
                navigate("/dashboard/attributes");
            }, 2000);
        } catch (err) {
            setError(err instanceof Error ? err.message : `${t("Error receiving")}`);
        } finally {
            setLoading(false);
        }
    };

    const handleCancel = () => {
        navigate("/dashboard/attributes");
    };

    return (
        <Wrapper>
            <Header>
                <Title>{t("Attribute")}</Title>
            </Header>
            <Form onSubmit={handleSubmit(onSubmit)}>
                {error && <ErrorMessage>{error}</ErrorMessage>}
                {success && <SuccessMessage>{t("Attribute created successfully!")}</SuccessMessage>}

                <InputGroup>
                    <InputWrapper>
                        <Input
                            id="name"
                            type="text"
                            placeholder=" "
                            {...register("name", { required: `${t("Property name is required")}` })}
                            disabled={loading}
                        />
                        <Label htmlFor="name">Name</Label>
                        {errors.name && <span style={{ color: 'red', fontSize: '12px' }}>{errors.name.message}</span>}
                    </InputWrapper>
                    <ValuesContainer>
                        {fields.map((field, index) => (
                            <ValueInputGroup key={field.id}>
                                <InputWrapper>
                                    <Input
                                        type="text"
                                        placeholder=" "
                                        disabled={loading}
                                        {...register(`values.${index}.value` as const, {
                                            required: `${t("Value is required")}`
                                        })}
                                    />
                                    <Label htmlFor={`value-${index}`}>Value</Label>
                                    {errors.values?.[index]?.value && (
                                        <span style={{ color: 'red', fontSize: '12px' }}>
                                            {errors.values[index]?.value?.message}
                                        </span>
                                    )}
                                </InputWrapper>
                            </ValueInputGroup>
                        ))}
                    </ValuesContainer>
                    <AddValueButton
                        type="button"
                        onClick={handleAddValue}
                        disabled={loading}
                    >
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M10.0001 20C9.2001 20 8.57153 19.3714 8.57153 18.5714V1.42857C8.57153 0.628571 9.2001 0 10.0001 0C10.8001 0 11.4287 0.628571 11.4287 1.42857V18.5714C11.4287 19.3714 10.8001 20 10.0001 20Z" fill="black"/>
                            <path d="M18.5714 11.4287H1.42857C0.628571 11.4287 0 10.8001 0 10.0001C0 9.2001 0.628571 8.57153 1.42857 8.57153H18.5714C19.3714 8.57153 20 9.2001 20 10.0001C20 10.8001 19.3714 11.4287 18.5714 11.4287Z" fill="black"/>
                        </svg>
                    </AddValueButton>
                </InputGroup>
                <ButtonGroup>
                    <Button type="button" onClick={handleCancel} disabled={loading}>
                        {t("Cancel")}
                    </Button>
                    <Button type="submit" variant="primary" disabled={loading}>
                        {loading ? `${t("Saving")}` : `${t("Save")}`}
                    </Button>
                </ButtonGroup>
            </Form>
        </Wrapper>
    );
}
