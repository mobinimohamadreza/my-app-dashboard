import {create} from "zustand";
import {persist} from "zustand/middleware";


type ILoginResponse = {
    access_token: string;
}

type IRegisterRequest = {
    firstName: string,
    lastName: string,
    userName: string,
    password: string,
}

type IUser = {
    firstName: string,
    lastName: string,
    userName: string,
    _id: string,
    createdAt: string,
    updatedAt:string,
    __v: number,
}

type UserStore = {
    user: ILoginResponse | null;
    register: (data: IRegisterRequest) => Promise<IUser>;
    login: (user: ILoginRequest) => Promise<ILoginResponse>;
    logout: () => void;
};

type ILoginRequest = {
    userName: string; password: string
}

export const useUserStore = create<UserStore>()(
    persist(
        (set) => ({
            user: null,
            register: async (data) => {
                    const response = await fetch("https://nak-interview.darkube.app/users/register", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify(data),
                    });

                    if (!response.ok) {
                        const errorData = await response.json();
                        throw new Error(errorData.message || "Registration failed");
                    }

                return await response.json();

            },
            login: async (credentials) => {
                const response = await fetch("https://nak-interview.darkube.app/auth/login", {
                    method: "POST",
                    headers: {"Content-Type": "application/json"},
                    body: JSON.stringify(credentials),
                });

                if (!response.ok) {
                    const errorData = await response.json();
                    throw new Error(errorData.message || "Login failed");
                }

                const userData = await response.json();
                set({user: userData});
                return userData;
            },
            logout: () => {
                set({user: null})
            },
        }),
        {
            name: 'user-storage',
        }
    )
);
