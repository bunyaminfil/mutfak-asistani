import React from "react";
import { View, Text, Image, StyleSheet, Platform } from "react-native";

interface IFood {
    id: number;
    name: string;
    url: string;
}

interface FoodsScreenProps {
    route: {
        params: {
            food: IFood;
        };
    };
}

const FoodDetailScreen: React.FC<FoodsScreenProps> = ({ route }) => {
    const food = route.params.food;
    return (
        <View style={styles.mealItem}>
            <View style={styles.innerContainer}>
                <View>
                    <Image
                        // source={
                        //     food.name === "gamzius"
                        //         ? require("@/assets/pk.jpg") // Use require directly for local images
                        //         : { uri: `https://img.pokemondb.net/artwork/${food.name}.jpg` } // Use uri for remote images
                        // }
                        source={{ uri: `https://img.pokemondb.net/artwork/${food.name}.jpg` }}
                        style={styles.image}
                        resizeMode="contain"
                    />
                    <Text style={styles.title}>{food.name}</Text>
                </View>
                <View style={styles.details}>
                    <Text style={styles.detailItem}>Kick - 20</Text>
                    <Text style={styles.detailItem}>Power Kick - 50</Text>
                </View>
            </View>
        </View>
    );
};

export default FoodDetailScreen;

const styles = StyleSheet.create({
    mealItem: {
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
        paddingVertical: 16,
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
    details: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        padding: 8,
    },
    detailItem: {
        marginHorizontal: 4,
        fontSize: 12,
    },
});
