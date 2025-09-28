import styled from "@emotion/styled";
import { useTranslation } from "react-i18next";
import { NavLink, useNavigate } from "react-router-dom";
import { useUserStore } from "../../../Auth/Store/userStore.ts";
import { DashboardIcon, AttributesIcon, ProductsIcon } from "./Icons.tsx";
import { jwtDecode } from 'jwt-decode';

const SidebarWrapper = styled.div`
    display: flex;
    flex-direction: column;
    width: 300px;
    border-right: 1px solid #fff;
    background: rgba(255,255,255,0.4);
    border-radius: 0 40px 40px 0;
    height: 100vh;
    position: fixed;
    left: 0;
    top: 0;
`;

const UserSection = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    align-items: center;
    margin-top: 100px;
    padding: 0 20px;
`;

const Avatar = styled.div`
    display: flex;
    width: 70px;
    height: 70px;
    background: #FFF; 
    border-radius: 50%;
    justify-content: center;
    align-items: center;
    margin-bottom: 20px;
`;

const UserName = styled.div`
    font-weight: 600;
    font-size: 16px;
    margin-bottom: 20px;
    text-align: center;
`;

const LogoutButton = styled.button`
    display: flex;
    flex-direction: row-reverse;
    gap: 20px;
    background: none;
    color: #000;
    border: none;
    cursor: pointer;
    font-size: 15px;
    font-weight: 500;
    transition: all 0.3s ease;
    margin-bottom:100px;
justify-content: start;
    padding: 10px 40px;
    &:hover {
        background:rgba(0,0,0,0.02);
        color: red;
    }
`;

const NavigationSection = styled.div`
    display: flex;
    flex-direction: column;
    flex: 1;
`;

const NavItem = styled(NavLink)`
    display: flex;
    align-items: center;
    padding: 15px 40px;
    cursor: pointer;
    font-size: 20px;
    font-weight: 400;
    color: rgba(0,0,0,0.4);
    transition: all 0.3s ease;
    text-align: right;
    width: 100%;
    border: none !important;
    outline: none !important;
    height: 70px;
    text-decoration: none;
    
    &.active {
        background: rgba(0, 0, 0, 0.02);
        font-weight: 600;
        color: #000;
    }
    
    &:hover {
        background: rgba(0,0,0,0.02);
        color: rgba(0,0,0,0.7);
    }
    
    &.active:hover {
        color: #000;
    }
`;


type NavigationItems = {
    key: string,
    label: string,
    path: string,
    icon: React.ComponentType<{ isActive: boolean }>,
}

export function Sidebar() {
    const { t } = useTranslation();
    const user = useUserStore((state) => state.user);
    const navigate = useNavigate();
    const logout = useUserStore((state) => state.logout);

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const navigationItems: NavigationItems[] = [
        { key: 'dashboard', label: t('Dashboard'), path: '/dashboard', icon: DashboardIcon },
        { key: 'attributes', label: t('Attributes'), path: '/dashboard/attributes', icon: AttributesIcon },
        { key: 'products', label: t('Products'), path: '/dashboard/products', icon: ProductsIcon },
    ];

    if (!user) {
        return null;
    }
    const decoded:{username:string} = jwtDecode(user.access_token) || '';

    return (
        <SidebarWrapper>
            <UserSection>
                <Avatar>
                    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M20 20C22.3206 20 24.5462 19.0781 26.1872 17.4372C27.8281 15.7962 28.75 13.5706 28.75 11.25C28.75 8.92936 27.8281 6.70376 26.1872 5.06282C24.5462 3.42187 22.3206 2.5 20 2.5C17.6794 2.5 15.4538 3.42187 13.8128 5.06282C12.1719 6.70376 11.25 8.92936 11.25 11.25C11.25 13.5706 12.1719 15.7962 13.8128 17.4372C15.4538 19.0781 17.6794 20 20 20ZM9.375 22.5C8.21468 22.5 7.10188 22.9609 6.28141 23.7814C5.46094 24.6019 5 25.7147 5 26.875V27.5C5 30.4912 6.90375 33.0212 9.60625 34.7412C12.3238 36.4712 16.0025 37.5 20 37.5C23.9975 37.5 27.675 36.4712 30.3938 34.7412C33.0963 33.0212 35 30.4912 35 27.5V26.875C35 25.7147 34.5391 24.6019 33.7186 23.7814C32.8981 22.9609 31.7853 22.5 30.625 22.5H9.375Z"
                            fill="#04131C"/>
                    </svg>
                </Avatar>
                <UserName>
                    {decoded.username}
                </UserName>

            </UserSection>

            <NavigationSection>
                {navigationItems.map((item) => {
                    const IconComponent = item.icon;
                    return (
                        <NavItem
                            key={item.key}
                            to={item.path}
                            end={item.path === "/dashboard"}
                        >
                            {({ isActive }) => (
                                <>
                                    <IconComponent isActive={isActive} />
                                    {item.label}
                                </>
                            )}
                        </NavItem>
                    );
                })}
            </NavigationSection>
            <LogoutButton onClick={handleLogout}>
                {t("dashboard.logout")}
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M2.02 20C1.44417 20 0.96375 19.8075 0.57875 19.4225C0.19375 19.0375 0.000833333 18.5567 0 17.98V2.02C0 1.44417 0.192916 0.96375 0.57875 0.57875C0.964583 0.19375 1.445 0.000833333 2.02 0H10.0238V1.25H2.02C1.8275 1.25 1.65083 1.33 1.49 1.49C1.32917 1.65 1.24917 1.82667 1.25 2.02V17.9813C1.25 18.1729 1.33 18.3492 1.49 18.51C1.65 18.6708 1.82625 18.7508 2.01875 18.75H10.0238V20H2.02ZM15.5775 14.4237L14.7 13.5238L17.5988 10.625H6.49V9.375H17.5988L14.6987 6.475L15.5763 5.5775L20 10L15.5775 14.4237Z"
                        fill="black"/>
                </svg>
            </LogoutButton>
        </SidebarWrapper>
    );
}
