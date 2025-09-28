import {useForm} from "react-hook-form";
import {useUserStore} from "../Store/userStore.ts";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import styled from "@emotion/styled";

const Wrapper = styled.div`
    max-width: 700px;
    margin: 10px auto;
    width: 100%;
    padding: 40px;
    background: #fff;
    border-radius: 12px;
    box-shadow: 0 4px 12px rgba(0,0,0,0.1);
`;

const Title = styled.h2`
display: flex;
    justify-content: start;
    font-size: 30px;
    margin-bottom: 70px;
    margin-top: 0;
`;const Form = styled.form`

`;

const Input = styled.input`
    width: 100%;
    margin-bottom: 20px;
    padding: 15px 40px;
    border-radius: 40px;
    height: 70px;
    background: rgba(0, 0, 0, 0.02);
    transition: all 0.3s ease-in-out;
    color-scheme: none;
    border: 0;

    &::placeholder {
        color: rgba(0, 0, 0, 0.2);

    }

    &:focus {
        outline: none;
        box-shadow: 0 3px 3px rgba(0, 0, 0, 0.2);
    }
`;

const Button = styled.button`
  width: 116px;
  padding: 10px 12px;
  background: #000;
  color: #fff;
  border: none;
  border-radius: 60px;
  cursor: pointer;
 transition: all 0.3s ease-in-out;
  &:hover {
    background: gray;
  }
`;

const ErrorText = styled.p`
  color: red;
  font-size: 12px;
    margin-top:-10px;
    margin-left: 40px;
`;

const WrapperButton = styled.div`
    display: flex;
    flex-direction: row-reverse;
    justify-content: space-between;
    margin-top: 50px;
`;
const SignIn = styled.button`
    border: 1px solid #000;
    width: 116px;
    font-size: 20px;
    border-radius: 40px;
    color: #000;
    text-align: center;
    background: transparent;
    cursor: pointer;
    transition: all 0.3s ease;
    padding: 5px;

    &:hover {
        background: rgba(0, 0, 0, 0.05);
    }
`;

type RegisterFormValues = {
    firstName: string;
    lastName: string;
    userName: string;
    password: string;
    confirmPassword: string;
};


export function RegisterFormContainer() {
    const { register, handleSubmit, watch, formState: { errors } } = useForm<RegisterFormValues>();
    const registerUser = useUserStore((state) => state.register);
    const { t } = useTranslation();
    const navigate = useNavigate();

    const  onSubmit = async (data: RegisterFormValues) => {
        try {
            const response = await fetch("https://nak-interview.darkube.app/users/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    firstName: data.firstName,
                    lastName: data.lastName,
                    userName: data.userName,
                    password: data.password,
                }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || t("Registration failed"));
            }

            const result = await response.json();

            registerUser(result);
            alert(t("Registration successful!"));
            navigate("/login");
        } catch (error: any) {
            alert(error.message);
        }
    };

    return (
        <Wrapper>
            <Title>{t("Sign Up")}</Title>
            <Form onSubmit={handleSubmit(onSubmit)}>
                <Input {...register("firstName", { required: t("Name is required") })} placeholder={t("Name")} />
                {errors.firstName && <ErrorText>{errors.firstName.message}</ErrorText>}

                <Input {...register("lastName", { required: t("Last name is required") })} placeholder={t("Last Name")} />
                {errors.lastName && <ErrorText>{errors.lastName.message}</ErrorText>}

                <Input     {...register("userName", {
                    required: t("Username is required"),
                    minLength: { value: 4, message: t("Username must be at least 4 characters") },
                })} placeholder={t("Username")} />
                {errors.userName && <ErrorText>{errors.userName.message}</ErrorText>}

                <Input
                    type="password"
                    {...register("password", {
                        required: t("Password is required"),
                        minLength: { value: 6, message: t("Password must be at least 6 characters") },
                    })}
                    placeholder={t("Password")}
                />
                {errors.password && <ErrorText>{errors.password.message}</ErrorText>}

                <Input
                    type="password"
                    {...register("confirmPassword", {
                        required: t("Confirm password is required"),
                        validate: (value) =>
                            value === watch("password") || t("Passwords do not match"),
                    })}
                    placeholder={t("Confirm Password")}
                />
                {errors.confirmPassword && <ErrorText>{errors.confirmPassword.message}</ErrorText>}

                <WrapperButton>
                    <Button type="submit">
                        <svg width="22" height="16" viewBox="0 0 22 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M1 7C0.447715 7 4.82823e-08 7.44772 0 8C-4.82823e-08 8.55228 0.447715 9 1 9L1 7ZM21.7071 8.70711C22.0976 8.31658 22.0976 7.68342 21.7071 7.2929L15.3431 0.928933C14.9526 0.538409 14.3195 0.538409 13.9289 0.928933C13.5384 1.31946 13.5384 1.95262 13.9289 2.34315L19.5858 8L13.9289 13.6569C13.5384 14.0474 13.5384 14.6805 13.9289 15.0711C14.3195 15.4616 14.9526 15.4616 15.3431 15.0711L21.7071 8.70711ZM1 8L1 9L21 9L21 8L21 7L1 7L1 8Z"
                                fill="white"/>
                        </svg>
                    </Button>
                    <SignIn type="button" onClick={() => navigate("/login")}>{t("Sign In")}</SignIn>
                </WrapperButton>
            </Form>
        </Wrapper>
    );
}

