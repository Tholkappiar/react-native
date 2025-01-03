import {
    createContext,
    ReactNode,
    useContext,
    useEffect,
    useState,
} from "react";
import axios from "axios";
import { URL } from "../constants/config";
import * as SecureStore from "expo-secure-store";

interface AuthProps {
    authState?: { token: string | null; userId: string | null };
    onRegister?: (email: string, password: string) => Promise<any>;
    onLogin?: (email: string, password: string) => Promise<any>;
    onLogout?: () => void;
}

const AuthContext = createContext<AuthProps>({});
export default AuthContext;

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
    children,
}) => {
    const [user, setUser] = useState<{
        token: string | null;
        userId: string | null;
    }>({
        token: null,
        userId: null,
    });

    const register = async (email: string, password: string) => {
        try {
            const response = await axios.post(URL.USER.SIGNUP, {
                Email: email,
                Password: password,
            });
            console.log(JSON.stringify(response.data));
            if (response.status === 201) {
                return { success: true };
            } else {
                return { success: false };
            }
        } catch (err) {
            console.log(JSON.stringify(err));
            return {
                error: "Signup Failed",
            };
        }
    };

    const login = async (email: string, password: string) => {
        try {
            const response = await axios.post(URL.USER.LOGIN, {
                email,
                password,
            });
            if (response.status === 200) {
                setUser({
                    token: response.data.token,
                    userId: JSON.stringify(response.data.session.access_token),
                });
                axios.defaults.headers.common[
                    "Authorization"
                ] = `Bearer ${response.data.session.access_token}`;
                const access_token = response.data.session.access_token;
                const userID = response.data.session.user.id;

                try {
                    await SecureStore.setItemAsync("TOKEN", access_token);
                    await SecureStore.setItemAsync("USER_ID", userID);
                } catch (error) {
                    console.error("SecureStore Error:", error);
                    return { error: "Failed to save credentials" };
                }

                return { success: true };
            }
            return response;
        } catch (err) {
            return {
                success: false,
                error: "Login Failed",
            };
        }
    };

    useEffect(() => {
        const loadToken = async () => {
            const token = await SecureStore.getItemAsync("TOKEN");
            const userId = await SecureStore.getItemAsync("USER_ID");
            if (token && userId) {
                axios.defaults.headers.common[
                    "Authorization"
                ] = `Bearer ${token}`;

                setUser({
                    token,
                    userId,
                });
            }
        };

        loadToken();
    });

    const logout = async () => {
        try {
            await SecureStore.deleteItemAsync("TOKEN");
            await SecureStore.deleteItemAsync("USER_ID");
            axios.defaults.headers.common["Authorization"] = "";
            setUser({
                token: "",
                userId: "",
            });
        } catch (err) {}
    };

    const value: AuthProps = {
        onRegister: register,
        onLogin: login,
        onLogout: logout,
        authState: user,
    };

    return (
        <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
    );
};
