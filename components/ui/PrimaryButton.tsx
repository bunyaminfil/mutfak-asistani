import React from "react";
import { View, Text, Pressable, StyleSheet, GestureResponderEvent } from "react-native";

import { Colors } from "../../constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";

interface PrimaryButtonProps {
    children: React.ReactNode;
    onPress: (event: GestureResponderEvent) => void;
}

const PrimaryButton: React.FC<PrimaryButtonProps> = ({ children, onPress }) => {
    const theme = useColorScheme() ?? "light";

    const styles = StyleSheet.create({
        buttonOuterContainer: {
            borderRadius: 28,
            margin: 4,
            overflow: "hidden",
        },
        buttonInnerContainer: {
            backgroundColor: Colors[theme].primary,
            paddingVertical: 8,
            paddingHorizontal: 16,
            elevation: 2,
        },
        buttonText: {
            color: "white",
            textAlign: "center",
        },
        pressed: {
            opacity: 0.75,
        },
    });

    return (
        <View style={styles.buttonOuterContainer}>
            <Pressable
                style={({ pressed }) =>
                    pressed ? [styles.buttonInnerContainer, styles.pressed] : styles.buttonInnerContainer
                }
                onPress={onPress}
                android_ripple={{ color: Colors[theme].primary }}
            >
                <Text style={styles.buttonText}>{children}</Text>
            </Pressable>
        </View>
    );
};

export default PrimaryButton;
