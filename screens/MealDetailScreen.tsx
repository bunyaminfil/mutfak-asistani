import React, { useEffect } from "react";
import { StyleSheet, ScrollView, View, ImageBackground, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useAppDispatch, useAppSelector } from "@/store/redux/hook";
import { getMealById } from "@/store/redux/slices/foods";
import { LoadingTypes } from "@/types/loadingTypes";
import LoadingOverlay from "@/components/ui/LoadingOverlay";
import ErrorOverlay from "@/components/ui/ErrorOverlay";
import { Text } from "@/components/ui/Text";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import { hp, wp } from "@/helpers/screenResize";
import { MaterialIcons } from "@expo/vector-icons";
import { toggleFavorite } from "@/store/redux/slices/favorites";
import { useLanguage } from "@/context/LanguageContext";

interface Ingredient {
    name: string;
    measure: string;
}

const MealDetailScreen: React.FC = () => {
    const { t } = useLanguage();
    const { id } = useLocalSearchParams();
    const theme = useColorScheme() ?? "light";
    const dispatch = useAppDispatch();
    const router = useRouter();
    const { mealDetails, loading, error } = useAppSelector((state) => state.foodsReducer);
    const { favorites = [] } = useAppSelector((state) => state.favoritesReducer);
    const isFavorite = favorites?.some((favorite) => favorite.idMeal === id) || false;

    useEffect(() => {
        if (id) {
            dispatch(getMealById(id as string));
        }
    }, [dispatch, id]);

    const handleBack = () => {
        router.back();
    };

    const getIngredients = (meal: any): Ingredient[] => {
        const ingredients: Ingredient[] = [];
        for (let i = 1; i <= 20; i++) {
            const ingredient = meal[`strIngredient${i}`];
            const measure = meal[`strMeasure${i}`];
            if (ingredient && ingredient.trim() !== "") {
                ingredients.push({
                    name: ingredient,
                    measure: measure || "",
                });
            }
        }
        return ingredients;
    };

    const handleFavorite = () => {
        if (mealDetails) {
            dispatch(
                toggleFavorite({
                    idMeal: mealDetails.idMeal,
                    strMeal: mealDetails.strMeal,
                    strMealThumb: mealDetails.strMealThumb,
                }),
            );
        }
    };

    if (loading === LoadingTypes.loading) {
        return <LoadingOverlay />;
    }

    if (error) {
        return <ErrorOverlay message={error} />;
    }

    if (!mealDetails) {
        return <ErrorOverlay message="Meal not found" />;
    }

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: Colors[theme].background,
        },
        backButton: {
            position: "absolute",
            top: wp(4),
            left: wp(4),
            zIndex: 1,
            backgroundColor: "rgba(0,0,0,0.3)",
            padding: wp(2),
            borderRadius: wp(5),
        },
        imageContainer: {
            width: "100%",
            height: hp(30),
        },
        image: {
            width: "100%",
            height: "100%",
        },
        overlay: {
            flex: 1,
            backgroundColor: "rgba(0,0,0,0.3)",
            justifyContent: "flex-end",
            padding: wp(4),
        },
        title: {
            color: "#fff",
            fontSize: wp(6),
            fontWeight: "bold",
            textShadowColor: "rgba(0,0,0,0.75)",
            textShadowOffset: { width: -1, height: 1 },
            textShadowRadius: 10,
        },
        content: {
            padding: wp(4),
        },
        sectionTitle: {
            fontSize: wp(5),
            fontWeight: "bold",
            color: Colors[theme].text,
            marginVertical: hp(2),
        },
        description: {
            fontSize: wp(4),
            color: Colors[theme].text,
            lineHeight: wp(6),
        },
        ingredientsContainer: {
            marginTop: hp(2),
        },
        ingredientRow: {
            flexDirection: "row",
            paddingVertical: hp(1),
            borderBottomWidth: 1,
            borderBottomColor: "rgba(0,0,0,0.1)",
        },
        measure: {
            flex: 1,
            fontSize: wp(4),
            color: Colors[theme].text,
        },
        ingredient: {
            flex: 2,
            fontSize: wp(4),
            color: Colors[theme].text,
        },
        favoriteButton: {
            position: "absolute",
            top: wp(4),
            right: wp(4),
            zIndex: 1,
            backgroundColor: "rgba(0,0,0,0.3)",
            padding: wp(2),
            borderRadius: wp(5),
        },
    });

    return (
        <SafeAreaView style={styles.container} edges={["left", "right", "bottom"]}>
            <ScrollView>
                <View style={styles.imageContainer}>
                    <Pressable style={styles.backButton} onPress={handleBack}>
                        <MaterialIcons name="arrow-back" size={wp(6)} color="#fff" />
                    </Pressable>
                    <Pressable style={styles.favoriteButton} onPress={handleFavorite}>
                        <MaterialIcons
                            name={isFavorite ? "favorite" : "favorite-border"}
                            size={wp(6)}
                            color={isFavorite ? "#ff4081" : "#fff"}
                        />
                    </Pressable>
                    <ImageBackground source={{ uri: mealDetails.strMealThumb }} style={styles.image} resizeMode="cover">
                        <View style={styles.overlay}>
                            <Text style={styles.title}>{mealDetails.strMeal}</Text>
                        </View>
                    </ImageBackground>
                </View>
                <View style={styles.content}>
                    <Text style={styles.sectionTitle}>{t("meal.ingredients")}</Text>
                    <View style={styles.ingredientsContainer}>
                        {getIngredients(mealDetails).map((item, index) => (
                            <View key={index} style={styles.ingredientRow}>
                                <Text style={styles.measure}>{item.measure}</Text>
                                <Text style={styles.ingredient}>{item.name}</Text>
                            </View>
                        ))}
                    </View>
                    <Text style={styles.sectionTitle}>{t("meal.instructions")}</Text>
                    <Text style={styles.description}>{mealDetails.strInstructions}</Text>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default MealDetailScreen;
