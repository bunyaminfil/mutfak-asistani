import React from "react";
import { Pressable, View, StyleSheet, Platform, GestureResponderEvent, ImageBackground } from "react-native";
import { hp, wp } from "@/helpers/screenResize";
import { Text } from "@/components/ui/Text";
import { MaterialIcons } from "@expo/vector-icons";
import { useAppDispatch, useAppSelector } from "@/store/redux/hook";
import { toggleFavorite } from "@/store/redux/slices/favorites";

interface MealCardProps {
    id: string;
    title: string;
    url: string;
    onPress: (event: GestureResponderEvent) => void;
}

const MealCard: React.FC<MealCardProps> = ({ id, title, url, onPress }) => {
    const dispatch = useAppDispatch();
    const favorites = useAppSelector((state) => state.favoritesReducer.ids);
    const isFavorite = favorites.includes(id);

    const handleFavorite = (e: GestureResponderEvent) => {
        e.stopPropagation();
        dispatch(toggleFavorite(id));
    };

    return (
        <View style={styles.gridItem}>
            <Pressable
                android_ripple={{ color: "#ccc" }}
                style={({ pressed }) => (pressed ? styles.buttonPressed : null)}
                onPress={onPress}
            >
                <ImageBackground source={{ uri: url }} style={styles.image} resizeMode="cover">
                    <View style={styles.overlay}>
                        <Pressable 
                            style={styles.favoriteButton} 
                            onPress={handleFavorite}
                            android_ripple={{ color: "rgba(0,0,0,0.1)", borderless: false }}
                        >
                            <MaterialIcons 
                                name={isFavorite ? "favorite" : "favorite-border"} 
                                size={wp(6)} 
                                color={isFavorite ? "#ff4081" : "#fff"} 
                            />
                        </Pressable>
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
    image: {
        width: "100%",
        height: "100%",
        borderRadius: wp(3),
        overflow: "hidden",
    },
    overlay: {
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.3)",
        justifyContent: "space-between",
        padding: wp(2),
    },
    favoriteButton: {
        alignSelf: "flex-end",
        backgroundColor: "rgba(0,0,0,0.3)",
        padding: wp(2),
        borderRadius: wp(5),
        margin: wp(2),
    },
    title: {
        color: "#fff",
        fontWeight: "bold",
        fontSize: wp(4.5),
        textAlign: "center",
        textShadowColor: "rgba(0,0,0,0.75)",
        textShadowOffset: { width: -1, height: 1 },
        textShadowRadius: 10,
        padding: wp(2),
        backgroundColor: "rgba(0,0,0,0.5)",
        borderRadius: wp(2),
    },
});

export default MealCard;
