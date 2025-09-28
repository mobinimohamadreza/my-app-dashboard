import { create } from "zustand";

type NetworkStore = {
    isOnline: boolean;
    setOnline: (status: boolean) => void;
    checkConnection: () => void;
};

export const useNetworkStore = create<NetworkStore>((set) => ({
    isOnline: navigator.onLine,
    setOnline: (status: boolean) => set({ isOnline: status }),
    checkConnection: () => {
        set({ isOnline: navigator.onLine });
    },
}));
