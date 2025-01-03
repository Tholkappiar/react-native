import React, { useEffect, useState } from "react";
import {
    View,
    Text,
    TextInput,
    StyleSheet,
    TouchableOpacity,
    KeyboardAvoidingView,
    Platform,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { useAuth } from "../context/AuthContext";
import { router } from "expo-router";

export default function LoginScreen() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const { onLogin } = useAuth();

    async function onSubmit() {
        if (onLogin) {
            const response = await onLogin(email, password);
            if (response.success) {
                router.push("/");
            } else {
                console.log(response);
            }
        } else {
            console.error("onSubmit function is not defined");
        }
    }

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
            <StatusBar style="dark" />
            <View style={styles.formContainer}>
                <Text style={styles.title}>Welcome Back</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Email"
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                    autoCapitalize="none"
                />
                <TextInput
                    style={styles.input}
                    placeholder="Password"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                />
                <TouchableOpacity style={styles.button} onPress={onSubmit}>
                    <Text style={styles.buttonText}>Log In</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => router.push("/signup")}>
                    <Text style={styles.linkText}>
                        Don't have an account? Sign Up
                    </Text>
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F0F8FF",
        justifyContent: "center",
        padding: 20,
    },
    formContainer: {
        backgroundColor: "white",
        padding: 20,
        borderRadius: 20,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 5,
    },
    title: {
        fontSize: 28,
        fontWeight: "bold",
        color: "#4B0082",
        marginBottom: 20,
        textAlign: "center",
    },
    input: {
        backgroundColor: "#F0F8FF",
        borderRadius: 25,
        padding: 15,
        marginBottom: 15,
        fontSize: 16,
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
    linkText: {
        color: "#6A5ACD",
        textAlign: "center",
        marginTop: 20,
    },
});
