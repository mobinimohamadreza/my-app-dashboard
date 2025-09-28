import styled from "@emotion/styled";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm, useFieldArray } from "react-hook-form";
import { useUserStore } from "../../../Auth/Store/userStore.ts";
import { useTranslation } from "react-i18next";
import { UiButton } from "../../../DesignSystem/Component/UiButton";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

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
    flex: 1;
`;

const InputGroup = styled.div`
    display: flex;
    flex-direction: row;
    gap: 10px;
`;

const InputWrapper = styled.div`
    position: relative;
    width: 100%;
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

    &::before {
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

const ButtonGroup = styled.div`
    display: flex;
    gap: 20px;
    justify-content: space-between;
    margin-top: 30px;
    height: 100%;
    align-items: end;
`;

const ErrorMessage = styled.div`
    background: #f8d7da;
    color: #721c24;
    padding: 12px 16px;
    border-radius: 8px;
    border: 1px solid #f5c6cb;
    margin-bottom: 20px;
`;

const FieldError = styled.span`
    color: red;
    font-size: 12px;
    margin-top: 5px;
    display: block;
`;

const AddIcon = styled.svg`
    width: 20px;
    height: 20px;
`;

const createAttributeSchema = (t: (key: string) => string) =>
    z.object({
        name: z
            .string()
            .min(1, t("attributes.propertyNameRequired")),

        values: z
            .array(
                z.object({
                    value: z
                        .string()
                        .min(1, t("attributes.valueRequired"))
                })
            )
            .min(1, t("attributes.atLeastOneValueRequired"))
            .refine(
                (values) => {
                    const nonEmptyValues = values.filter(item => item.value.trim().length > 0);
                    return nonEmptyValues.length > 0;
                },
                {
                    message: t("attributes.atLeastOneNonEmptyValueRequired"),
                    path: ["values"]
                }
            )
            .refine(
                (values) => {
                    const valueSet = new Set();
                    for (const item of values) {
                        const trimmedValue = item.value.trim();
                        if (trimmedValue && valueSet.has(trimmedValue)) {
                            return false;
                        }
                        valueSet.add(trimmedValue);
                    }
                    return true;
                },
                {
                    message: t("attributes.duplicateValuesNotAllowed"),
                    path: ["values"]
                }
            )
    });

type FormData = z.infer<ReturnType<typeof createAttributeSchema>>;

interface CreateAttributeProps {
    onSave?: (name: string, values: string[]) => Promise<void>;
}

export function CreateAttribute({ onSave }: CreateAttributeProps) {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const {
        register,
        control,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm<FormData>({
        resolver: zodResolver(createAttributeSchema(t)),
        defaultValues: {
            name: "",
            values: [{ value: "" }]
        },
        mode: "onChange"
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

        try {
            setLoading(true);

            const token = useUserStore.getState().user?.access_token;
            if (!token) {
                throw new Error(t("common.tokenNotFound"));
            }

            const filteredValues = Array.from(
                new Set(
                    data.values
                        .map(item => item.value.trim())
                        .filter(value => value.length > 0)
                )
            );

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
                throw new Error(`${t("common.errorReceiving")} ${response.status} - ${errorText}`);
            }

            reset();
            if (onSave) {
                await onSave(data.name, filteredValues);
            }
            navigate("/dashboard/attributes");
        } catch (err) {
            setError(err instanceof Error ? err.message : t("Error receiving"));
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
                <Title>{t("attributes.attribute")}</Title>
            </Header>

            <Form onSubmit={handleSubmit(onSubmit)}>
                {error && <ErrorMessage>{error}</ErrorMessage>}

                <InputGroup>
                    <InputWrapper>
                        <Input
                            id="name"
                            type="text"
                            placeholder=" "
                            {...register("name")}
                            disabled={loading}
                        />
                        <Label htmlFor="name">{t("attributes.name")}</Label>
                        {errors.name && <FieldError>{errors.name.message}</FieldError>}
                    </InputWrapper>

                    <ValuesContainer>
                        {fields.map((field, index) => (
                            <ValueInputGroup key={field.id}>
                                <InputWrapper>
                                    <Input
                                        type="text"
                                        placeholder=" "
                                        disabled={loading}
                                        {...register(`values.${index}.value`)}
                                    />
                                    <Label htmlFor={`value-${index}`}>{t("Value")}</Label>
                                    {errors.values?.[index]?.value && (
                                        <FieldError>
                                            {errors.values[index]?.value?.message}
                                        </FieldError>
                                    )}
                                </InputWrapper>
                            </ValueInputGroup>
                        ))}
                        {errors.values?.root && (
                            <FieldError>{errors.values.root.message}</FieldError>
                        )}
                    </ValuesContainer>

                    <UiButton
                        variant="secondary"
                        size="circle"
                        type="button"
                        onClick={handleAddValue}
                        disabled={loading}
                    >
                        <AddIcon
                            width="20"
                            height="20"
                            viewBox="0 0 20 20"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M10.0001 20C9.2001 20 8.57153 19.3714 8.57153 18.5714V1.42857C8.57153 0.628571 9.2001 0 10.0001 0C10.8001 0 11.4287 0.628571 11.4287 1.42857V18.5714C11.4287 19.3714 10.8001 20 10.0001 20Z"
                                fill="black"
                            />
                            <path
                                d="M18.5714 11.4287H1.42857C0.628571 11.4287 0 10.8001 0 10.0001C0 9.2001 0.628571 8.57153 1.42857 8.57153H18.5714C19.3714 8.57153 20 9.2001 20 10.0001C20 10.8001 19.3714 11.4287 18.5714 11.4287Z"
                                fill="black"
                            />
                        </AddIcon>
                    </UiButton>
                </InputGroup>

                <ButtonGroup>
                    <UiButton
                        variant="secondary"
                        size="large"
                        type="button"
                        onClick={handleCancel}
                        disabled={loading}
                    >
                        {t("common.cancel")}
                    </UiButton>
                    <UiButton
                        size="large"
                        type="submit"
                        variant="primary"
                        disabled={loading}
                    >
                        {loading ? t("common.saving") : t("common.save")}
                    </UiButton>
                </ButtonGroup>
            </Form>
        </Wrapper>
    );
}
