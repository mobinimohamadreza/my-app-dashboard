import {useForm} from "react-hook-form";
import {useUserStore} from "../Store/userStore.ts";
import {useTranslation} from "react-i18next";
import {useNavigate} from "react-router-dom";
import styled from "@emotion/styled";
import {UiButton} from "../../DesignSystem/Component/UiButton";
import {UiInput} from "../../DesignSystem/Component/UiInput";
import {z} from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import toast from 'react-hot-toast';
import {useMemo} from "react";

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


export function LoginFormContainer() {
    const {t} = useTranslation();
    const navigate = useNavigate();
    const loginUser = useUserStore((state) => state.login);

    const schema = useMemo(() => z.object({
        userName: z.string().nonempty(t("login.errors.usernameRequired")),
        password: z
            .string()
            .min(6, t("login.errors.passwordMinLength"))
            .nonempty(t("login.errors.passwordRequired")),
    }), []);

    type RegisterFormValues = z.infer<typeof schema>;

    const {
        register,
        handleSubmit,
        formState: {errors},
    } = useForm<RegisterFormValues>({
        resolver: zodResolver(schema),
    });

    const onSubmit = handleSubmit((data) => {
        loginUser({
            userName: data.userName,
            password: data.password,
        }).then(() => {
            toast.success(t("login.success"));
            navigate("/dashboard");
        }).catch(error => {
            toast.error(error instanceof Error ? error.message : t("common.unknownError"));
        })
    });

    return (
        <Wrapper>
            <Title>{t("login.title")}</Title>
            <Form onSubmit={onSubmit}>
                <UiInput {...register("userName")} placeholder={t("login.username")}/>
                {errors.userName && <ErrorText>{errors.userName.message}</ErrorText>}

                <UiInput
                    type="password"
                    {...register("password")}
                    placeholder={t("login.password")}
                />
                {errors.password && <ErrorText>{errors.password.message}</ErrorText>}

                <WrapperButton>
                    <UiButton type="submit" variant="primary" size="small">
                        {t("login.signIn")}
                    </UiButton>
                    <UiButton
                        type="button"
                        variant="secondary"
                        size="small"
                        onClick={() => navigate("/signup")}
                    >
                        {t("login.signUp")}
                    </UiButton>
                </WrapperButton>
            </Form>
        </Wrapper>
    );
}
