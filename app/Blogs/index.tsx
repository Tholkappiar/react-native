import React, { useEffect, useState } from "react";
import {
    Text,
    FlatList,
    StyleSheet,
    SafeAreaView,
    StatusBar,
    Alert,
    TouchableOpacity,
} from "react-native";
import { router } from "expo-router";
import BlogItem from "../../components/BlogItem";
import { useAuth } from "@/context/AuthContext";
import { Feather } from "@expo/vector-icons";
import axios from "axios";
import { URL } from "@/constants/config";

interface Blog {
    Id: string;
    Title: string;
    Description: string;
    user_id: string;
}

const Blogs = () => {
    const [blogs, setBlogs] = useState<Blog[]>([]);

    const handlePress = (id: string) => {
        router.push({
            pathname: "/BlogDetail",
            params: { id },
        });
    };

    const handleEdit = (id: string) => {
        router.push({
            pathname: "/Blogedit",
            params: { id },
        });
    };

    const handleCreate = () => {
        router.push("/Blogedit");
    };

    useEffect(() => {
        async function getBlogs() {
            const response = await axios.get(URL.BLOGS.GET_ALL_BLOGS);
            if (response.status === 200) {
                setBlogs(response.data?.blogs);
            }
        }
        getBlogs();
    }, []);

    const handleDelete = (id: string) => {
        Alert.alert(
            "Delete Blog",
            "Are you sure you want to delete this blog?",
            [
                {
                    text: "Cancel",
                    style: "cancel",
                },
                {
                    text: "Delete",
                    onPress: async () => {
                        try {
                            const response = await axios.delete(
                                URL.BLOGS.DELETE_BLOG(id)
                            );
                            if (response.status === 200) {
                                setBlogs((prevBlogs) =>
                                    prevBlogs.filter((blog) => blog.Id !== id)
                                );
                            }
                        } catch (error) {
                            console.log(JSON.stringify(error));
                            console.error("Error deleting blog:", error);
                        }
                    },
                },
            ]
        );
    };

    const { authState } = useAuth();

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="dark-content" />
            <Text style={styles.header}>Blogs</Text>
            <FlatList
                data={blogs}
                renderItem={({ item }) => (
                    <BlogItem
                        blog={item}
                        onPress={() => handlePress(item.Id)}
                        onEdit={() => handleEdit(item.Id)}
                        onDelete={() => handleDelete(item.Id)}
                    />
                )}
                keyExtractor={(item) => item.Id}
                contentContainerStyle={styles.listContainer}
            />
            {authState?.token && (
                <TouchableOpacity
                    style={styles.createButton}
                    onPress={handleCreate}
                >
                    <Feather name="plus" size={24} color="white" />
                </TouchableOpacity>
            )}
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f0f0f0",
    },
    header: {
        fontSize: 24,
        fontWeight: "bold",
        padding: 16,
        color: "#333",
        textAlign: "center",
    },
    listContainer: {
        padding: 16,
    },
    createButton: {
        position: "absolute",
        bottom: 30,
        right: 30,
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: "#6A5ACD",
        justifyContent: "center",
        alignItems: "center",
        elevation: 5,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
    },
});

export default Blogs;
