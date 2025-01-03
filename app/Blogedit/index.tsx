import { router } from "expo-router";
import React, { useState } from "react";
import {
    View,
    Text,
    TextInput,
    StyleSheet,
    TouchableOpacity,
} from "react-native";

export default function BlogEditScreen() {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Edit Blog</Text>
            <Text style={styles.label}>Title</Text>
            <TextInput
                style={styles.input}
                value={title}
                onChangeText={setTitle}
                placeholder="Enter blog title"
            />
            <Text style={styles.label}>Description</Text>
            <TextInput
                style={[styles.input, styles.descriptionInput]}
                value={description}
                onChangeText={setDescription}
                placeholder="Enter blog description"
                multiline
            />
            <TouchableOpacity
                style={styles.button}
                onPress={() => console.log("Save blog")}
            >
                <Text style={styles.buttonText}>Save Blog</Text>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={() => router.push({ pathname: "/" })}
                style={styles.button}
            >
                <Text style={styles.buttonText}>Back to Blogs</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: "#F0F8FF",
    },
    header: {
        fontSize: 30,
        fontWeight: "bold",
        color: "#4B0082",
        margin: 20,
        textAlign: "center",
    },
    label: {
        fontSize: 16,
        fontWeight: "bold",
        marginBottom: 5,
        color: "#4B0082",
    },
    input: {
        backgroundColor: "#fff",
        borderRadius: 25,
        padding: 15,
        marginBottom: 15,
        fontSize: 16,
    },
    descriptionInput: {
        height: 150,
        textAlignVertical: "top",
    },
    button: {
        backgroundColor: "#6A5ACD",
        borderRadius: 25,
        padding: 15,
        alignItems: "center",
        marginTop: 10,
    },
    profileButton: {
        backgroundColor: "#4B0082",
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
