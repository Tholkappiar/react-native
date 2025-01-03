import React from "react";
import {
    Text,
    FlatList,
    StyleSheet,
    SafeAreaView,
    StatusBar,
    Alert,
} from "react-native";
import BlogItem from "../components/BlogItem";
import { router } from "expo-router";

const blogData = [
    {
        id: "1",
        title: "The Future of AI",
        description:
            "Exploring the potential impacts of artificial intelligence on various industries and daily life.",
        author: "Jane Doe",
    },
    {
        id: "2",
        title: "Sustainable Living",
        description:
            "Practical tips for reducing your carbon footprint and living a more environmentally friendly lifestyle.",
        author: "John Smith",
    },
    {
        id: "3",
        title: "The Art of Productivity",
        description:
            "Techniques and strategies to boost your productivity and achieve your goals more efficiently.",
        author: "Alice Johnson",
    },
];

const Blogs = () => {
    const handlePress = (id: string) => {
        router.push({
            pathname: "/BlogDetail",
            params: {
                id,
            },
        });
    };

    const handleEdit = (id: string) => {
        Alert.alert("Edit", `Editing blog with id: ${id}`);
    };

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
                    onPress: () => {
                        console.log(`Deleting blog with id: ${id}`);
                    },
                },
            ]
        );
    };

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="dark-content" />
            <Text style={styles.header}>Blogs</Text>
            <FlatList
                data={blogData}
                renderItem={({ item }) => (
                    <BlogItem
                        blog={item}
                        onPress={() => handlePress(item.id)}
                        onEdit={() => handleEdit(item.id)}
                        onDelete={() => handleDelete(item.id)}
                    />
                )}
                keyExtractor={(item) => item.id}
                contentContainerStyle={styles.listContainer}
            />
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
});

export default Blogs;
