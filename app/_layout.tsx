import React from "react";
import { Stack } from "expo-router";
import { AuthProvider } from "../context/AuthContext";

export default function _layout() {
    return (
        <AuthProvider>
            <Stack
                screenOptions={{
                    headerShown: false,
                }}
            >
                <Stack.Screen name="(tabs)" />
            </Stack>
        </AuthProvider>
    );
}
