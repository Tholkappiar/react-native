import { useGlobalSearchParams } from "expo-router";
import React from "react";
import { Text, StyleSheet, ScrollView, SafeAreaView } from "react-native";

const BlogDetail = () => {
    const blog = {
        title: "some title",
        author: "thols",
        content: "some content",
    };

    const { id } = useGlobalSearchParams();
    console.log(id);
    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <Text style={styles.title}>{blog.title}</Text>
                <Text style={styles.author}>By {blog.author}</Text>
                <Text style={styles.content}>{blog.content}</Text>
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
