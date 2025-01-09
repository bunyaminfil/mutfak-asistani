import React from "react";
import { StyleSheet, FlatList, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { useAppSelector } from "@/store/redux/hook";
import MealCard from "@/components/cards/MealCard";
import { Text } from "@/components/ui/Text";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import { hp, wp } from "@/helpers/screenResize";
import { IFavoriteMeal } from "@/types/favoriteTypes";

const FavoritesScreen: React.FC = () => {
    const theme = useColorScheme() ?? "light";
    const router = useRouter();
    const { favorites } = useAppSelector((state) => state.favoritesReducer);
    const { mealDetails } = useAppSelector((state) => state.foodsReducer);

    const handleMealPress = (mealId: string) => {
        router.push({
            pathname: "/meal",
            params: { id: mealId },
        });
    };

    const renderItem = ({ item }: { item: IFavoriteMeal }) => (
        <MealCard
            id={item.idMeal}
            title={item.strMeal}
            url={item.strMealThumb}
            onPress={() => handleMealPress(item.idMeal)}
        />
    );

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: Colors[theme].background,
        },
        title: {
            fontSize: wp(6),
            fontWeight: "bold",
            margin: wp(4),
            color: Colors[theme].text,
        },
        content: {
            paddingHorizontal: wp(4),
        },
        emptyContainer: {
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            padding: wp(4),
        },
        emptyText: {
            fontSize: wp(4.5),
            color: Colors[theme].text,
            textAlign: "center",
        },
    });

    if (!favorites || favorites.length === 0) {
        return (
            <SafeAreaView style={styles.container}>
                <View style={styles.emptyContainer}>
                    <Text style={styles.emptyText}>No favorite meals yet. Start adding some!</Text>
                </View>
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView style={styles.container} edges={["left", "right", "bottom"]}>
            <Text style={styles.title}>Favorite Meals</Text>
            <FlatList
                data={favorites}
                renderItem={renderItem}
                keyExtractor={(item) => item.idMeal}
                contentContainerStyle={styles.content}
                numColumns={1}
                showsVerticalScrollIndicator={false}
            />
        </SafeAreaView>
    );
};

export default FavoritesScreen;
