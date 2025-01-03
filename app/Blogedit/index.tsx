import RequireAuth from "@/components/RequireAuth";
import { URL } from "@/constants/config";
import { useAuth } from "@/context/AuthContext";
import axios from "axios";
import { router, useGlobalSearchParams } from "expo-router";
import React, { useState, useEffect } from "react";
import {
    View,
    Text,
    TextInput,
    StyleSheet,
    TouchableOpacity,
} from "react-native";

export default function BlogForm() {
    const { id } = useGlobalSearchParams();
    const isEditing = Boolean(id);

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    useEffect(() => {
        if (isEditing) {
            setTitle("Sample Title");
            setDescription("Sample Description");
        }
    }, [isEditing]);

    const { authState } = useAuth();
    const blogId = Array.isArray(id) ? id[0] : id;
    const handleSave = async () => {
        try {
            if (isEditing) {
                const response = await axios.put(
                    URL.BLOGS.UPDATE_BLOG(blogId),
                    { title, description }
                );
            } else {
                const response = await axios.post(URL.BLOGS.CREATE_BLOG, {
                    title,
                    description,
                    user_id: authState?.userId,
                });
            }
            router.push("/");
        } catch (error) {
            console.error("Error saving blog:", error);
        }
    };

    useEffect(() => {
        async function getBlog() {
            const response = await axios.get(URL.BLOGS.GET_BLOG(blogId));
            const { Description, Title } = response.data?.blogs;
            setTitle(Title);
            setDescription(Description);
        }
        getBlog();
    }, []);

    return (
        <View style={styles.container}>
            <RequireAuth>
                <Text style={styles.header}>
                    {isEditing ? "Edit Blog" : "Create Blog"}
                </Text>
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
                <TouchableOpacity style={styles.button} onPress={handleSave}>
                    <Text style={styles.buttonText}>
                        {isEditing ? "Update Blog" : "Create Blog"}
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => router.push("/")}
                    style={styles.button}
                >
                    <Text style={styles.buttonText}>Back to Blogs</Text>
                </TouchableOpacity>
            </RequireAuth>
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
    buttonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "bold",
    },
});
