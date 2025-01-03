import { useAuth } from "@/context/AuthContext";
import { router } from "expo-router";
import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";

export default function ProfileScreen() {
    const userInfo = {
        name: "John Doe",
        email: "john@example.com",
    };

    const { onLogout, authState } = useAuth();

    return (
        <View style={styles.container}>
            <Text style={styles.name}>{userInfo.name}</Text>
            <Text style={styles.email}>{userInfo.email}</Text>
            <Text style={styles.bio}>{authState?.userId}</Text>
            <TouchableOpacity
                style={styles.button}
                onPress={() => router.push("/login")}
            >
                <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.button}
                onPress={() => router.push("/signup")}
            >
                <Text style={styles.buttonText}>Signup</Text>
            </TouchableOpacity>
            {authState?.token && (
                <TouchableOpacity style={styles.button} onPress={onLogout}>
                    <Text style={styles.buttonText}>Logout</Text>
                </TouchableOpacity>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        padding: 20,
        backgroundColor: "#F0F8FF",
    },
    name: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 10,
        color: "#4B0082",
    },
    email: {
        fontSize: 16,
        marginBottom: 10,
        color: "#6A5ACD",
    },
    bio: {
        fontSize: 16,
        textAlign: "center",
        marginBottom: 20,
        color: "#4B0082",
    },
    button: {
        backgroundColor: "#6A5ACD",
        borderRadius: 25,
        padding: 15,
        alignItems: "center",
        marginTop: 10,
    },
    buttonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "bold",
    },
});
