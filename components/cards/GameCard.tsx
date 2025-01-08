import React from "react";
import { Pressable, View, Text, StyleSheet, Platform, GestureResponderEvent, Image } from "react-native";
import { ImageSourcePropType } from "react-native";

interface GameCardProps {
    title: string;
    url: ImageSourcePropType;
    onPress: (event: GestureResponderEvent) => void;
}

const GameCard: React.FC<GameCardProps> = ({ title, url, onPress }) => {
    return (
        <View style={styles.gridItem}>
            <Pressable
                android_ripple={{ color: "#ccc" }}
                style={({ pressed }) => (pressed ? styles.buttonPressed : null)}
                onPress={onPress}
            >
                <View style={styles.innerContainer}>
                    <View>
                        <Image source={url} style={styles.image} resizeMode="contain" />
                        <Text style={styles.title}>{title}</Text>
                    </View>
                </View>
            </Pressable>
        </View>
    );
};

export default GameCard;

const styles = StyleSheet.create({
    gridItem: {
        flex: 1,
        margin: 16,
        borderRadius: 8,
        overflow: Platform.OS === "android" ? "hidden" : "visible",
        backgroundColor: "white",
        elevation: 4,
        shadowColor: "black",
        shadowOpacity: 0.25,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 8,
    },
    buttonPressed: {
        opacity: 0.5,
    },
    innerContainer: {
        borderRadius: 8,
        overflow: "hidden",
        padding: 8,
    },
    image: {
        width: "100%",
        height: 200,
    },
    title: {
        fontWeight: "bold",
        textAlign: "center",
        fontSize: 18,
        margin: 8,
    },
});
