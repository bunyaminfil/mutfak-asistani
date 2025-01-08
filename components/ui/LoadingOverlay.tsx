import React from "react";
import { View, ActivityIndicator, StyleSheet } from "react-native";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";

function LoadingOverlay() {
    const theme = useColorScheme() ?? "light";

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            padding: 24,
            backgroundColor: Colors[theme].background,
        },
    });

    return (
        <View style={styles.container}>
            <ActivityIndicator size="large" color="white" />
        </View>
    );
}

export default LoadingOverlay;
