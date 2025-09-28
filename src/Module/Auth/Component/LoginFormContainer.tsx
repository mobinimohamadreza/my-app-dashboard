import { useForm } from "react-hook-form";
import { useUserStore } from "../Store/userStore.ts";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import styled from "@emotion/styled";
import { UiButton } from "../../DesignSystem/Component/UiButton";
import { UiInput } from "../../DesignSystem/Component/UiInput";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const Wrapper = styled.div`
    max-width: 700px;
    margin: 10px auto;
    width: 100%;
    padding: 40px;
    background: #fff;
    border-radius: 12px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h2`
    display: flex;
    justify-content: start;
    font-size: 30px;
    font-weight: 700;
    margin-bottom: 70px;
    margin-top: 0;
`;

const Form = styled.form``;

const ErrorText = styled.p`
    color: red;
    font-size: 12px;
    margin-top: -10px;
    margin-left: 40px;
`;

const WrapperButton = styled.div`
    display: flex;
    flex-direction: row-reverse;
    justify-content: space-between;
    margin-top: 50px;
`;

type LoginFormValues = {
    userName: string;
    password: string;
};

export function LoginFormContainer() {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const loginUser = useUserStore((state) => state.login);

    const schema = z.object({
        userName: z.string().nonempty(t("Username is required")),
        password: z
            .string()
            .min(6, t("Password must be at least 6 characters"))
            .nonempty(t("Password is required")),
    });

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginFormValues>({
        resolver: zodResolver(schema),
    });

    const onSubmit = async (data: LoginFormValues) => {
        try {
            const response = await fetch(
                "https://nak-interview.darkube.app/auth/login",
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        userName: data.userName,
                        password: data.password,
                    }),
                }
            );

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || t("Login failed"));
            }

            const result = await response.json();
            loginUser(result);
            navigate("/dashboard");
        } catch (error: unknown) {
            alert(
                error instanceof Error ? error.message : t("An unknown error occurred")
            );
        }
    };

    return (
        <Wrapper>
            <Title>{t("Sign In")}</Title>
            <Form onSubmit={handleSubmit(onSubmit)}>
                <UiInput {...register("userName")} placeholder={t("Username")} />
                {errors.userName && <ErrorText>{errors.userName.message}</ErrorText>}

                <UiInput
                    type="password"
                    {...register("password")}
                    placeholder={t("Password")}
                />
                {errors.password && <ErrorText>{errors.password.message}</ErrorText>}
                <WrapperButton>
                    <UiButton type="submit" variant="primary" size="small">
                        {t("Sign In")}
                    </UiButton>
                    <UiButton
                        type="button"
                        variant="secondary"
                        size="small"
                        onClick={() => navigate("/signup")}
                    >
                        {t("Sign Up")}
                    </UiButton>
                </WrapperButton>
            </Form>
        </Wrapper>
    );
}
