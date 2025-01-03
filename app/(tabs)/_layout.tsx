import { Feather } from "@expo/vector-icons";
import { Tabs } from "expo-router";

const _layout = () => {
    return (
        <Tabs screenOptions={{ headerShown: false, tabBarShowLabel: false }}>
            <Tabs.Screen
                name="index"
                options={{
                    tabBarIcon: () => (
                        <Feather name="home" size={18} color={"blue"} />
                    ),
                }}
            />
            <Tabs.Screen
                name="profile/index"
                options={{
                    tabBarIcon: () => (
                        <Feather name="user" size={18} color={"blue"} />
                    ),
                }}
            />
        </Tabs>
    );
};

export default _layout;
