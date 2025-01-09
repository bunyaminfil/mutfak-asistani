import React, { useEffect } from "react";
import { StyleSheet, FlatList, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useLocalSearchParams } from "expo-router";
import { useAppDispatch, useAppSelector } from "@/store/redux/hook";
import { getMealsByCategory } from "@/store/redux/slices/foods";
import { LoadingTypes } from "@/types/loadingTypes";
import LoadingOverlay from "@/components/ui/LoadingOverlay";
import ErrorOverlay from "@/components/ui/ErrorOverlay";
import MealCard from "@/components/cards/MealCard";
import { Text } from "@/components/ui/Text";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import { hp, wp } from "@/helpers/screenResize";
import { useRouter } from "expo-router";
import { useLanguage } from "@/context/LanguageContext";

const CategoryFoodsScreen: React.FC = () => {
    const { t } = useLanguage();
    const { name } = useLocalSearchParams();
    const theme = useColorScheme() ?? "light";
    const dispatch = useAppDispatch();
    const { category, loading, error } = useAppSelector((state) => state.foodsReducer);
    const router = useRouter();

    useEffect(() => {
        if (name) {
            dispatch(getMealsByCategory(name as string));
        }
    }, [dispatch, name]);

    const handleMealPress = (mealId: string) => {
        router.push({
            pathname: "/meal",
            params: { id: mealId },
        });
    };

    const renderItem = ({ item }: any) => (
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
    });

    if (loading === LoadingTypes.loading) {
        return <LoadingOverlay />;
    }

    if (error) {
        return <ErrorOverlay message={error} />;
    }

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>{name} {t("meal.recipes")}</Text>
            <FlatList
                data={category}
                renderItem={renderItem}
                keyExtractor={(item: any) => item.idMeal}
                contentContainerStyle={styles.content}
                numColumns={1}
                showsVerticalScrollIndicator={false}
            />
        </SafeAreaView>
    );
};

export default CategoryFoodsScreen;
