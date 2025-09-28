import {create} from "zustand";
import {persist} from "zustand/middleware";


type User = {
    access_token: string;
}
type UserStore = {
    user: User | null;
    register: (user: User) => void;
    login: (user: User) => void;
    logout: () => void;
};


export const useUserStore = create<UserStore>()(
    persist(
        (set) => ({
            user: null,
            register: (user: User) => set({user}),
            login: (user: User) => set({user}),
            logout: () => {
                set({user: null})
            },
        }),
        {
            name: 'user-storage',
        }
    )
);
