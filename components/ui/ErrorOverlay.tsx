import React from "react";
import { View, StyleSheet, Text } from "react-native";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";

interface ErrorOverlayProps {
    message: string;
}

const ErrorOverlay: React.FC<ErrorOverlayProps> = ({ message }) => {
    const theme = useColorScheme() ?? "light";
    
    const styles = StyleSheet.create({
        container: {
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            padding: 24,
            backgroundColor: Colors[theme].background,
        },
        text: {
            color: "white",
            textAlign: "center",
            marginBottom: 8,
        },
        title: {
            fontSize: 20,
            fontWeight: "bold",
        },
    });

    return (
        <View style={styles.container}>
            <Text style={[styles.text, styles.title]}>An error occurred!</Text>
            <Text style={styles.text}>{message}</Text>
        </View>
    );
};

export default ErrorOverlay;
