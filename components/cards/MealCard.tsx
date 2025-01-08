import React from "react";
import { Pressable, View, StyleSheet, Platform, GestureResponderEvent, ImageBackground } from "react-native";
import { hp, wp } from "@/helpers/screenResize";
import { Text } from "@/components/ui/Text";

interface MealCardProps {
    title: string;
    url: string;
    onPress: (event: GestureResponderEvent) => void;
}

const MealCard: React.FC<MealCardProps> = ({ title, url, onPress }) => {
    return (
        <View style={styles.gridItem}>
            <Pressable
                android_ripple={{ color: "#ccc" }}
                style={({ pressed }) => (pressed ? styles.buttonPressed : null)}
                onPress={onPress}
            >
                <ImageBackground source={{ uri: url }} style={styles.imageBackground} resizeMode="cover">
                    <View style={styles.overlay}>
                        <Text style={styles.title}>{title}</Text>
                    </View>
                </ImageBackground>
            </Pressable>
        </View>
    );
};

const styles = StyleSheet.create({
    gridItem: {
        flex: 1,
        height: hp(25),
        marginVertical: hp(1),
        borderRadius: wp(3),
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
    imageBackground: {
        width: "100%",
        height: "100%",
        borderRadius: wp(3),
        overflow: "hidden",
    },
    overlay: {
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.4)",
        justifyContent: "center",
        alignItems: "center",
        padding: wp(4),
    },
    title: {
        color: "#fff",
        fontWeight: "bold",
        fontSize: wp(5),
        textAlign: "center",
        textShadowColor: "rgba(0,0,0,0.75)",
        textShadowOffset: { width: -1, height: 1 },
        textShadowRadius: 10,
    },
});

export default MealCard;
