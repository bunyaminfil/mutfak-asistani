import React, { useEffect } from "react";
import { StyleSheet, FlatList, View, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useColorScheme } from "@/hooks/useColorScheme";
import { Colors } from "@/constants/Colors";
import { hp, wp } from "@/helpers/screenResize";
import { useAppDispatch, useAppSelector } from "@/store/redux/hook";
import { getMenu } from "@/store/redux/slices/foods";
import { LoadingTypes } from "@/types/loadingTypes";
import LoadingOverlay from "@/components/ui/LoadingOverlay";
import ErrorOverlay from "@/components/ui/ErrorOverlay";
import FoodCard from "@/components/cards/FoodCard";
import { Text } from "@/components/ui/Text";
import MyCarousel from "@/components/Carousel";

interface FoodItem {
    strCategory: string;
    idCategory: string;
    strCategoryThumb: string;
    strCategoryDescription: string;
}

const HomeScreen: React.FC = () => {
    const theme = useColorScheme() ?? "light";
    const dispatch = useAppDispatch();
    const { foods, loading, error } = useAppSelector((state) => state.foodsReducer);

    useEffect(() => {
        dispatch(getMenu(1000));
    }, [dispatch]);

    const renderGridItem = ({ item }: { item: FoodItem }) => (
        <FoodCard title={item.strCategory} url={item.strCategoryThumb} onPress={() => {}} />
    );

    const styles = StyleSheet.create({
        container: {
            backgroundColor: Colors[theme].background,
        },
        scrollContent: {
            flexGrow: 1,
        },
        carouselContainer: {
            marginHorizontal: hp(1),
            alignItems: "center",
            justifyContent: "center",
        },
        listContainer: {
            marginHorizontal: hp(1),
        },
        sectionTitle: {
            fontSize: wp(5),
            fontWeight: "bold",
            marginVertical: hp(2),
            marginLeft: wp(2),
            alignSelf: "flex-start",
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
            <FlatList
                ListHeaderComponent={
                    <>
                        <View style={styles.carouselContainer}>
                            <Text style={styles.sectionTitle}>Featured Categories</Text>
                            <MyCarousel
                                data={foods.slice(0, 5).map((food: FoodItem) => ({
                                    title: food.strCategory,
                                    url: food.strCategoryThumb,
                                }))}
                            />
                        </View>
                        <View style={styles.listContainer}>
                            <Text style={styles.sectionTitle}>All Categories</Text>
                        </View>
                    </>
                }
                data={foods}
                renderItem={renderGridItem}
                keyExtractor={(item) => item.idCategory}
                numColumns={2}
            />
        </SafeAreaView>
    );
};

export default HomeScreen;
