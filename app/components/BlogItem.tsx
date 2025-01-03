import React from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    TouchableWithoutFeedback,
} from "react-native";
import { Feather } from "@expo/vector-icons";

interface BlogItemProps {
    blog: {
        id: string;
        title: string;
        description: string;
        author: string;
    };
    onPress: () => void;
    onEdit: () => void;
    onDelete: () => void;
}

const BlogItem: React.FC<BlogItemProps> = ({
    blog,
    onPress,
    onEdit,
    onDelete,
}) => {
    return (
        <TouchableWithoutFeedback onPress={onPress}>
            <View style={styles.container}>
                <View style={styles.contentContainer}>
                    <Text style={styles.title}>{blog.title}</Text>
                    <Text style={styles.description}>{blog.description}</Text>
                    <Text style={styles.author}>By {blog.author}</Text>
                </View>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity
                        onPress={onEdit}
                        style={styles.iconButton}
                    >
                        <Feather name="edit-3" size={18} color="#007AFF" />
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={onDelete}
                        style={styles.iconButton}
                    >
                        <Feather name="trash" size={18} color="#FF3B30" />
                    </TouchableOpacity>
                </View>
            </View>
        </TouchableWithoutFeedback>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#ffffff",
        borderRadius: 12,
        padding: 16,
        marginBottom: 16,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    contentContainer: {
        flex: 1,
    },
    title: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#333",
        marginBottom: 8,
    },
    description: {
        fontSize: 14,
        color: "#666",
        marginBottom: 8,
    },
    author: {
        fontSize: 12,
        color: "#999",
        fontStyle: "italic",
    },
    buttonContainer: {
        flexDirection: "row",
        marginLeft: 8,
    },
    iconButton: {
        padding: 8,
    },
});

export default BlogItem;
