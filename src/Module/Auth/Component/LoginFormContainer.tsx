import { useForm } from "react-hook-form";
import { useUserStore } from "../Store/userStore.ts";
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
  font-weight: 700;
  margin-bottom: 70px;
  margin-top: 0;
`;

const Form = styled.form``;

const Input = styled.input`
  width: 100%;
  margin-bottom: 20px;
  padding: 15px 40px;
  border-radius: 40px;
  height: 70px;
  background: rgba(0, 0, 0, 0.02);
  transition: all 0.3s ease-in-out;
  border: 0;
    color: #000;
  &::placeholder {
    color: rgba(0, 0, 0, 0.2);
      font-weight: bold;
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

const SignUp = styled.button`
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

type LoginFormValues = {
    userName: string;
    password: string;
};

export function LoginFormContainer() {
    const { register, handleSubmit, formState: { errors } } = useForm<LoginFormValues>();
    const loginUser = useUserStore((state) => state.login);
    const { t } = useTranslation();
    const navigate = useNavigate();

    const onSubmit = async (data: LoginFormValues) => {
        try {
            const response = await fetch("https://nak-interview.darkube.app/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    userName: data.userName,
                    password: data.password,
                }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || t("Login failed"));
            }

            const result = await response.json();

            loginUser(result);


            navigate("/dashboard/dashboard");
        } catch (error: any) {
            alert(error.message);
        }
    };

    return (
        <Wrapper>
            <Title>{t("Sign In")}</Title>
            <Form onSubmit={handleSubmit(onSubmit)}>
                <Input
                    {...register("userName", { required: t("Username is required") })}
                    placeholder={t("Username")}
                />
                {errors.userName && <ErrorText>{errors.userName.message}</ErrorText>}
                <Input
                    type="password"
                    {...register("password", { required: t("Password is required") })}
                    placeholder={t("Password")}
                />
                {errors.password && <ErrorText>{errors.password.message}</ErrorText>}
                <WrapperButton>
                    <Button type="submit">
                        <svg width="22" height="16" viewBox="0 0 22 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M1 7C0.447715 7 4.82823e-08 7.44772 0 8C-4.82823e-08 8.55228 0.447715 9 1 9L1 7ZM21.7071 8.70711C22.0976 8.31658 22.0976 7.68342 21.7071 7.2929L15.3431 0.928933C14.9526 0.538409 14.3195 0.538409 13.9289 0.928933C13.5384 1.31946 13.5384 1.95262 13.9289 2.34315L19.5858 8L13.9289 13.6569C13.5384 14.0474 13.5384 14.6805 13.9289 15.0711C14.3195 15.4616 14.9526 15.4616 15.3431 15.0711L21.7071 8.70711ZM1 8L1 9L21 9L21 8L21 7L1 7L1 8Z"
                                fill="white"/>
                        </svg>
                    </Button>
                    <SignUp type="button" onClick={() => navigate("/signup")}>{t("Sign Up")}</SignUp>
                </WrapperButton>
            </Form>
        </Wrapper>
    );
}
