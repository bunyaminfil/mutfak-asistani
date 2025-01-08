import React from "react";
import { Pressable, View, Text, StyleSheet, Platform, GestureResponderEvent, Image } from "react-native";
import { hp, wp } from "@/helpers/screenResize";

interface FoodCardProps {
    title: string;
    url: string;
    onPress: (event: GestureResponderEvent) => void;
}

const FoodCard: React.FC<FoodCardProps> = ({ title, url, onPress }) => {
    return (
        <View style={styles.gridItem}>
            <Pressable
                android_ripple={{ color: "#ccc" }}
                style={({ pressed }) => (pressed ? styles.buttonPressed : null)}
                onPress={onPress}
            >
                <View style={styles.innerContainer}>
                    <View>
                        <Image source={{ uri: url }} style={styles.image} resizeMode="contain" />
                        <Text style={styles.title}>{title}</Text>
                    </View>
                </View>
            </Pressable>
        </View>
    );
};

export default FoodCard;

const styles = StyleSheet.create({
    gridItem: {
        flex: 1,
        margin: wp(2),
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
        padding: wp(2),
    },
    image: {
        width: "100%",
        height: hp(15),
    },
    title: {
        fontWeight: "bold",
        textAlign: "center",
        fontSize: 18,
    },
});
