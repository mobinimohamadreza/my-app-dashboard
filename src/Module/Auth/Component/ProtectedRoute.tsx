import type {ReactNode} from "react";
import {Navigate} from "react-router-dom";
import {useUserStore} from "../Store/userStore";

type ProtectedRouteProps = {
    children: ReactNode;
    requireAuth?: boolean;
}

export function ProtectedRoute({children, requireAuth = true}: ProtectedRouteProps) {
    const user = useUserStore((state) => state.user);

    if (requireAuth && !user) {
        return <Navigate to="/login" replace/>;
    }

    if (!requireAuth && user) {
        return <Navigate to="/dashboard" replace/>;
    }
    return <>{children}</>;
}
