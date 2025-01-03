import React, { useEffect } from "react";
import { useRouter } from "expo-router";
import { useAuth } from "../context/AuthContext";
import { View } from "react-native";

interface RequireAuthProps {
    children: React.ReactNode;
}

const RequireAuth: React.FC<RequireAuthProps> = ({ children }) => {
    const { authState } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!authState?.token) {
            router.replace("/login");
        }
    }, [authState?.token]);

    if (!authState?.token) {
        return null;
    }

    return <View>{children}</View>;
};

export default RequireAuth;
