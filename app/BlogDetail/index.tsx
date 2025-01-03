import { URL } from "@/constants/config";
import axios from "axios";
import { useGlobalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import { Text, StyleSheet, ScrollView, SafeAreaView } from "react-native";

interface Blog {
    Description: string;
    Title: string;
    user_id: string;
}

const BlogDetail = () => {
    const [blog, setBlog] = useState<Blog>({
        Description: "",
        Title: "",
        user_id: "",
    });

    const { id } = useGlobalSearchParams();
    const blogId = Array.isArray(id) ? id[0] : id;

    useEffect(() => {
        async function getBlog() {
            if (!blogId) return;
            const response = await axios.get(URL.BLOGS.GET_BLOG(blogId));
            setBlog(response.data?.blogs);
            console.log(response.data?.blogs);
        }
        getBlog();
    }, []);

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <Text style={styles.title}>{blog.Title}</Text>
                <Text style={styles.author}>By {blog.user_id}</Text>
                <Text style={styles.content}>{blog.Description}</Text>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f0f0f0",
    },
    scrollContainer: {
        padding: 16,
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        color: "#333",
        marginBottom: 8,
    },
    author: {
        fontSize: 14,
        color: "#666",
        marginBottom: 16,
        fontStyle: "italic",
    },
    content: {
        fontSize: 16,
        color: "#333",
        lineHeight: 24,
    },
});

export default BlogDetail;
