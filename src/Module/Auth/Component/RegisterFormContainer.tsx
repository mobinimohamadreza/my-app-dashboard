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

const ButtonIcon = styled.svg`
    width: 22px;
    height: 16px;
`;

export function RegisterFormContainer() {
    const {t} = useTranslation();
    const navigate = useNavigate();
    const registerUser = useUserStore((state) => state.register);
    const loginUser = useUserStore((state) => state.login);

    const registerSchema = useMemo(() => z.object({
        firstName: z
            .string()
            .min(1, t("Name is required"))
            .min(2, t("Name must be at least 2 characters")),

        lastName: z
            .string()
            .min(1, t("Last name is required"))
            .min(2, t("Last name must be at least 2 characters")),

        userName: z
            .string()
            .min(1, t("Username is required"))
            .min(4, t("Username must be at least 4 characters"))
        ,

        password: z
            .string()
            .min(1, t("Password is required"))
            .min(6, t("Password must be at least 6 characters")),

        confirmPassword: z
            .string()
            .min(1, t("Confirm password is required"))
    }).refine((data) => data.password === data.confirmPassword, {
        message: t("Passwords do not match"),
        path: ["confirmPassword"],
    }), [])

    type RegisterFormValues = z.infer<typeof registerSchema>;

    const {
        register,
        handleSubmit,
        formState: {errors, isSubmitting}
    } = useForm<RegisterFormValues>({
        resolver: zodResolver(registerSchema),
        mode: "onChange"
    });

    const onSubmit = handleSubmit((data) => {
        registerUser({
            firstName: data.firstName,
            lastName: data.lastName,
            userName: data.userName,
            password: data.password
        }).then(() => {
            loginUser({
                userName: data.userName,
                password: data.password
            }).then(() => {
                toast.success(t("Registration successful!"));
                navigate("/dashboard");
            })
        }).catch(error => {
            toast.error(error instanceof Error ? error.message : t("An unknown error occurred"));
        })
    });

    return (
        <Wrapper>
            <Title>{t("Sign Up")}</Title>
            <Form onSubmit={onSubmit}>
                {/* First Name */}
                <UiInput
                    {...register("firstName")}
                    placeholder={t("Name")}
                    disabled={isSubmitting}
                />
                {errors.firstName && <ErrorText>{errors.firstName.message}</ErrorText>}

                {/* Last Name */}
                <UiInput
                    {...register("lastName")}
                    placeholder={t("Last Name")}
                    disabled={isSubmitting}
                />
                {errors.lastName && <ErrorText>{errors.lastName.message}</ErrorText>}

                {/* Username */}
                <UiInput
                    {...register("userName")}
                    placeholder={t("Username")}
                    disabled={isSubmitting}
                />
                {errors.userName && <ErrorText>{errors.userName.message}</ErrorText>}

                {/* Password */}
                <UiInput
                    type="password"
                    {...register("password")}
                    placeholder={t("Password")}
                    disabled={isSubmitting}
                />
                {errors.password && <ErrorText>{errors.password.message}</ErrorText>}

                {/* Confirm Password */}
                <UiInput
                    type="password"
                    {...register("confirmPassword")}
                    placeholder={t("Confirm Password")}
                    disabled={isSubmitting}
                />
                {errors.confirmPassword && <ErrorText>{errors.confirmPassword.message}</ErrorText>}

                <WrapperButton>
                    <UiButton
                        variant="primary"
                        size="small"
                        type="submit"
                        disabled={isSubmitting}
                    >
                        <ButtonIcon
                            width="22"
                            height="16"
                            viewBox="0 0 22 16"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M1 7C0.447715 7 4.82823e-08 7.44772 0 8C-4.82823e-08 8.55228 0.447715 9 1 9L1 7ZM21.7071 8.70711C22.0976 8.31658 22.0976 7.68342 21.7071 7.2929L15.3431 0.928933C14.9526 0.538409 14.3195 0.538409 13.9289 0.928933C13.5384 1.31946 13.5384 1.95262 13.9289 2.34315L19.5858 8L13.9289 13.6569C13.5384 14.0474 13.5384 14.6805 13.9289 15.0711C14.3195 15.4616 14.9526 15.4616 15.3431 15.0711L21.7071 8.70711ZM1 8L1 9L21 9L21 8L21 7L1 7L1 8Z"
                                fill="white"
                            />
                        </ButtonIcon>
                    </UiButton>

                    <UiButton
                        variant="secondary"
                        size="small"
                        type="button"
                        onClick={() => navigate("/login")}
                        disabled={isSubmitting}
                    >
                        {t("Sign In")}
                    </UiButton>
                </WrapperButton>
            </Form>
        </Wrapper>
    );
}
